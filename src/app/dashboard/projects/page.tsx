import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus, Folder } from "lucide-react"

export default async function ProjectsPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/login")
    }

    // Get the user's first tenant for now
    // In a real app, you'd select the tenant from the URL or user state
    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: {
            tenant: {
                include: {
                    projects: {
                        orderBy: { updatedAt: 'desc' }
                    }
                }
            }
        }
    })

    if (!membership) {
        // Handle case where user has no tenant (shouldn't happen with proper onboarding)
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <p className="text-muted-foreground">You don't belong to any organization.</p>
                <Link href="/onboarding" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                    Create Organization
                </Link>
            </div>
        )
    }

    const { tenant } = membership
    const projects = tenant.projects

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage projects for {tenant.name}
                    </p>
                </div>
                <Link
                    href="/dashboard/projects/new"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    New Project
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group relative rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md p-6"
                    >
                        <div className="flex items-start justify-between">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary mb-4">
                                <Folder size={24} />
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {new Date(project.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description || "No description provided."}
                        </p>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-muted/50 text-muted-foreground">
                        <Folder className="h-12 w-12 mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-1">No projects found</h3>
                        <p className="mb-4">Get started by creating your first project.</p>
                        <Link
                            href="/dashboard/projects/new"
                            className="bg-background border border-border px-4 py-2 rounded-md hover:bg-muted transition-colors"
                        >
                            Create Project
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
