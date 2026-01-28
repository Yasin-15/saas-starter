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
