
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus, StickyNote } from "lucide-react"

export default async function NotesPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/login")
    }

    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: {
            tenant: {
                include: {
                    notes: {
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
    const notes = tenant.notes

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage notes for {tenant.name}
                    </p>
                </div>
                <button
                    disabled
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm opacity-50 cursor-not-allowed"
                >
                    <Plus size={16} />
                    New Note
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="group relative rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                                <StickyNote size={24} />
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {new Date(note.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-sm line-clamp-4 whitespace-pre-wrap">
                            {note.content}
                        </p>
                    </div>
                ))}

                {notes.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-muted/50 text-muted-foreground">
                        <StickyNote className="h-12 w-12 mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-1">No notes found</h3>
                        <p className="mb-4">Create your first note to get started.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
