import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 h-16 flex items-center justify-between border-b">
        <div className="font-bold text-xl flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded"></div>
          SaaS Starter
        </div>
        <nav className="flex gap-4">
          <Link href="/login" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-b from-background to-muted/20">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
          The Ultimate <span className="text-primary">Multi-Tenant SaaS</span> Starter Kit
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Launch your B2B application in minutes. Includes authentication, tenant isolation, billing, team management, and a premium dashboard.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link href="/login" className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-bold text-lg hover:opacity-90 transition">
            Get Started Now
          </Link>
          <Link href="#" className="px-8 py-4 border border-input bg-background hover:bg-accent rounded-md font-medium text-lg transition">
            View Documentation
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full">
          <div className="p-6 border rounded-xl bg-card text-left shadow-sm">
            <div className="font-bold text-lg mb-2">Multi-Tenancy</div>
            <p className="text-muted-foreground">Built-in data isolation per tenant with support for custom subdomains.</p>
          </div>
          <div className="p-6 border rounded-xl bg-card text-left shadow-sm">
            <div className="font-bold text-lg mb-2">Authentication</div>
            <p className="text-muted-foreground">Secure login with NextAuth, role-based access control (RBAC), and team invites.</p>
          </div>
          <div className="p-6 border rounded-xl bg-card text-left shadow-sm">
            <div className="font-bold text-lg mb-2">Billing Ready</div>
            <p className="text-muted-foreground">Subscription models pre-configured in the database schema.</p>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        © 2026 SaaS Starter. Open Source.
      </footer>
    </div>
  )
}
