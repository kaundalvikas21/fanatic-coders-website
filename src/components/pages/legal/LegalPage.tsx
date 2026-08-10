import Link from 'next/link';
import { siteConfig } from '@/config/site';

export type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  effectiveDate: string;
  sections: readonly LegalSection[];
};

export function LegalPage({ eyebrow, title, summary, effectiveDate, sections }: LegalPageProps) {
  return (
    <>
      <section className="hero-shell relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-30" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="preheading-code">{eyebrow}</div>
            <h1 className="hero-h1 mt-3">{title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100/70 sm:text-lg">
              {summary}
            </p>
            <p className="mt-5 font-mono text-sm text-indigo-300">Effective: {effectiveDate}</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--dark-1)] py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <article className="mx-auto max-w-3xl space-y-12">
            {sections.map((section, index) => (
              <section
                key={section.title}
                aria-labelledby={`legal-section-${index}`}
                className="border-b border-white/10 pb-12 last:border-0 last:pb-0"
              >
                <h2
                  id={`legal-section-${index}`}
                  className="font-mono text-xl font-semibold text-white sm:text-2xl"
                >
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 leading-7 text-blue-100/70"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.items ? (
                  <ul className="mt-5 list-disc space-y-3 pl-5 text-blue-100/70 marker:text-indigo-400">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="pl-2 leading-7"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <aside className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-6 sm:p-8">
              <h2 className="font-mono text-xl font-semibold text-white">Questions?</h2>
              <p className="mt-3 leading-7 text-blue-100/70">
                Contact us at{' '}
                <Link
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-indigo-300 underline decoration-indigo-400/40 underline-offset-4 hover:text-indigo-200"
                >
                  {siteConfig.contactEmail}
                </Link>
                .
              </p>
            </aside>
          </article>
        </div>
      </section>
    </>
  );
}
