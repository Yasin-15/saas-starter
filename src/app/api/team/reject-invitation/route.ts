import { NextRequest, NextResponse } from "next/server"
import { rejectInvitation } from "@/app/dashboard/actions"

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json()
        await rejectInvitation(token)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to reject invitation" },
            { status: 400 }
        )
    }
}
