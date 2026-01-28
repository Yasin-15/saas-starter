import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Check, CreditCard, Zap } from "lucide-react"

export default async function BillingPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/login")
    }

    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: {
            tenant: {
                include: {
                    subscription: true
                }
            }
        }
    })

    if (!membership) {
        return <div>No organization found.</div>
    }

    const { tenant } = membership
    const subscription = tenant.subscription

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your subscription and billing details.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <CreditCard size={20} />
                        Current Plan
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                            <div>
                                <p className="font-semibold">{subscription?.plan || "FREE"} Plan</p>
                                <p className="text-sm text-muted-foreground capitalize">{subscription?.status || "active"}</p>
                            </div>
                            <span className="text-2xl font-bold">{subscription?.plan === "PRO" ? "$29" : "$0"}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                        </div>
                        {subscription?.plan === "FREE" ? (
                            <button className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
                                Upgrade to Pro
                            </button>
                        ) : (
                            <button className="w-full py-2 border border-border bg-background hover:bg-muted transition-colors rounded-md font-medium">
                                Manage Subscription
                            </button>
                        )}
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
                    <div className="flex flex-col items-center justify-center text-center h-[140px] border-2 border-dashed rounded-lg bg-muted/20">
                        <p className="text-muted-foreground text-sm mb-2">No payment method added</p>
                        <button className="text-primary text-sm font-medium hover:underline">
                            Add Payment Method
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-6">Available Plans</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <PlanCard
                        name="Free"
                        price="$0"
                        features={["Up to 5 Projects", "2 Team Members", "Basic Support"]}
                        current={subscription?.plan === "FREE" || !subscription}
                    />
                    <PlanCard
                        name="Pro"
                        price="$29"
                        features={["Unlimited Projects", "10 Team Members", "Priority Support", "Analytics"]}
                        current={subscription?.plan === "PRO"}
                        recommended
                    />
                    <PlanCard
                        name="Enterprise"
                        price="Custom"
                        features={["Unlimited Everything", "SSO", "24/7 Support", "Custom Contract"]}
                        current={subscription?.plan === "ENTERPRISE"}
                    />
                </div>
            </div>
        </div>
    )
}

function PlanCard({ name, price, features, current, recommended }: { name: string, price: string, features: string[], current?: boolean, recommended?: boolean }) {
    return (
        <div className={`relative rounded-xl border p-6 shadow-sm flex flex-col ${recommended ? 'border-primary ring-1 ring-primary bg-primary/5' : 'bg-card'}`}>
            {recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    Recommended
                </div>
            )}
            <div className="mb-4">
                <h4 className="text-lg font-bold">{name}</h4>
                <div className="mt-2 text-3xl font-bold">{price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            </div>
            <ul className="space-y-3 mb-6 flex-1">
                {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
            <button
                disabled={current}
                className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${current
                        ? "bg-muted text-muted-foreground cursor-default"
                        : recommended
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
            >
                {current ? "Current Plan" : "Upgrade"}
            </button>
        </div>
    )
}
