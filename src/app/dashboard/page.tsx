import { Users, Activity, CreditCard, ArrowUpRight } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/login")
    }

    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: {
            tenant: {
                include: {
                    members: true,
                    projects: true,
                    subscription: true
                }
            }
        }
    })

    if (!membership) {
        redirect("/onboarding") // Or handle case
    }

    const { tenant } = membership

    // Calculate stats
    const totalUsers = tenant.members.length
    const activeProjects = tenant.projects.length
    const plan = tenant.subscription?.plan || "FREE"
    const mrr = plan === "PRO" ? "$29" : (plan === "ENTERPRISE" ? "Custom" : "$0")

    // Mock user activity for now
    const activeUsers = Math.max(1, Math.floor(totalUsers * 0.8))

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Overview of {tenant.name}'s activity.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card title="Team Members" value={totalUsers.toString()} icon={Users} trend="Total members" />
                <Card title="Active Users" value={activeUsers.toString()} icon={Activity} trend="Last 30 days" />
                <Card title="MRR" value={mrr} icon={CreditCard} trend="Estimated revenue" />
                <Card title="Projects" value={activeProjects.toString()} icon={ArrowUpRight} trend="Active projects" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4">Recent Projects</h3>
                    <div className="space-y-6">
                        {tenant.projects.slice(0, 5).map((project) => (
                            <div key={project.id} className="flex items-start gap-4">
                                <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">{project.name}</p>
                                    <p className="text-xs text-muted-foreground">Updated {new Date(project.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                        {tenant.projects.length === 0 && (
                            <p className="text-muted-foreground text-sm">No projects created yet.</p>
                        )}
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm p-6 h-fit">
                    <h3 className="font-semibold text-lg mb-4">Usage Limits</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Projects</span>
                                <span className="text-muted-foreground">{activeProjects} / {plan === "FREE" ? "5" : "∞"}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${Math.min(100, (activeProjects / (plan === "FREE" ? 5 : 100)) * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Team Members</span>
                                <span className="text-muted-foreground">{totalUsers} / {plan === "FREE" ? "2" : (plan === "PRO" ? "10" : "∞")}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${Math.min(100, (totalUsers / (plan === "FREE" ? 2 : (plan === "PRO" ? 10 : 20))) * 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="pt-4">
                            {plan === "FREE" && (
                                <button className="w-full py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors">
                                    Upgrade Plan
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface CardProps {
    title: string
    value: string
    icon: React.ElementType
    trend: string
}

function Card({ title, value, icon: Icon, trend }: CardProps) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
                <Icon size={16} className="text-muted-foreground" />
            </div>
            <div className="pt-2">
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{trend}</p>
            </div>
        </div>
    )
}
