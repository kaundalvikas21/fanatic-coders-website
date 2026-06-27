import { FaqInteractive } from '@/components/ui/FaqInteractive';
import { RevealSection } from '@/components/ui/RevealSection';

const faqs = [
  {
    q: 'What services does Fanatic Coders offer?',
    a: 'We offer full-stack web development, UI/UX design, e-commerce solutions, digital branding, SEO & PPC, and ongoing maintenance & support. We cover the whole build, from first idea through launch and the support after it.',
  },
  {
    q: 'How long does a typical project take from start to launch?',
    a: 'Timelines vary by scope. A landing page or MVP typically takes 2 to 4 weeks. A full web application or e-commerce platform is usually 6 to 12 weeks. We provide a detailed timeline during the discovery phase.',
  },
  {
    q: 'Do you work with startups and early-stage teams?',
    a: "Absolutely. We love working with early-stage founders. We're comfortable with ambiguity, fast pivots, and shipping iteratively. A polished spec or a rough idea, either one is enough for us to help you move forward.",
  },
  {
    q: 'What does your development process look like?',
    a: "We follow a structured process: Discovery → Design → Development → QA → Launch → Support. You'll have visibility at every stage with regular check-ins, staging previews, and a clear communication channel throughout.",
  },
  {
    q: 'Do you provide ongoing support and maintenance after launch?',
    a: 'Yes. We offer retainer-based support plans covering performance monitoring, security updates, content changes, and feature additions. Most clients stay on as a long-term partner well after launch.',
  },
  {
    q: 'What technologies do you specialize in?',
    a: 'Our core stack includes React, Next.js, Svelte, Node.js, TypeScript, PostgreSQL, and cloud platforms like AWS and Vercel. We choose the best fit for your project rather than forcing a one-size-fits-all approach.',
  },
  {
    q: 'How do I get started working with you?',
    a: "Simply reach out through our contact form or email. We'll schedule a free 30-minute discovery call to understand your goals, discuss timelines and budgets, and see if we're a good fit for each other.",
  },
];

export default function FAQSection() {
  return (
    <section className="faq-section section-y relative overflow-hidden">
      <RevealSection
        stagger
        className="container mx-auto px-4 max-w-6xl"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="preheading-code">faq.support</div>
          <h2 className="heading-code mt-2">
            faq.<span style={{ color: 'var(--aurora-violet-light)' }}>answers</span>()
          </h2>
          <p className="subheading-code mt-3">
            {'// Everything you need to know before we start building together'}
          </p>
        </div>

        <FaqInteractive items={faqs} />
      </RevealSection>
    </section>
  );
}
