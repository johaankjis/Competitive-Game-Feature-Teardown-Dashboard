"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Grid3x3, TrendingUp, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Overview",
    href: "/",
    icon: Grid3x3,
  },
  {
    title: "KPI Dashboard",
    href: "/kpis",
    icon: BarChart3,
  },
  {
    title: "Feature Teardowns",
    href: "/features",
    icon: Layers,
  },
  {
    title: "Competitive Analysis",
    href: "/competitive",
    icon: TrendingUp,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-xl font-bold text-foreground">GameIntel</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border p-4">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium">Data Sources</p>
          <p className="mt-1">Sensor Tower • SteamDB</p>
          <p className="mt-2 text-[10px]">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
