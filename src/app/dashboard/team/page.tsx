import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { User as UserIcon, Shield, Mail, MoreHorizontal } from "lucide-react"

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
                            role: 'asc' // OWNER first usually, but enum might be alphabetical? ROLE enum: OWNER, ADMIN, MEMBER, VIEWER
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your team and their permissions.
                    </p>
                </div>
                <button
                    disabled
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md opacity-50 cursor-not-allowed"
                >
                    <Mail size={16} />
                    Invite Member
                </button>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                    User
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                    Role
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                    Email
                                </th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {members.map((member) => (
                                <tr key={member.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                                {member.user.image ? (
                                                    <img src={member.user.image} alt={member.user.name || "User"} className="h-full w-full object-cover" />
                                                ) : (
                                                    <UserIcon size={16} className="text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="font-medium">{member.user.name || "Unknown Name"}</div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                                            <Shield size={12} />
                                            {member.role}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                        {member.user.email}
                                    </td>
                                    <td className="p-4 align-middle text-right [&:has([role=checkbox])]:pr-0">
                                        <button className="p-2 ghost hover:bg-muted rounded-md transition-colors">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
