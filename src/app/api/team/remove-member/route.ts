import { NextRequest, NextResponse } from "next/server"
import { removeMember } from "@/app/dashboard/actions"

export async function POST(request: NextRequest) {
    try {
        const { memberId } = await request.json()
        await removeMember(memberId)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to remove member" },
            { status: 400 }
        )
    }
}
