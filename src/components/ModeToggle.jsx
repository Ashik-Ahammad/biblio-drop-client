"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)


    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="rounded-full border-zinc-200 dark:border-zinc-800" />
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-colors duration-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800"
    >
      {/* Sun Icon for Light Mode */}
      <Sun
        className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${
          resolvedTheme === "dark" ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
        } text-orange-500`}
      />

      {/* Moon Icon for Dark Mode */}
      <Moon
        className={`absolute h-5 w-5 transition-all duration-500 ease-in-out ${
          resolvedTheme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        } text-blue-400`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
