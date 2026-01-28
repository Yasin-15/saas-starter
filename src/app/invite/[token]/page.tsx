import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import InvitationPageClient from "./InvitationPageClient"

interface PageProps {
    params: {
        token: string
    }
}

export default async function InvitationPage({ params }: PageProps) {
    const session = await getServerSession(authOptions)
    const { token } = params

    // Fetch invitation
    const invitation = await prisma.invitation.findUnique({
        where: { token },
        include: { tenant: true }
    })

    if (!invitation) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
                    <h1 className="text-2xl font-bold text-center mb-4">Invitation Not Found</h1>
                    <p className="text-center text-muted-foreground mb-6">
                        This invitation link is invalid or has been removed.
                    </p>
                    <a
                        href="/"
                        className="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Go to Home
                    </a>
                </div>
            </div>
        )
    }

    // Check if expired
    const isExpired = new Date() > invitation.expiresAt

    // Check if already accepted/rejected
    const isProcessed = invitation.status !== "PENDING"

    // Serialize dates for client component
    const serializedInvitation = {
        ...invitation,
        createdAt: invitation.createdAt.toISOString(),
        expiresAt: invitation.expiresAt.toISOString(),
        updatedAt: invitation.updatedAt.toISOString()
    }

    const serializedTenant = {
        ...invitation.tenant,
        createdAt: invitation.tenant.createdAt.toISOString(),
        updatedAt: invitation.tenant.updatedAt.toISOString()
    }

    return (
        <InvitationPageClient
            invitation={serializedInvitation}
            tenant={serializedTenant}
            isExpired={isExpired}
            isProcessed={isProcessed}
            isLoggedIn={!!session}
            userEmail={session?.user?.email || null}
        />
    )
}
