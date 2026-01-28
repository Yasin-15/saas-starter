import Link from "next/link"
import { Zap, Shield, Users, CreditCard, BarChart3, Globe, ArrowRight, Check } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 h-16 flex items-center justify-between border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center text-primary-foreground font-bold">S</div>
          SaaS Starter
        </div>
        <nav className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-primary transition">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition shadow-sm">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center p-12 py-24 text-center bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/50 text-sm mb-6">
            <Zap size={16} className="text-primary" />
            <span>Launch your SaaS in minutes, not months</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Build Your Next <span className="text-primary">SaaS Product</span> Faster
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            A production-ready multi-tenant SaaS starter with authentication, billing, team management, and a beautiful dashboard. Everything you need to launch your B2B application.
          </p>

          <div className="flex gap-4 flex-col sm:flex-row mb-12">
            <Link href="/register" className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition shadow-lg hover:shadow-xl flex items-center gap-2">
              Start Building Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="px-8 py-4 border-2 border-border bg-background hover:bg-muted/50 rounded-lg font-semibold text-lg transition">
              View Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl w-full pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Type Safe</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">MIT</div>
              <div className="text-sm text-muted-foreground">License</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
              <p className="text-xl text-muted-foreground">Built with modern technologies and best practices</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Shield className="text-primary" size={24} />}
                title="Secure Authentication"
                description="NextAuth integration with credentials provider, JWT sessions, and role-based access control."
              />
              <FeatureCard
                icon={<Users className="text-primary" size={24} />}
                title="Multi-Tenancy"
                description="Complete tenant isolation with team management, invitations, and role assignments."
              />
              <FeatureCard
                icon={<CreditCard className="text-primary" size={24} />}
                title="Billing & Subscriptions"
                description="Pre-configured subscription models with Free, Pro, and Enterprise plans."
              />
              <FeatureCard
                icon={<BarChart3 className="text-primary" size={24} />}
                title="Analytics Dashboard"
                description="Beautiful dashboard with real-time metrics, usage tracking, and insights."
              />
              <FeatureCard
                icon={<Globe className="text-primary" size={24} />}
                title="API Ready"
                description="RESTful API structure with proper error handling and validation."
              />
              <FeatureCard
                icon={<Zap className="text-primary" size={24} />}
                title="Production Ready"
                description="Optimized for performance with TypeScript, Prisma ORM, and Next.js 14."
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Built With Modern Stack</h2>
              <p className="text-xl text-muted-foreground">Leveraging the best tools and frameworks</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <TechBadge name="Next.js 14" />
              <TechBadge name="TypeScript" />
              <TechBadge name="Prisma ORM" />
              <TechBadge name="NextAuth" />
              <TechBadge name="PostgreSQL" />
              <TechBadge name="Tailwind CSS" />
              <TechBadge name="React 19" />
              <TechBadge name="Server Actions" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your SaaS?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join developers who are shipping faster with our starter kit
            </p>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Link href="/register" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition shadow-lg">
                Get Started for Free
              </Link>
              <Link href="/login" className="px-8 py-4 border-2 border-border bg-background hover:bg-muted/50 rounded-lg font-semibold text-lg transition">
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 text-center border-t bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded"></div>
            <span className="font-bold text-lg">SaaS Starter</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            The fastest way to build and launch your SaaS application
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 SaaS Starter. Open Source MIT License.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:border-primary/50">
      <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function TechBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors">
      <span className="font-semibold text-sm">{name}</span>
    </div>
  )
}
