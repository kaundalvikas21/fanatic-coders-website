"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

interface BlogFilterValue {
  query: string
  setQuery: (q: string) => void
  category: string
  setCategory: (c: string) => void
  tag: string
  setTag: (t: string) => void
}

const BlogFilterContext = createContext<BlogFilterValue | null>(null)

export function BlogFilterProvider({
  initialTag = "",
  children,
}: {
  initialTag?: string
  children: ReactNode
}) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [tag, setTag] = useState(initialTag)

  // Keep the tag in sync with the URL: the App Router can preserve this client
  // component across ?tag= navigations, so the prop changes while state would not.
  // Adjust state during render (React's recommended prop-sync pattern, no effect).
  const [prevInitialTag, setPrevInitialTag] = useState(initialTag)
  if (initialTag !== prevInitialTag) {
    setPrevInitialTag(initialTag)
    setTag(initialTag)
  }

  const value = useMemo(
    () => ({ query, setQuery, category, setCategory, tag, setTag }),
    [query, category, tag]
  )
  return <BlogFilterContext.Provider value={value}>{children}</BlogFilterContext.Provider>
}

export function useBlogFilter() {
  const ctx = useContext(BlogFilterContext)
  if (!ctx) throw new Error("useBlogFilter must be used within BlogFilterProvider")
  return ctx
}
