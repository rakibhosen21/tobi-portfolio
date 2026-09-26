export function KitLink({ className = "" }: { className?: string }) {
  return (
    <a href="/kit" className={`kit-link ${className}`}>
      Media Kit
    </a>
  );
}
