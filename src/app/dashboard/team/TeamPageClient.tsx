"use client"

import { useState } from "react"
import { User as UserIcon, Shield, Mail, MoreHorizontal, X, UserPlus, Clock, CheckCircle, XCircle } from "lucide-react"

interface Member {
    id: string
    role: string
    user: {
        id: string
        name: string | null
        email: string
        image: string | null
    }
}

interface Invitation {
    id: string
    email: string
    role: string
    status: string
    createdAt: string
    expiresAt: string
}

interface TeamPageClientProps {
    members: Member[]
    invitations: Invitation[]
    currentUserRole: string
}

export default function TeamPageClient({ members, invitations, currentUserRole }: TeamPageClientProps) {
    const [showInviteModal, setShowInviteModal] = useState(false)
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("MEMBER")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const canManageTeam = currentUserRole === "OWNER" || currentUserRole === "ADMIN"

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const formData = new FormData()
            formData.append("email", email)
            formData.append("role", role)

            const response = await fetch("/api/team/invite", {
                method: "POST",
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to send invitation")
            }

            setEmail("")
            setRole("MEMBER")
            setShowInviteModal(false)
            window.location.reload()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleCancelInvitation = async (invitationId: string) => {
        if (!confirm("Are you sure you want to cancel this invitation?")) return

        try {
            const response = await fetch("/api/team/cancel-invitation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ invitationId })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to cancel invitation")
            }

            window.location.reload()
        } catch (err: any) {
            alert(err.message)
        }
    }

    const handleRemoveMember = async (memberId: string, memberName: string) => {
        if (!confirm(`Are you sure you want to remove ${memberName} from the team?`)) return

        try {
            const response = await fetch("/api/team/remove-member", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to remove member")
            }

            window.location.reload()
        } catch (err: any) {
            alert(err.message)
        }
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "OWNER":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
            case "ADMIN":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            case "MEMBER":
                return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            case "VIEWER":
                return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            default:
                return "bg-secondary text-secondary-foreground"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Clock size={14} className="text-yellow-600" />
            case "ACCEPTED":
                return <CheckCircle size={14} className="text-green-600" />
            case "REJECTED":
                return <XCircle size={14} className="text-red-600" />
            case "EXPIRED":
                return <XCircle size={14} className="text-gray-600" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your team and their permissions.
                    </p>
                </div>
                {canManageTeam && (
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        <Mail size={16} />
                        Invite Member
                    </button>
                )}
            </div>

            {/* Active Members */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <UserIcon size={20} />
                        Active Members ({members.length})
                    </h2>
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    User
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Role
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Email
                                </th>
                                {canManageTeam && (
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {members.map((member) => (
                                <tr key={member.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle">
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
                                    <td className="p-4 align-middle">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getRoleBadgeColor(member.role)}`}>
                                            <Shield size={12} />
                                            {member.role}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        {member.user.email}
                                    </td>
                                    {canManageTeam && (
                                        <td className="p-4 align-middle text-right">
                                            {member.role !== "OWNER" && (
                                                <button
                                                    onClick={() => handleRemoveMember(member.id, member.user.name || member.user.email)}
                                                    className="p-2 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                                                    title="Remove member"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pending Invitations */}
            {canManageTeam && invitations.length > 0 && (
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Mail size={20} />
                            Pending Invitations ({invitations.filter(i => i.status === "PENDING").length})
                        </h2>
                    </div>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Email
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Role
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Status
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Expires
                                    </th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {invitations.map((invitation) => (
                                    <tr key={invitation.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">
                                            {invitation.email}
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getRoleBadgeColor(invitation.role)}`}>
                                                <Shield size={12} />
                                                {invitation.role}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="inline-flex items-center gap-1.5">
                                                {getStatusIcon(invitation.status)}
                                                <span className="text-xs">{invitation.status}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle text-xs text-muted-foreground">
                                            {new Date(invitation.expiresAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            {invitation.status === "PENDING" && (
                                                <button
                                                    onClick={() => handleCancelInvitation(invitation.id)}
                                                    className="p-2 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                                                    title="Cancel invitation"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowInviteModal(false)}>
                    <div className="bg-card rounded-xl shadow-2xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <UserPlus size={24} />
                                Invite Team Member
                            </h2>
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="p-2 hover:bg-muted rounded-md transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleInvite} className="space-y-4">
                            {error && (
                                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="colleague@example.com"
                                    required
                                    className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium mb-2">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="VIEWER">Viewer - Read-only access</option>
                                    <option value="MEMBER">Member - Standard access</option>
                                    <option value="ADMIN">Admin - Full access except billing</option>
                                    {currentUserRole === "OWNER" && (
                                        <option value="OWNER">Owner - Full access</option>
                                    )}
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowInviteModal(false)}
                                    className="flex-1 px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Send Invitation"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
