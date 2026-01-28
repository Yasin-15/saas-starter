import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import TeamPageClient from "./TeamPageClient"

export default async function TeamPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/login")
    }

    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: {
            tenant: {
                include: {
                    members: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            role: 'asc'
                        }
                    },
                    invitations: {
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            }
        }
    })

    if (!membership) {
        return <div>No organization found.</div>
    }

    const { tenant } = membership
    const members = tenant.members

    // Serialize dates to strings for client component
    const invitations = tenant.invitations.map(inv => ({
        ...inv,
        createdAt: inv.createdAt.toISOString(),
        expiresAt: inv.expiresAt.toISOString()
    }))

    return (
        <TeamPageClient
            members={members}
            invitations={invitations}
            currentUserRole={membership.role}
        />
    )
}
