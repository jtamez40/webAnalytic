export interface PageItem {
  url: string
  title: string
  description: string
  content: string
}

export const pages: PageItem[] = [
  {
    url: "/docs/getting-started",
    title: "Getting Started",
    description: "Learn how to set up your development environment and create your first project.",
    content:
      "Install the CLI tool globally using npm. Initialize a new project with the create command. Configure your environment variables and start the development server. The quickstart guide covers authentication setup, database connections, and deploying your first application.",
  },
  {
    url: "/docs/authentication",
    title: "Authentication Guide",
    description: "Implement secure user authentication with OAuth, JWT tokens, and session management.",
    content:
      "Set up OAuth providers like Google, GitHub, and Apple. Configure JWT token expiration and refresh strategies. Implement session management with secure HTTP-only cookies. Add two-factor authentication and rate limiting to protect user accounts from unauthorized access.",
  },
  {
    url: "/docs/database",
    title: "Database Configuration",
    description: "Connect and configure PostgreSQL, MySQL, or SQLite databases for your application.",
    content:
      "Choose between PostgreSQL, MySQL, or SQLite depending on your use case. Configure connection pooling for production environments. Set up migrations with automatic rollback support. Use the ORM layer for type-safe queries or write raw SQL for complex operations.",
  },
  {
    url: "/docs/api-routes",
    title: "API Routes",
    description: "Build type-safe API endpoints with request validation and error handling.",
    content:
      "Define API routes using the file-system based router. Add request validation with Zod schemas. Implement middleware for authentication, CORS, and rate limiting. Return type-safe responses with proper HTTP status codes and error messages.",
  },
  {
    url: "/docs/deployment",
    title: "Deployment",
    description: "Deploy your application to production with zero-downtime deployments.",
    content:
      "Deploy to Vercel, AWS, or any cloud provider with Docker support. Configure CI/CD pipelines for automatic deployments on push. Set up preview environments for pull requests. Monitor performance with built-in analytics and error tracking dashboards.",
  },
  {
    url: "/docs/components",
    title: "Component Library",
    description: "Pre-built, accessible UI components for rapid application development.",
    content:
      "Use the built-in component library with buttons, forms, modals, and navigation elements. All components follow WAI-ARIA accessibility standards. Customize themes with CSS variables and design tokens. Extend components with variant props for consistent styling across your application.",
  },
  {
    url: "/docs/state-management",
    title: "State Management",
    description: "Manage application state with hooks, context, and server state synchronization.",
    content:
      "Use React hooks for local component state. Implement context providers for shared state across component trees. Synchronize server state with SWR or React Query for data fetching and caching. Handle optimistic updates and error recovery patterns for real-time applications.",
  },
  {
    url: "/docs/testing",
    title: "Testing Guide",
    description: "Write unit tests, integration tests, and end-to-end tests for your application.",
    content:
      "Set up Jest and React Testing Library for unit and integration tests. Write end-to-end tests with Playwright for critical user flows. Configure code coverage thresholds and test reporters. Use mock service workers for API testing without external dependencies.",
  },
  {
    url: "/docs/performance",
    title: "Performance Optimization",
    description: "Optimize bundle size, rendering, and network requests for fast page loads.",
    content:
      "Analyze bundle size with the built-in bundle analyzer. Implement code splitting and lazy loading for route-based chunks. Optimize images with automatic compression and responsive formats. Configure caching headers and CDN distribution for global performance.",
  },
  {
    url: "/docs/security",
    title: "Security Best Practices",
    description: "Protect your application against common vulnerabilities and attacks.",
    content:
      "Implement Content Security Policy headers to prevent XSS attacks. Configure CORS policies for API endpoints. Use parameterized queries to prevent SQL injection. Set up rate limiting, input validation, and output encoding for comprehensive security hardening.",
  },
  {
    url: "/blog/whats-new",
    title: "What's New in v3.0",
    description: "Explore the latest features including streaming, server components, and edge runtime.",
    content:
      "Version 3.0 introduces streaming server-side rendering for faster time to first byte. React Server Components reduce client-side JavaScript bundles. The new edge runtime enables serverless functions at the network edge for lower latency worldwide.",
  },
  {
    url: "/blog/migration-guide",
    title: "Migration Guide",
    description: "Step-by-step instructions for upgrading from v2 to v3 with minimal downtime.",
    content:
      "Follow the automated migration tool to update configuration files and dependencies. Review breaking changes in the API layer and update affected endpoints. Test your application with the compatibility mode before fully committing to the new version.",
  },
  {
    url: "/pricing",
    title: "Pricing Plans",
    description: "Choose the right plan for your team with flexible pricing and usage-based billing.",
    content:
      "The free tier includes unlimited projects with community support. Pro plans offer custom domains, analytics, and priority support. Enterprise plans include SSO, audit logs, and dedicated infrastructure. All plans include automatic scaling and DDoS protection.",
  },
  {
    url: "/docs/middleware",
    title: "Middleware",
    description: "Add request processing layers for authentication, logging, and request transformation.",
    content:
      "Create middleware functions that run before route handlers. Chain multiple middleware for complex request processing pipelines. Use built-in middleware for common tasks like authentication verification, request logging, and response compression.",
  },
  {
    url: "/docs/caching",
    title: "Caching Strategies",
    description: "Implement client-side and server-side caching for optimal data delivery.",
    content:
      "Configure stale-while-revalidate caching for frequently accessed data. Implement Redis-based server cache for expensive database queries. Use incremental static regeneration for content that changes periodically. Set up edge caching with custom TTL values for API responses.",
  },
]
