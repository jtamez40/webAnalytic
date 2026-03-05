"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Fuse from "fuse.js"
import { Search, FileText, ArrowRight, X } from "lucide-react"
import { pages, type PageItem } from "@/lib/search-data"
import { cn } from "@/lib/utils"
import { Kbd } from "@/components/ui/kbd"

const MAX_RESULTS = 8
const SNIPPET_LENGTH = 120

interface FuseMatch {
  indices: readonly [number, number][]
  key?: string
  value?: string
}

interface FuseResult {
  item: PageItem
  matches?: readonly FuseMatch[]
}

function highlightText(text: string, indices: readonly [number, number][]): React.ReactNode[] {
  if (!indices || indices.length === 0) return [text]

  const merged: [number, number][] = []
  const sorted = [...indices].sort((a, b) => a[0] - b[0])
  for (const [start, end] of sorted) {
    if (merged.length > 0 && start <= merged[merged.length - 1][1] + 1) {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end)
    } else {
      merged.push([start, end])
    }
  }

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  merged.forEach(([start, end], i) => {
    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start))
    }
    parts.push(
      <mark
        key={`hl-${i}`}
        className="bg-highlight text-highlight-foreground rounded-sm px-0.5"
      >
        {text.slice(start, end + 1)}
      </mark>
    )
    lastIndex = end + 1
  })
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}

function getSnippet(
  content: string,
  matches: readonly FuseMatch[] | undefined,
  key: string
): { text: string; indices: readonly [number, number][] } {
  const matchForKey = matches?.find((m) => m.key === key)

  if (!matchForKey || matchForKey.indices.length === 0) {
    return { text: content.slice(0, SNIPPET_LENGTH) + (content.length > SNIPPET_LENGTH ? "..." : ""), indices: [] }
  }

  const firstMatch = matchForKey.indices[0]
  const matchStart = firstMatch[0]
  const start = Math.max(0, matchStart - 30)
  const end = Math.min(content.length, start + SNIPPET_LENGTH)
  const snippet = (start > 0 ? "..." : "") + content.slice(start, end) + (end < content.length ? "..." : "")

  const offset = start > 0 ? start - 3 : start
  const adjustedIndices: [number, number][] = matchForKey.indices
    .map(([s, e]): [number, number] => [s - offset, e - offset])
    .filter(([s, e]) => s >= 0 && s < snippet.length && e >= 0)
    .map(([s, e]): [number, number] => [s, Math.min(e, snippet.length - 1)])

  return { text: snippet, indices: adjustedIndices }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const fuse = useMemo(
    () =>
      new Fuse(pages, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "description", weight: 0.3 },
          { name: "content", weight: 0.3 },
        ],
        includeMatches: true,
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    []
  )

  const results: FuseResult[] = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).slice(0, MAX_RESULTS) as FuseResult[]
  }, [query, fuse])

  const toggle = useCallback(() => {
    setOpen((prev) => {
      if (prev) setQuery("")
      return !prev
    })
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        toggle()
      }
      if (e.key === "Escape" && open) {
        e.preventDefault()
        setOpen(false)
        setQuery("")
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, toggle])

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery("")
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <>
      <button
        onClick={toggle}
        className={cn(
          "flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5",
          "text-sm text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        aria-label="Search pages"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search</span>
        <Kbd className="ml-1 hidden sm:inline-flex">
          {"Ctrl+K"}
        </Kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm">
          <div
            ref={panelRef}
            className={cn(
              "fixed right-4 top-4 z-50 w-full max-w-lg",
              "rounded-xl border border-border bg-popover shadow-2xl shadow-background/80",
              "animate-in fade-in-0 slide-in-from-top-2 duration-200"
            )}
            role="dialog"
            aria-label="Search"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, docs, blog..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(
                  "flex-1 bg-transparent text-sm text-foreground",
                  "placeholder:text-muted-foreground outline-none"
                )}
                aria-label="Search input"
              />
              <button
                onClick={() => {
                  setOpen(false)
                  setQuery("")
                }}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close search"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain">
              {query.trim() === "" && (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Start typing to search across pages
                  </p>
                </div>
              )}

              {query.trim() !== "" && results.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-secondary">
                    <Search className="size-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">No results found</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {"Try a different search term or check your spelling"}
                  </p>
                </div>
              )}

              {results.length > 0 && (
                <ul className="p-2" role="listbox" aria-label="Search results">
                  {results.map((result, index) => {
                    const titleMatch = result.matches?.find((m) => m.key === "title")
                    const titleIndices = titleMatch?.indices ?? []

                    const descMatch = result.matches?.find(
                      (m) => m.key === "description"
                    )
                    const contentMatch = result.matches?.find(
                      (m) => m.key === "content"
                    )
                    const combinedText =
                      result.item.description + " " + result.item.content
                    const combinedIndices: [number, number][] = [
                      ...(descMatch?.indices.map(
                        ([s, e]): [number, number] => [s, e]
                      ) ?? []),
                      ...(contentMatch?.indices.map(
                        ([s, e]): [number, number] => [
                          s + result.item.description.length + 1,
                          e + result.item.description.length + 1,
                        ]
                      ) ?? []),
                    ]
                    const snippetData = getSnippet(
                      combinedText,
                      combinedIndices.length > 0
                        ? [{ indices: combinedIndices, key: "combined" }]
                        : undefined,
                      "combined"
                    )

                    return (
                      <li key={result.item.url} role="option" aria-selected={false}>
                        <a
                          href={result.item.url}
                          className={cn(
                            "group flex items-start gap-3 rounded-lg px-3 py-2.5",
                            "transition-colors hover:bg-secondary",
                            index === 0 && "bg-secondary/60"
                          )}
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary group-hover:bg-muted">
                            <FileText className="size-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {highlightText(result.item.title, titleIndices)}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {highlightText(snippetData.text, snippetData.indices)}
                            </p>
                          </div>
                          <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Kbd>Esc</Kbd>
                  <span>to close</span>
                </span>
              </div>
              {results.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
