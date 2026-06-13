"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

interface BlogFilterValue {
  query: string
  setQuery: (q: string) => void
  category: string
  setCategory: (c: string) => void
}

const BlogFilterContext = createContext<BlogFilterValue | null>(null)

export function BlogFilterProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const value = useMemo(
    () => ({ query, setQuery, category, setCategory }),
    [query, category]
  )
  return <BlogFilterContext.Provider value={value}>{children}</BlogFilterContext.Provider>
}

export function useBlogFilter() {
  const ctx = useContext(BlogFilterContext)
  if (!ctx) throw new Error("useBlogFilter must be used within BlogFilterProvider")
  return ctx
}
