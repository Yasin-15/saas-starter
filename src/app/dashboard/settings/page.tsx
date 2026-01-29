import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { updateTenant } from "../actions"
import { Save } from "lucide-react"
import Image from "next/image"

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect("/login")
    }

    const membership = await prisma.tenantUser.findFirst({
        where: { userId: session.user.id },
        include: { tenant: true }
    })

    if (!membership) {
        return <div>No organization found.</div>
    }

    const { tenant } = membership

    return (
        <div className="max-w-2xl">

            <div className="relative mb-8 rounded-xl overflow-hidden border border-border/50 bg-muted/20 p-6 md:p-8 flex items-center justify-between">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
                    <p className="text-muted-foreground max-w-md">
                        Manage your organization settings and preferences.
                    </p>
                </div>
                <div className="hidden md:block relative w-32 h-32 opacity-80 pointer-events-none">
                    <Image
                        src="/images/settings-illustration.png"
                        alt="Settings"
                        fill
                        className="object-contain"
                    />
                </div>
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">General Information</h3>
                <form action={updateTenant} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none">
                            Organization Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={tenant.name}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="timezone" className="text-sm font-medium leading-none">
                            Timezone
                        </label>
                        <select
                            id="timezone"
                            name="timezone"
                            defaultValue={tenant.timezone || "UTC"}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">America/New_York</option>
                            <option value="Europe/London">Europe/London</option>
                            <option value="Asia/Tokyo">Asia/Tokyo</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-8 rounded-xl border border-destructive/50 bg-destructive/5 text-destructive p-6">
                <h3 className="font-semibold text-lg mb-2">Danger Zone</h3>
                <p className="text-sm mb-4">
                    Deleting your organization will remove all data and cannot be undone.
                </p>
                <button
                    disabled
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 opacity-50 cursor-not-allowed"
                >
                    Delete Organization
                </button>
            </div>
        </div>
    )
}
