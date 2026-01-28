import { NextRequest, NextResponse } from "next/server"
import { acceptInvitation } from "@/app/dashboard/actions"

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json()
        await acceptInvitation(token)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to accept invitation" },
            { status: 400 }
        )
    }
}
