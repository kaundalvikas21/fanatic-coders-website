import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostPage } from "@/components/pages/blog/BlogPostPage"
import { posts } from "@/components/pages/blog/data"

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: `${post.title} | fanaticCoders Blog`, description: post.excerpt }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()
  return <BlogPostPage post={post} />
}
