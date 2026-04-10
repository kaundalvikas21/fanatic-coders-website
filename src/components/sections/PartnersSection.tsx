import Image from "next/image"

const partners = [
  { name: "TechCorp",   logo: "/logos/tech-corp.svg"   },
  { name: "CodeLabs",   logo: "/logos/code-labs.svg"   },
  { name: "DevForce",   logo: "/logos/dev-force.svg"   },
  { name: "ByteWorks",  logo: "/logos/byte-works.svg"  },
  { name: "CloudScale", logo: "/logos/cloud-scale.svg" },
  { name: "DataFlow",   logo: "/logos/data-flow.svg"   },
]

export default function PartnersSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "var(--dark-1)" }} id="partners">
      {/* Subtle centre glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(79,70,229,0.05),transparent_60%)]" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <div className="preheading-code">trusted.partners</div>
          <h2 className="heading-code">
            <span className="function">collaborate</span>
            (<span className="params">industry.leaders</span>)
          </h2>
          <p className="subheading-code">{"// Building the future of digital experiences together"}</p>
        </div>

        {/* Marquee — 3 sets so strip always overflows viewport */}
        <div className="marquee-viewport" role="region" aria-label="Trusted partners">
          <div className="marquee-inner">
            {/* Set 1: visible to screen readers */}
            {partners.map(partner => (
              <div key={partner.name} className="partner-card">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={48}
                  className="partner-logo"
                  loading="eager"
                />
              </div>
            ))}

            {/* Sets 2 + 3: aria-hidden duplicates for seamless loop */}
            {[1, 2].map(set =>
              partners.map(partner => (
                <div key={`${set}-${partner.name}`} className="partner-card" aria-hidden="true">
                  <Image
                    src={partner.logo}
                    alt=""
                    width={160}
                    height={48}
                    className="partner-logo"
                    loading="eager"
                  />
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
