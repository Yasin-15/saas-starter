import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
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
            return NextResponse.json({ error: "No tenant found" }, { status: 404 })
        }

        return NextResponse.json({ tenant: membership.tenant })
    } catch (error) {
        console.error("Error fetching tenant:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
