'use client'


import Link from "next/link"
import Image from "next/image"
import { Zap, Shield, Users, CreditCard, BarChart3, Globe, ArrowRight, Check, Code, Sparkles, Rocket, Star } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Theme Toggle */}
      <header className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 z-50 transition-all">
        <div className="font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary to-primary/60 rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20 animate-pulse">
            S
          </div>
          <span className="hidden sm:inline">SaaS Starter</span>
        </div>
        <nav className="flex gap-2 sm:gap-3 items-center">
          <ThemeToggle />
          <Link href="/login" className="px-3 sm:px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-3 sm:px-6 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section with Enhanced Gradients */}
        <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-32 text-center overflow-hidden">
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm mb-6 sm:mb-8 hover:border-primary/50 transition-all duration-300 group">
            <Sparkles size={16} className="text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-xs sm:text-sm">Launch your SaaS in minutes, not months</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 max-w-5xl">
            Build Your Next{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent animate-gradient">
              SaaS Product
            </span>{" "}
            Faster
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-8 sm:mb-10 leading-relaxed px-4">
            A production-ready multi-tenant SaaS starter with authentication, billing, team management, and a beautiful dashboard. Everything you need to launch your B2B application.
          </p>

          <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row mb-10 sm:mb-16 w-full sm:w-auto px-4">
            <Link
              href="/register"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              <Rocket size={20} className="group-hover:translate-y-[-2px] transition-transform" />
              Start Building Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-muted/50 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:border-primary/50 hover:scale-105"
            >
              View Demo
            </Link>

          </div>

          <div className="relative w-full max-w-5xl mx-auto mb-16 animate-fade-in-up">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/20 bg-background/50 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 z-10"></div>
              <Image
                src="/images/landing-hero.png"
                alt="SaaS Dashboard Interface"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Glossy reflection effect */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/30 to-transparent opacity-20 pointer-events-none z-20"></div>
          </div>

          {/* Stats with Animation */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl w-full pt-8 px-4">
            <div className="text-center group cursor-default">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                10+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Features</div>
            </div>
            <div className="text-center group cursor-default">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Type Safe</div>
            </div>
            <div className="text-center group cursor-default">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                MIT
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">License</div>
            </div>
          </div>
        </section>

        {/* Features Section with Glassmorphism */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm mb-4">
                <Star size={16} className="text-primary" />
                <span className="text-xs sm:text-sm">Everything You Need</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Powerful Features</h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Built with modern technologies and best practices
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm mb-4">
                <Code size={16} className="text-primary" />
                <span className="text-xs sm:text-sm">Modern Stack</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Built With The Best</h2>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Leveraging cutting-edge tools and frameworks
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                  Why Choose Our Starter?
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-8">
                  Save weeks of development time with our battle-tested SaaS foundation. Focus on your unique features while we handle the infrastructure.
                </p>
                <div className="space-y-4">
                  <BenefitItem text="Save 100+ hours of development time" />
                  <BenefitItem text="Production-ready from day one" />
                  <BenefitItem text="Best practices built-in" />
                  <BenefitItem text="Regular updates and improvements" />
                  <BenefitItem text="Comprehensive documentation" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <MetricCard value="99.9%" label="Uptime" />
                  <MetricCard value="<100ms" label="Response Time" />
                </div>
                <div className="space-y-4 pt-8">
                  <MetricCard value="A+" label="Security Grade" />
                  <MetricCard value="100%" label="Test Coverage" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section with Enhanced Gradient */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 -z-10" />
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Build Your SaaS?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-10">
              Join developers who are shipping faster with our starter kit
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center flex-col sm:flex-row">
              <Link
                href="/register"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
              >
                Get Started for Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-muted/50 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:border-primary/50 hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-center border-t bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded shadow-lg shadow-primary/20" />
            <span className="font-bold text-lg">SaaS Starter</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            The fastest way to build and launch your SaaS application
          </p>
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </Link>
          </div>
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
    <div className="group p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50 hover:scale-105 cursor-default">
      <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function TechBadge({ name }: { name: string }) {
  return (
    <div className="group flex items-center justify-center p-3 sm:p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:scale-105 cursor-default">
      <span className="font-semibold text-xs sm:text-sm group-hover:text-primary transition-colors">{name}</span>
    </div>
  )
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Check size={14} className="text-primary" />
      </div>
      <span className="text-sm sm:text-base">{text}</span>
    </div>
  )
}

function MetricCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/50 hover:scale-105 cursor-default">
      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
