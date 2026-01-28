import { createProject } from "../../actions"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function NewProjectPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/dashboard/projects"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4 transition-colors"
                >
                    <ChevronLeft size={16} />
                    Back to Projects
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
                <p className="text-muted-foreground mt-2">
                    Start a new project to organize your tasks and collaborate with your team.
                </p>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                <form action={createProject} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Project Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="e.g. Website Redesign"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            placeholder="Briefly describe the goals of this project..."
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link
                            href="/dashboard/projects"
                            className="text-sm font-medium hover:underline text-muted-foreground"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
