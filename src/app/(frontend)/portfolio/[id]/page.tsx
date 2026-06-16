import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CaseStudyPage } from "@/components/pages/portfolio/CaseStudyPage"
import { projects, getProject } from "@/components/pages/portfolio/data"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = getProject(id)
  if (!project) return {}
  return { title: `${project.title} | fanaticCoders`, description: project.description }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = getProject(id)
  if (!project) notFound()
  return <CaseStudyPage project={project} />
}
