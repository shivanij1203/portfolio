import Hero from "@/components/Hero";
import { Magnetic, Reveal, Spotlight } from "@/components/Interactions";
import { ROLES, STACK } from "@/lib/content";
import { formatStars, getPullRequests, getStars } from "@/lib/github";

export const revalidate = 3600;

export default async function Page() {
  const [prs, stars] = await Promise.all([getPullRequests(), getStars()]);

  const merged = prs.find((p) => p.number === 13539);
  const openCount = prs.filter((p) => p.state === "open").length;
  const onyxStars = formatStars(stars["onyx-dot-app/onyx"] ?? 0);

  const receipts = [
    {
      figure: "#13539",
      caption: `My diagnosis, merged into Onyx, a ${onyxStars}-star AI platform`,
      href: merged?.url,
      live: merged ? merged.state : undefined,
    },
    { figure: "25%", caption: "Response latency cut under high-volume load at Verizon" },
    { figure: "Daily", caption: "A production AI assistant used by K-12 district leadership" },
    {
      figure: String(openCount),
      caption: "Open pull requests in Onyx and django-ninja",
      href: "https://github.com/shivanij1203",
      live: "live from github",
    },
  ];

  return (
    <main>
      <Hero receipts={receipts} merged={merged} />

      <section>
        <div className="mx-auto max-w-6xl px-6 py-28 sm:px-8">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold tracking-[-0.03em]">
              Where I&rsquo;ve worked
            </h2>
          </Reveal>

          <div className="mt-14 flex flex-col">
            {ROLES.map((role, i) => (
              <Reveal key={role.org} delay={i * 0.05}>
                <div className="grid gap-6 border-t border-line py-9 lg:grid-cols-[230px_1fr] lg:gap-10">
                  <div className="font-mono text-[12px] leading-relaxed text-dim">
                    <span className="block text-[13.5px] font-medium tracking-normal text-ink">
                      {role.org}
                    </span>
                    {role.when}
                    <br />
                    {role.where}
                  </div>
                  <div>
                    <h3 className="mb-4 text-[1.02rem] font-semibold tracking-tight">
                      {role.title}
                    </h3>
                    <ul className="flex flex-col gap-2.5">
                      {role.points.map((p, j) => (
                        <li
                          key={j}
                          className="relative pl-5 text-[0.95rem] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.68em] before:h-px before:w-2.5 before:bg-pink/60"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-28 sm:px-8">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold tracking-[-0.03em]">
              What I work with
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STACK.map((s, i) => (
              <Spotlight key={s.label}>
                <div className="h-full bg-card p-6">
                  <h3 className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                    {s.label}
                  </h3>
                  <p className="text-[0.92rem] leading-relaxed text-muted">
                    {s.items}
                  </p>
                  <span className="sr-only">{i}</span>
                </div>
              </Spotlight>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-28 sm:px-8">
          <Reveal>
            <h2 className="max-w-[14ch] font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
              Say hello.
            </h2>
            <p className="mt-6 max-w-[54ch] font-read text-[1.12rem] leading-relaxed text-muted">
              I&rsquo;m finishing an MS in Artificial Intelligence and Business
              Analytics at the University of South Florida. If any of the above
              sounds like the kind of work you need done, I&rsquo;d like to hear
              about it.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[13.5px]">
              {[
                { label: "Email", href: "mailto:shivanijagannatham@gmail.com" },
                { label: "GitHub", href: "https://github.com/shivanij1203" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/shivani-jagannatham/",
                },
              ].map((l) => (
                <Magnetic key={l.label} strength={0.28}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="border-b border-line pb-1 text-muted transition-colors hover:border-pink hover:text-ink"
                  >
                    {l.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
