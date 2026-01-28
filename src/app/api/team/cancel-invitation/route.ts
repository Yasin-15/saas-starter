import { NextRequest, NextResponse } from "next/server"
import { cancelInvitation } from "@/app/dashboard/actions"

export async function POST(request: NextRequest) {
    try {
        const { invitationId } = await request.json()
        await cancelInvitation(invitationId)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to cancel invitation" },
            { status: 400 }
        )
    }
}
