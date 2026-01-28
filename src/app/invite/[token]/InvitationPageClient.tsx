"use client"

import { useState } from "react"
import { Mail, Building2, Shield, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

interface Invitation {
    id: string
    email: string
    role: string
    status: string
    expiresAt: string
    token: string
}

interface Tenant {
    id: string
    name: string
    logo: string | null
}

interface InvitationPageClientProps {
    invitation: Invitation
    tenant: Tenant
    isExpired: boolean
    isProcessed: boolean
    isLoggedIn: boolean
    userEmail: string | null
}

export default function InvitationPageClient({
    invitation,
    tenant,
    isExpired,
    isProcessed,
    isLoggedIn,
    userEmail
}: InvitationPageClientProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleAccept = async () => {
        setLoading(true)
        setError("")

        try {
            const response = await fetch("/api/team/accept-invitation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: invitation.token })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to accept invitation")
            }

            // Redirect to dashboard
            window.location.href = "/dashboard"
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleReject = async () => {
        if (!confirm("Are you sure you want to reject this invitation?")) return

        setLoading(true)
        setError("")

        try {
            const response = await fetch("/api/team/reject-invitation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: invitation.token })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to reject invitation")
            }

            // Redirect to home
            window.location.href = "/"
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Mail size={32} className="text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Team Invitation</h1>
                    <p className="text-muted-foreground">
                        You've been invited to join a team
                    </p>
                </div>

                {/* Organization Info */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Building2 size={24} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{tenant.name}</h2>
                            <p className="text-sm text-muted-foreground">Organization</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Invited as:</span>
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(invitation.role)}`}>
                                <Shield size={12} />
                                {invitation.role}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <span className="text-sm font-medium">{invitation.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Expires:</span>
                            <span className="text-sm font-medium flex items-center gap-1">
                                <Clock size={14} />
                                {new Date(invitation.expiresAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status Messages */}
                {isExpired && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                            <XCircle size={20} />
                            <span className="font-semibold">Invitation Expired</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                            This invitation has expired. Please contact the team administrator for a new invitation.
                        </p>
                    </div>
                )}

                {isProcessed && !isExpired && (
                    <div className={`${invitation.status === "ACCEPTED" ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"} border rounded-lg p-4 mb-6`}>
                        <div className={`flex items-center gap-2 ${invitation.status === "ACCEPTED" ? "text-green-700 dark:text-green-400" : "text-gray-700 dark:text-gray-400"}`}>
                            {invitation.status === "ACCEPTED" ? <CheckCircle size={20} /> : <XCircle size={20} />}
                            <span className="font-semibold">
                                Invitation {invitation.status === "ACCEPTED" ? "Accepted" : "Rejected"}
                            </span>
                        </div>
                        <p className="text-sm mt-1">
                            {invitation.status === "ACCEPTED"
                                ? "You have already accepted this invitation."
                                : "This invitation has been rejected."}
                        </p>
                    </div>
                )}

                {!isLoggedIn && !isExpired && !isProcessed && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                            <AlertCircle size={20} />
                            <span className="font-semibold">Login Required</span>
                        </div>
                        <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">
                            Please log in with the email address <strong>{invitation.email}</strong> to accept this invitation.
                        </p>
                    </div>
                )}

                {isLoggedIn && userEmail !== invitation.email && !isExpired && !isProcessed && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                            <AlertCircle size={20} />
                            <span className="font-semibold">Email Mismatch</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                            This invitation was sent to <strong>{invitation.email}</strong>, but you're logged in as <strong>{userEmail}</strong>. Please log in with the correct account.
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                            <XCircle size={20} />
                            <span className="font-semibold">Error</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
                    </div>
                )}

                {/* Actions */}
                {!isExpired && !isProcessed && (
                    <>
                        {!isLoggedIn ? (
                            <div className="space-y-3">
                                <a
                                    href={`/login?callbackUrl=/invite/${invitation.token}`}
                                    className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                                >
                                    Log In to Accept
                                </a>
                                <a
                                    href={`/register?email=${encodeURIComponent(invitation.email)}&callbackUrl=/invite/${invitation.token}`}
                                    className="block w-full text-center px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-semibold"
                                >
                                    Create Account
                                </a>
                            </div>
                        ) : userEmail === invitation.email ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleReject}
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50"
                                >
                                    {loading ? "Processing..." : "Accept Invitation"}
                                </button>
                            </div>
                        ) : (
                            <a
                                href={`/login?callbackUrl=/invite/${invitation.token}`}
                                className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                            >
                                Log In with Correct Account
                            </a>
                        )}
                    </>
                )}

                {(isExpired || isProcessed) && (
                    <a
                        href="/"
                        className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                    >
                        Go to Home
                    </a>
                )}
            </div>
        </div>
    )
}
