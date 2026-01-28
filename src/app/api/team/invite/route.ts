import { NextRequest, NextResponse } from "next/server"
import { inviteTeamMember } from "@/app/dashboard/actions"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        await inviteTeamMember(formData)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to send invitation" },
            { status: 400 }
        )
    }
}
