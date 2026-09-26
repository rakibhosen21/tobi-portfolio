import { SITE } from "@/lib/site-config";

export function KitLink({ className = "" }: { className?: string }) {
  return (
    <a href={SITE.mediaKit} className={`kit-link ${className}`} download>
      Media Kit
    </a>
  );
}
