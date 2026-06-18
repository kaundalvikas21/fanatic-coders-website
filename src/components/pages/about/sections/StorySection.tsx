import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { StoryTimeline, type StoryMilestone } from "./StoryTimeline"

// DRAFT copy — placeholder milestones for review. Replace facts as needed.
const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: "2018",
    label: "Founded",
    title: "Two of us, one project",
    body: "fanaticCoders started in 2018 as a two-person shop taking web builds other studios passed on. We wrote every line and answered for it.",
  },
  {
    year: "2020",
    label: "First product teams",
    title: "From shop to studio",
    body: "We grew into full product teams that design, build, and release in one place. Remote from day one.",
  },
  {
    year: "2022",
    label: "Mobile and cloud",
    title: "A wider stack",
    body: "Added native mobile and cloud work so clients stopped stitching three vendors together to ship one product.",
  },
  {
    year: "2024",
    label: "Senior and steady",
    title: "A team that stays",
    body: "Settled into a small senior team that stays with a product after launch, with no junior churn on your account.",
  },
  {
    year: "2026",
    label: "Today",
    title: "Where we are now",
    body: "A tight roster of engineers and designers shipping for fintech, health, retail, and logistics clients.",
  },
]

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-28 py-24 relative overflow-hidden">
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="max-w-3xl">
            <SectionHeading
              align="left"
              badge="story.log"
              title={<>our.<span className="function">story</span>()</>}
              comment="// how we got here, since 2018"
            />
            <p className="mt-6 text-base sm:text-lg text-blue-100/70 leading-relaxed">
              We did not start with a pitch deck. We started with code that had to work, for
              clients who needed it to. Here is the short version of how the team took shape.
            </p>
          </RevealSection>

          <StoryTimeline items={STORY_MILESTONES} />
        </div>
      </div>
    </section>
  )
}
