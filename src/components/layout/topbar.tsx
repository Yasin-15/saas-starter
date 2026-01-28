'use client'

import { Bell, UserCircle, Search, LogOut, ChevronDown } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"

export default function Topbar() {
    const { data: session } = useSession()
    const [showUserMenu, setShowUserMenu] = useState(false)

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' })
    }

    return (
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4 w-1/3">
                {/* Tenant Switcher Placeholder */}
                <div className="flex items-center gap-2 px-3 py-1.5 border border-input rounded-md cursor-pointer hover:bg-accent">
                    <div className="w-5 h-5 rounded-full bg-primary/20"></div>
                    <span className="text-sm font-medium">Organization</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-muted-foreground hover:text-foreground">
                    <Search size={20} />
                </button>
                <button className="text-muted-foreground hover:text-foreground relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">3</span>
                </button>
                <div className="h-8 w-px bg-border mx-2"></div>

                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 text-sm font-medium hover:bg-accent px-3 py-2 rounded-md transition-colors"
                    >
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <UserCircle size={20} className="text-primary" />
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
                            <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                        </div>
                        <ChevronDown size={16} className="text-muted-foreground" />
                    </button>

                    {showUserMenu && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowUserMenu(false)}
                            />
                            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border z-20">
                                <div className="py-1">
                                    <div className="px-4 py-3 border-b border-border">
                                        <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
                                        <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
