import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealSection } from '@/components/ui/RevealSection';
import { FaqInteractive } from '@/components/ui/FaqInteractive';

const faqs: { q: string; a: string }[] = [
  {
    q: 'How long does a typical project take?',
    a: 'Most projects run 6 to 12 weeks. We scope it in the first week so you get a real timeline, not a guess.',
  },
  {
    q: 'How do you price work?',
    a: 'Fixed quote for a fixed scope, or a monthly rate for ongoing work. You see the number before we start.',
  },
  {
    q: 'Can you work with our existing team?',
    a: 'Yes. We embed with your engineers, match your tools and process, and hand over clean docs.',
  },
  {
    q: 'What happens after launch?',
    a: 'We stay on with monitoring, fixes, and new work. You are not left alone at go-live.',
  },
  {
    q: 'Which technologies do you use?',
    a: 'Next.js, React, TypeScript, Node, and Postgres for most builds. We pick what fits the project.',
  },
];

export function ServicesFaqSection() {
  return (
    <section
      id="services-faq"
      className="faq-section section-y relative overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="faq.json"
            title={
              <>
                common.<span className="function">questions</span>()
              </>
            }
            comment="// the things teams ask us before we start"
          />
        </RevealSection>

        <div className="mt-12">
          <FaqInteractive items={faqs} />
        </div>
      </div>
    </section>
  );
}
