import { RevealSection } from "@/components/ui/RevealSection"

export function ContactHeroSection() {
  return (
    <section id="contact-hero" className="relative overflow-hidden pt-[184px] md:pt-[196px] pb-20">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">contact.module</div>
          <h1 className="heading-code mt-3">
            let&apos;s.<span className="function">talk</span>()
          </h1>
          <p className="subheading-code mt-3">{"// tell us what you're building, we reply within a day"}</p>

          <p className="mt-6 text-base sm:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
            Have a detailed spec or a rough idea? Either one is fine. Send a message and a senior
            team member will get back to you personally.
          </p>
        </RevealSection>
      </div>
    </section>
  )
}
