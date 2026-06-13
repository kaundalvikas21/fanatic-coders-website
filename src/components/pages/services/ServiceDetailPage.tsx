import { CtaBand } from "@/components/ui/CtaBand"
import type { ServiceGroup, ServiceItem } from "./data"
import { ServiceHero } from "./detail-sections/ServiceHero"
import { ServiceIncluded } from "./detail-sections/ServiceIncluded"
import { ServiceProcess } from "./detail-sections/ServiceProcess"
import { ServiceProof } from "./detail-sections/ServiceProof"
import { ServiceFaq } from "./detail-sections/ServiceFaq"
import { ServiceRelated } from "./detail-sections/ServiceRelated"

export function ServiceDetailPage({ service, group }: { service: ServiceItem; group: ServiceGroup }) {
  return (
    <>
      <ServiceHero service={service} group={group} />
      <ServiceIncluded service={service} group={group} />
      <ServiceProcess />
      <ServiceProof service={service} />
      <ServiceFaq service={service} />
      <ServiceRelated service={service} group={group} />
      <CtaBand
        title="Ready to start?"
        subtitle="Tell us the problem and we'll bring the right team to build it."
        buttonLabel="bookADiscoveryCall"
      />
    </>
  )
}
