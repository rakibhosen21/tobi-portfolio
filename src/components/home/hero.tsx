import { SITE } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="home" className="pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <img src="/cover.jpg" alt="" width={1500} height={500} className="h-36 w-full object-cover sm:h-52" />
          <img
            src={SITE.avatar}
            alt="Tobi"
            width={160}
            height={160}
            className="absolute bottom-0 left-4 size-20 translate-y-1/2 rounded-full border-4 border-bg object-cover sm:left-6 sm:size-24"
          />
        </div>
        <div className="px-4 pt-14 sm:px-6">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Tobi</h1>
          <p className="mt-1 max-w-md text-sm text-muted">Web3 creator. Content, research and community work.</p>
        </div>
      </div>
    </section>
  );
}
