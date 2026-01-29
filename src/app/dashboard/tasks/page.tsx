
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Plus, CheckSquare } from "lucide-react"

export default async function TasksPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/login")
    }

    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: {
            tenant: {
                include: {
                    tasks: {
                        orderBy: { updatedAt: 'desc' }
                    }
                }
            }
        }
    })

    if (!membership) {
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
    const tasks = tenant.tasks

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage tasks for {tenant.name}
                    </p>
                </div>
                <button
                    disabled
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm opacity-50 cursor-not-allowed"
                >
                    <Plus size={16} />
                    New Task
                </button>
            </div>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="flex items-center gap-4 rounded-xl border bg-card text-card-foreground shadow-sm p-4"
                    >
                        <div className={`p-2 rounded-lg ${task.completed ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                            <CheckSquare size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {task.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {task.assignedTo ? `Assigned to ${task.assignedTo}` : 'Unassigned'} • Updated {new Date(task.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}

                {tasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-muted/30 text-muted-foreground">
                        <div className="relative w-40 h-40 mb-4 opacity-90">
                            <Image
                                src="/images/tasks-illustration.png"
                                alt="No tasks"
                                fill
                                className="object-contain drop-shadow-xl"
                            />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No tasks found</h3>
                        <p className="mb-4">Get started by creating your first task.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
