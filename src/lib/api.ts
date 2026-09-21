import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type { AdminDashboard, FeaturedLink } from "@/lib/types";

async function requireOwner(userId: string) {
  const { getSql } = await import("@/lib/db");
  const { ensureSeed } = await import("@/lib/site.server");
  await ensureSeed();
  const sql = await getSql();
  await sql`
    update site_settings
    set owner_user_id = ${userId}, updated_at = ${new Date().toISOString()}
    where id = 'site'
  `;
}

export const fetchAdminDashboard = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<AdminDashboard> => {
    await requireOwner(context.userId);
    const { getSettingsRow, publicProfileFrom } = await import("@/lib/site.server");
    const settings = await getSettingsRow();
    return {
      settings: {
        isOwner: true,
        ownerSet: Boolean(settings.owner_user_id),
        profile: publicProfileFrom(settings),
      },
    };
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { displayName: string; tagline: string; bio: string; xUsername: string; avatarUrl: string }) => data)
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      update site_settings set
        display_name = ${data.displayName.trim() || "Tobi"},
        tagline = ${data.tagline.trim()},
        bio = ${data.bio.trim()},
        x_username = ${data.xUsername.replace(/^@/, "").trim()},
        avatar_url = ${data.avatarUrl.trim() || "/avatar.jpg"},
        updated_at = ${new Date().toISOString()}
      where id = 'site'
    `;
    return { ok: true };
  });

export const saveFeaturedLinks = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: FeaturedLink[]) => data)
  .handler(async ({ context, data }) => {
    await requireOwner(context.userId);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const cleaned = data
      .map((l) => ({
        id: l.id.trim() || crypto.randomUUID(),
        label: l.label.trim(),
        href: l.href.trim(),
        external: Boolean(l.external),
      }))
      .filter((l) => l.label && l.href);
    await sql`
      update site_settings set featured_links_json = ${JSON.stringify(cleaned)}, updated_at = ${new Date().toISOString()}
      where id = 'site'
    `;
    return { ok: true };
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES = new Set([
  "Web3 Creator",
  "Content Creator",
  "Community Manager",
  "Web3 Intern",
  "Community Contributor",
  "Ambassador",
  "Collaboration",
  "Other",
]);

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  website?: string;
};

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: ContactPayload) => data)
  .handler(async ({ data }) => {
    if (data.website?.trim()) return { ok: true as const };
    const name = data.name.trim().slice(0, 80);
    const email = data.email.trim().slice(0, 120);
    const company = data.company.trim().slice(0, 120);
    const role = data.role.trim();
    const message = data.message.trim().slice(0, 2000);
    if (name.length < 2) throw new Error("Please add your name.");
    if (!EMAIL_RE.test(email)) throw new Error("Please add a valid email.");
    if (!ROLES.has(role)) throw new Error("Please pick a role.");
    if (message.length < 10) throw new Error("Message is too short.");

    const { getRequest } = await import("@tanstack/react-start/server");
    const { createHash } = await import("node:crypto");
    const req = getRequest();
    const ip =
      req?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req?.headers.get("x-real-ip") ||
      "unknown";
    const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 24);

    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const recent = await sql<{ n: number }>`
      select count(*)::int as n from contact_messages
      where ip_hash = ${ipHash}
        and created_at > now() - interval '1 hour'
    `;
    if ((recent[0]?.n ?? 0) >= 4) {
      throw new Error("Too many messages. Try again in a bit.");
    }
    await sql`
      insert into contact_messages (name, email, company, role, message, ip_hash)
      values (${name}, ${email}, ${company}, ${role}, ${message}, ${ipHash})
    `;
    return { ok: true as const };
  });

export const fetchInquiries = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireOwner(context.userId);
    const { getSql } = await import("@/lib/db");
    const { toIso } = await import("@/lib/format");
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      name: string;
      email: string;
      company: string;
      role: string;
      message: string;
      created_at: string;
    }>`
      select id, name, email, company, role, message, created_at
      from contact_messages
      order by created_at desc
      limit 80
    `;
    return rows.map((row) => ({
      id: Number(row.id),
      name: row.name,
      email: row.email,
      company: row.company,
      role: row.role,
      message: row.message,
      createdAt: toIso(row.created_at) ?? "",
    }));
  });
