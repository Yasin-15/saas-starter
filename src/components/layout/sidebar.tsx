import Link from "next/link"
import { LayoutDashboard, Settings, Users, Folder, CreditCard, CheckSquare, StickyNote, Key } from "lucide-react"

export default function Sidebar() {
    return (
        <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col">
            <div className="p-6 h-16 flex items-center border-b border-sidebar-border">
                <Link href="/dashboard" className="text-xl font-bold flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center">S</div>
                    <span>SaaS App</span>
                </Link>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground">
                    <LayoutDashboard size={20} />
                    Dashboard
                </Link>
                <Link href="/dashboard/projects" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground hover:text-sidebar-foreground">
                    <Folder size={20} />
                    Projects
                </Link>
                <Link href="/dashboard/team" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground hover:text-sidebar-foreground">
                    <Users size={20} />
                    Team
                </Link>
                <Link href="/dashboard/billing" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground hover:text-sidebar-foreground">
                    <CreditCard size={20} />
                    Billing
                </Link>
                <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground hover:text-sidebar-foreground">
                    <Settings size={20} />
                    Settings
                </Link>
                <div className="my-2 border-t border-sidebar-border mx-3"></div>
                <Link href="/dashboard/tasks" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground hover:text-sidebar-foreground">
                    <CheckSquare size={20} />
                    Tasks
                </Link>
                <Link href="/dashboard/notes" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground hover:text-sidebar-foreground">
                    <StickyNote size={20} />
                    Notes
                </Link>
                <Link href="/dashboard/api-keys" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground hover:text-sidebar-foreground">
                    <Key size={20} />
                    API Keys
                </Link>
            </nav>
            <div className="p-4 border-t border-sidebar-border">
                <div className="text-xs text-muted-foreground">Logged in as User</div>
            </div>
        </aside>
    )
}
