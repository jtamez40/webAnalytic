import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="flex flex-col items-center justify-center py-24 text-center sm:py-32">
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
            {"Press Ctrl+K to search"}
          </div>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build faster with the right tools
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A modern developer platform with everything you need to ship production applications. Search our docs above to get started.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/docs/getting-started"
              className="inline-flex h-10 items-center rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Get Started
            </a>
            <a
              href="/docs/components"
              className="inline-flex h-10 items-center rounded-lg border border-border bg-secondary px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              View Components
            </a>
          </div>
        </section>

        <section className="grid gap-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Lightning Fast",
              desc: "Edge-optimized runtime with global CDN distribution for sub-50ms response times worldwide.",
            },
            {
              title: "Type Safe",
              desc: "End-to-end TypeScript with auto-generated types for your database schema and API routes.",
            },
            {
              title: "Production Ready",
              desc: "Built-in analytics, error tracking, and monitoring. Deploy with confidence to any cloud.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary"
            >
              <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.desc}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
