import Image from 'next/image';
import { RevealSection } from '@/components/ui/RevealSection';

const partners = [
  { name: 'TechCorp', logo: '/logos/tech-corp.svg' },
  { name: 'CodeLabs', logo: '/logos/code-labs.svg' },
  { name: 'DevForce', logo: '/logos/dev-force.svg' },
  { name: 'ByteWorks', logo: '/logos/byte-works.svg' },
  { name: 'CloudScale', logo: '/logos/cloud-scale.svg' },
  { name: 'DataFlow', logo: '/logos/data-flow.svg' },
];

export default function PartnersSection() {
  return (
    <section
      className="section-y relative overflow-hidden"
      style={{ background: 'var(--dark-1)' }}
      id="partners"
    >
      {/* Subtle centre wash echoing the aurora sweep */}
      <div className="absolute inset-0 -z-10 partners-glow" />

      <RevealSection
        stagger
        className="container mx-auto px-4"
      >
        <div className="text-center mb-10 md:mb-16">
          <div className="preheading-code">trusted.partners</div>
          <h2 className="heading-code">
            <span className="function">collaborate</span>(<span className="params">partners</span>)
          </h2>
          <p className="subheading-code">{'// A few of the teams we work with'}</p>
        </div>

        {/* Marquee — 3 sets so strip always overflows viewport */}
        <div
          className="marquee-viewport"
          role="region"
          aria-label="Trusted partners"
        >
          <div className="marquee-inner">
            {/* Set 1: visible to screen readers */}
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="partner-card"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={48}
                  className="partner-logo"
                  unoptimized
                />
              </div>
            ))}

            {/* Sets 2 + 3: aria-hidden duplicates for seamless loop */}
            {[1, 2].map((set) =>
              partners.map((partner) => (
                <div
                  key={`${set}-${partner.name}`}
                  className="partner-card"
                  aria-hidden="true"
                >
                  <Image
                    src={partner.logo}
                    alt=""
                    width={160}
                    height={48}
                    className="partner-logo"
                    unoptimized
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
