import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password, name } = registerSchema.parse(body)

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        })

        // Create a default tenant for the user
        const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + "-" + Math.floor(Math.random() * 10000)

        const tenant = await prisma.tenant.create({
            data: {
                name: `${name}'s Org`,
                slug,
                members: {
                    create: {
                        userId: user.id,
                        role: "OWNER"
                    }
                },
                subscription: {
                    create: {
                        plan: "FREE",
                        status: "active"
                    }
                }
            }
        })

        return NextResponse.json({ user: { id: user.id, email: user.email }, tenantId: tenant.id })
    } catch (error) {
        console.error("Registration error:", error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: (error as any).errors }, { status: 400 })
        }
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
