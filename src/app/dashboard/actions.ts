'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProject(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const name = formData.get("name") as string
    const description = formData.get("description") as string

    if (!name) {
        throw new Error("Project name is required")
    }

    // Get tenant
    // In a multi-tenant app, you might pass the tenantId from the form (as a hidden input)
    // For now, we'll grab the user's first tenant
    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id }
    })

    if (!membership) {
        throw new Error("No tenant found for user")
    }

    await prisma.project.create({
        data: {
            name,
            description,
            tenantId: membership.tenantId
        }
    })

    revalidatePath("/dashboard/projects")
    redirect("/dashboard/projects")
}

export async function updateTenant(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const name = formData.get("name") as string
    const timezone = formData.get("timezone") as string

    // Get tenant
    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id }
    })

    if (!membership) {
        throw new Error("No tenant found")
    }

    await prisma.tenant.update({
        where: { id: membership.tenantId },
        data: {
            name,
            timezone
        }
    })

    revalidatePath("/dashboard/settings")
    // No redirect needed, just stay on page
}

export async function upgradeSubscription(plan: 'PRO' | 'ENTERPRISE') {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Get tenant
    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: { tenant: { include: { subscription: true } } }
    })

    if (!membership) {
        throw new Error("No tenant found")
    }

    // Update or create subscription
    if (membership.tenant.subscription) {
        await prisma.subscription.update({
            where: { id: membership.tenant.subscription.id },
            data: {
                plan,
                status: 'active',
                startDate: new Date()
            }
        })
    } else {
        await prisma.subscription.create({
            data: {
                tenantId: membership.tenantId,
                plan,
                status: 'active',
                startDate: new Date()
            }
        })
    }

    revalidatePath("/dashboard/billing")
    revalidatePath("/dashboard")
}

// Team Invitation Actions

export async function inviteTeamMember(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const email = formData.get("email") as string
    const role = (formData.get("role") as string || "MEMBER") as "OWNER" | "ADMIN" | "MEMBER" | "VIEWER"

    if (!email || !email.includes("@")) {
        throw new Error("Valid email is required")
    }

    // Get tenant and verify user has permission to invite
    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: { tenant: true }
    })

    if (!membership) {
        throw new Error("No tenant found")
    }

    // Only OWNER and ADMIN can invite members
    if (membership.role !== "OWNER" && membership.role !== "ADMIN") {
        throw new Error("You don't have permission to invite members")
    }

    // Check if user is already a member
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        const existingMembership = await prisma.tenantUser.findFirst({
            where: {
                userId: existingUser.id,
                tenantId: membership.tenantId
            }
        })

        if (existingMembership) {
            throw new Error("User is already a member of this team")
        }
    }

    // Check if there's already a pending invitation
    const existingInvitation = await prisma.invitation.findFirst({
        where: {
            tenantId: membership.tenantId,
            email,
            status: "PENDING"
        }
    })

    if (existingInvitation) {
        throw new Error("An invitation has already been sent to this email")
    }

    // Generate a unique token
    const token = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`

    // Create invitation (expires in 7 days)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await prisma.invitation.create({
        data: {
            tenantId: membership.tenantId,
            email,
            role,
            token,
            expiresAt,
            invitedBy: session.user.id
        }
    })

    // TODO: Send invitation email with link containing token
    // For now, we'll just log it
    console.log(`Invitation link: ${process.env.NEXTAUTH_URL}/invite/${token}`)

    revalidatePath("/dashboard/team")
}

export async function cancelInvitation(invitationId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Get tenant and verify user has permission
    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id }
    })

    if (!membership) {
        throw new Error("No tenant found")
    }

    // Only OWNER and ADMIN can cancel invitations
    if (membership.role !== "OWNER" && membership.role !== "ADMIN") {
        throw new Error("You don't have permission to cancel invitations")
    }

    // Verify invitation belongs to the same tenant
    const invitation = await prisma.invitation.findUnique({
        where: { id: invitationId }
    })

    if (!invitation || invitation.tenantId !== membership.tenantId) {
        throw new Error("Invitation not found")
    }

    await prisma.invitation.delete({
        where: { id: invitationId }
    })

    revalidatePath("/dashboard/team")
}

export async function acceptInvitation(token: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const invitation = await prisma.invitation.findUnique({
        where: { token },
        include: { tenant: true }
    })

    if (!invitation) {
        throw new Error("Invitation not found")
    }

    if (invitation.status !== "PENDING") {
        throw new Error("Invitation is no longer valid")
    }

    if (new Date() > invitation.expiresAt) {
        await prisma.invitation.update({
            where: { id: invitation.id },
            data: { status: "EXPIRED" }
        })
        throw new Error("Invitation has expired")
    }

    // Verify the email matches the logged-in user
    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    })

    if (!user || user.email !== invitation.email) {
        throw new Error("This invitation was sent to a different email address")
    }

    // Check if user is already a member
    const existingMembership = await prisma.tenantUser.findFirst({
        where: {
            userId: user.id,
            tenantId: invitation.tenantId
        }
    })

    if (existingMembership) {
        // Update invitation status and redirect
        await prisma.invitation.update({
            where: { id: invitation.id },
            data: { status: "ACCEPTED" }
        })
        redirect("/dashboard")
    }

    // Create tenant membership
    await prisma.tenantUser.create({
        data: {
            userId: user.id,
            tenantId: invitation.tenantId,
            role: invitation.role
        }
    })

    // Update invitation status
    await prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: "ACCEPTED" }
    })

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

export async function rejectInvitation(token: string) {
    const invitation = await prisma.invitation.findUnique({
        where: { token }
    })

    if (!invitation) {
        throw new Error("Invitation not found")
    }

    await prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: "REJECTED" }
    })

    redirect("/")
}

export async function removeMember(memberId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Get current user's membership
    const currentMembership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id }
    })

    if (!currentMembership) {
        throw new Error("No tenant found")
    }

    // Only OWNER and ADMIN can remove members
    if (currentMembership.role !== "OWNER" && currentMembership.role !== "ADMIN") {
        throw new Error("You don't have permission to remove members")
    }

    // Get the member to be removed
    const memberToRemove = await prisma.tenantUser.findUnique({
        where: { id: memberId }
    })

    if (!memberToRemove || memberToRemove.tenantId !== currentMembership.tenantId) {
        throw new Error("Member not found")
    }

    // Prevent removing the last owner
    if (memberToRemove.role === "OWNER") {
        const ownerCount = await prisma.tenantUser.count({
            where: {
                tenantId: currentMembership.tenantId,
                role: "OWNER"
            }
        })

        if (ownerCount <= 1) {
            throw new Error("Cannot remove the last owner")
        }
    }

    // Prevent non-owners from removing owners or admins
    if (currentMembership.role === "ADMIN" && (memberToRemove.role === "OWNER" || memberToRemove.role === "ADMIN")) {
        throw new Error("Admins cannot remove owners or other admins")
    }

    await prisma.tenantUser.delete({
        where: { id: memberId }
    })

    revalidatePath("/dashboard/team")
}

