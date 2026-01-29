
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus, Key, Copy } from "lucide-react"

export default async function ApiKeysPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/login")
    }

    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: {
            tenant: {
                include: {
                    apiKeys: {
                        orderBy: { createdAt: 'desc' }
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
    const apiKeys = tenant.apiKeys

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage API keys for {tenant.name}
                    </p>
                </div>
                <button
                    disabled
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm opacity-50 cursor-not-allowed"
                >
                    <Plus size={16} />
                    New API Key
                </button>
            </div>

            <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                    <div
                        key={apiKey.id}
                        className="flex items-center justify-between rounded-xl border bg-card text-card-foreground shadow-sm p-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                                <Key size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium">
                                    {apiKey.name || "Untitled Key"}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">
                                        {apiKey.key.substring(0, 8)}...
                                    </code>
                                    <span className="text-xs text-muted-foreground">
                                        Created {new Date(apiKey.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {apiKey.lastUsed ? `Last used ${new Date(apiKey.lastUsed).toLocaleDateString()}` : "Never used"}
                        </div>
                    </div>
                ))}

                {apiKeys.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-muted/50 text-muted-foreground">
                        <Key className="h-12 w-12 mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-1">No API Keys found</h3>
                        <p className="mb-4">Generate your first API key to access the API.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
