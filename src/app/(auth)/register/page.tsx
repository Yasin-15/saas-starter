"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Lock, Mail, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Call API to register
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            if (res.ok) {
                router.push("/login?registered=true")
            } else {
                alert("Registration failed")
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center p-12 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="max-w-lg space-y-8 z-10">
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                        <Image
                            src="/register-illustration.png"
                            alt="Start Your Journey"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold">Start Your Journey</h1>
                        <p className="text-lg text-muted-foreground">
                            Join thousands of teams building amazing products with our platform
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-background relative">
                {/* Header with Back Button and Theme Toggle */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to home</span>
                    </Link>
                    <ThemeToggle />
                </div>

                <div className="w-full max-w-md space-y-8">
                    {/* Logo for mobile */}
                    <div className="lg:hidden text-center">
                        <div className="inline-flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-primary/60 rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
                                S
                            </div>
                            <span className="font-bold text-xl">SaaS Starter</span>
                        </div>
                    </div>

                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold">Create an account</h2>
                        <p className="text-muted-foreground">Get started with your free plan today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <User size={16} className="text-primary" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Enter your name"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Mail size={16} className="text-primary" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="you@example.com"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Lock size={16} className="text-primary" />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Create a strong password"
                                    required
                                    disabled={loading}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Must be at least 8 characters long
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 rounded border-border"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-muted-foreground">
                                I agree to the{" "}
                                <Link href="#" className="text-primary hover:underline">
                                    Terms of Service
                                </Link>
                                {" "}and{" "}
                                <Link href="#" className="text-primary hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-background text-muted-foreground">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-border hover:border-primary/50 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                        >
                            Sign in instead
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
