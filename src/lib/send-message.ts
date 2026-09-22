import { SITE } from "@/lib/site-config";

export type HireMessage = {
  name: string;
  email: string;
  company?: string;
  role?: string;
  message: string;
  website?: string;
};

export async function sendHireMessage(data: HireMessage) {
  if (data.website?.trim()) return;
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();
  if (name.length < 2) throw new Error("Please add your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Please add a valid email.");
  if (message.length < 10) throw new Error("Message is too short.");

  const payload = {
    name,
    email,
    company: data.company?.trim() ?? "",
    role: data.role?.trim() ?? "",
    message,
    _subject: `Hire Tobi — ${data.role?.trim() || "New inquiry"}`,
    _template: "table",
    _captcha: "false",
    _replyto: email,
  };

  const res = await fetch(SITE.inbox, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    if (json.success === false || json.success === "false") {
      throw new Error("Could not send. Try email instead.");
    }
    return;
  }

  const body = new URLSearchParams({
    subject: payload._subject,
    body: `Name: ${name}\nEmail: ${email}\nCompany: ${payload.company}\nRole: ${payload.role}\n\n${message}`,
  });
  window.location.href = `${SITE.contact.email.href}?${body.toString()}`;
}
