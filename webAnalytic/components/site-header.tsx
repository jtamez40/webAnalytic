import Link from "next/link"
import { CommandPalette } from "@/components/command-palette"

const navLinks = [
  { href: "/docs/getting-started", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/blog/whats-new", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
          >
            <div className="flex size-7 items-center justify-center rounded-md bg-foreground">
              <span className="text-xs font-bold text-background">A</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">Acme</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <CommandPalette />
        </div>
      </div>
    </header>
  )
}
