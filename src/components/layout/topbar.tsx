import { Bell, UserCircle, Search } from "lucide-react"

export default function Topbar() {
    return (
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4 w-1/3">
                {/* Tenant Switcher Placeholder */}
                <div className="flex items-center gap-2 px-3 py-1.5 border border-input rounded-md cursor-pointer hover:bg-accent">
                    <div className="w-5 h-5 rounded-full bg-primary/20"></div>
                    <span className="text-sm font-medium">Acme Corp</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-muted-foreground hover:text-foreground">
                    <Search size={20} />
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                    <Bell size={20} />
                </button>
                <div className="h-8 w-px bg-border mx-2"></div>
                <button className="flex items-center gap-2 text-sm font-medium hover:bg-accent px-2 py-1 rounded-full">
                    <UserCircle size={24} className="text-muted-foreground" />
                </button>
            </div>
        </header>
    )
}
