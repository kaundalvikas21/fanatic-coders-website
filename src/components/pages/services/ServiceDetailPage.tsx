import { CtaBand } from "@/components/ui/CtaBand"
import TechStackSection from "@/components/pages/home/TechStackSection"
import type { ServiceGroup, ServiceItem } from "./data"
import { ServiceHero } from "./detail-sections/ServiceHero"
import { ServiceIncluded } from "./detail-sections/ServiceIncluded"
import { ServiceCapabilities } from "./detail-sections/ServiceCapabilities"
import { ServiceProcess } from "./detail-sections/ServiceProcess"
import { ServiceDeliverables } from "./detail-sections/ServiceDeliverables"
import { ServiceProof } from "./detail-sections/ServiceProof"
import { ServiceEngagement } from "./detail-sections/ServiceEngagement"
import { ServiceFaq } from "./detail-sections/ServiceFaq"

export function ServiceDetailPage({ service, group }: { service: ServiceItem; group: ServiceGroup }) {
  return (
    <>
      <ServiceHero service={service} group={group} />
      {service.capabilities ? (
        <ServiceCapabilities service={service} group={group} />
      ) : (
        <ServiceIncluded service={service} group={group} />
      )}
      <ServiceProcess />
      <ServiceDeliverables group={group} />
      <TechStackSection />
      <ServiceProof service={service} group={group} />
      <ServiceEngagement />
      <ServiceFaq service={service} />
      <CtaBand
        title="Ready to start?"
        subtitle="Tell us the problem and we'll bring the right team to build it."
        buttonLabel="bookADiscoveryCall"
      />
    </>
  )
}
