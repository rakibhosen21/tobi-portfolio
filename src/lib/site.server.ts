import { getSql } from "@/lib/db";
import { xProfileUrl } from "@/lib/format";
import { DEFAULT_FEATURED, SITE } from "@/lib/site-config";
import type { FeaturedLink, PublicProfile } from "@/lib/types";

const DEFAULT_LINKS: FeaturedLink[] = DEFAULT_FEATURED.map((l) => ({ ...l }));

type SettingsRow = {
  owner_user_id: string | null;
  display_name: string;
  x_username: string;
  tagline: string;
  bio: string;
  avatar_url: string;
  featured_links_json: string | null;
};

function parseLinks(raw: string | null | undefined, username: string): FeaturedLink[] {
  let links = DEFAULT_LINKS;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as FeaturedLink[];
      if (Array.isArray(parsed) && parsed.length) links = parsed;
    } catch {
      /* keep defaults */
    }
  }
  return links.map((link) => (link.id === "x" ? { ...link, href: xProfileUrl(username) } : link));
}

export async function ensureSeed(): Promise<void> {
  const sql = await getSql();
  await sql`
    insert into site_settings (id, display_name, x_username, tagline, bio, avatar_url, featured_links_json)
    values ('site', ${SITE.name}, ${SITE.handle}, ${SITE.tagline}, ${SITE.heroBody}, ${SITE.avatar}, ${JSON.stringify(DEFAULT_LINKS)})
    on conflict (id) do nothing
  `;
}

export async function getSettingsRow(): Promise<SettingsRow> {
  await ensureSeed();
  const sql = await getSql();
  const rows = await sql<SettingsRow>`
    select owner_user_id, display_name, x_username, tagline, bio, avatar_url, featured_links_json
    from site_settings where id = 'site'
  `;
  return (
    rows[0] ?? {
      owner_user_id: null,
      display_name: SITE.name,
      x_username: SITE.handle,
      tagline: SITE.tagline,
      bio: SITE.heroBody,
      avatar_url: SITE.avatar,
      featured_links_json: JSON.stringify(DEFAULT_LINKS),
    }
  );
}

export function publicProfileFrom(row: SettingsRow): PublicProfile {
  return {
    displayName: row.display_name || SITE.name,
    xUsername: row.x_username || SITE.handle,
    tagline: row.tagline || SITE.tagline,
    bio: row.bio || SITE.heroBody,
    avatarUrl: row.avatar_url || SITE.avatar,
    featuredLinks: parseLinks(row.featured_links_json, row.x_username || SITE.handle),
  };
}
