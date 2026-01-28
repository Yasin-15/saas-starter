'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="p-2 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors">
                <div className="w-5 h-5" />
            </button>
        )
    }

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-md border border-border bg-background hover:bg-muted/50 transition-colors group"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            ) : (
                <Moon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            )}
        </button>
    )
}
