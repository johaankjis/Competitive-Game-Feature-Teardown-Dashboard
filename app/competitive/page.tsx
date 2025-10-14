"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { ComparisonTable } from "@/components/comparison-table"
import { ScatterChartComponent } from "@/components/scatter-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { games } from "@/lib/data/games"
import { getLatestKPIs } from "@/lib/data/kpis"
import { Badge } from "@/components/ui/badge"

export default function CompetitivePage() {
  const [sortBy, setSortBy] = useState<"dau" | "arpdau" | "d7Retention">("dau")
  const [selectedPlatform, setSelectedPlatform] = useState<"all" | "mobile" | "pc" | "console">("all")

  const gamesWithKPIs = games
    .map((game) => {
      const kpis = getLatestKPIs(game.id)
      return { ...game, ...kpis }
    })
    .filter((game) => selectedPlatform === "all" || game.platform === selectedPlatform)

  // Platform distribution
  const platformStats = [
    { platform: "Mobile", count: games.filter((g) => g.platform === "mobile").length },
    { platform: "PC", count: games.filter((g) => g.platform === "pc").length },
    { platform: "Console", count: games.filter((g) => g.platform === "console").length },
  ]

  // Genre distribution
  const genreStats = games.reduce(
    (acc, game) => {
      acc[game.genre] = (acc[game.genre] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Market leaders by category
  const dauLeader = gamesWithKPIs.sort((a, b) => (b.dau || 0) - (a.dau || 0))[0]
  const arpdauLeader = gamesWithKPIs.sort((a, b) => (b.arpdau || 0) - (a.arpdau || 0))[0]
  const retentionLeader = gamesWithKPIs.sort((a, b) => (b.d7Retention || 0) - (a.d7Retention || 0))[0]

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Competitive Analysis</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Benchmark performance and identify market leaders across key metrics
          </p>
        </div>

        <div className="space-y-6 p-8">
          {/* Market Leaders */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">DAU Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-foreground">{dauLeader?.title}</p>
                <p className="mt-1 text-2xl font-bold text-chart-1">{(dauLeader?.dau || 0).toLocaleString()}</p>
                <p className="mt-1 text-sm text-muted-foreground">{dauLeader?.publisher}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">ARPDAU Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-foreground">{arpdauLeader?.title}</p>
                <p className="mt-1 text-2xl font-bold text-chart-2">${arpdauLeader?.arpdau?.toFixed(2)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{arpdauLeader?.publisher}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Retention Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-foreground">{retentionLeader?.title}</p>
                <p className="mt-1 text-2xl font-bold text-chart-3">{retentionLeader?.d7Retention}%</p>
                <p className="mt-1 text-sm text-muted-foreground">{retentionLeader?.publisher}</p>
              </CardContent>
            </Card>
          </div>

          {/* Market Overview */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {platformStats.map((stat) => (
                    <div key={stat.platform} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{stat.platform}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(stat.count / games.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{stat.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Genre Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(genreStats).map(([genre, count]) => (
                    <Badge key={genre} variant="outline" className="text-foreground">
                      {genre} ({count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Sort By</p>
              <div className="flex gap-2">
                <Button variant={sortBy === "dau" ? "default" : "outline"} size="sm" onClick={() => setSortBy("dau")}>
                  DAU
                </Button>
                <Button
                  variant={sortBy === "arpdau" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("arpdau")}
                >
                  ARPDAU
                </Button>
                <Button
                  variant={sortBy === "d7Retention" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("d7Retention")}
                >
                  Retention
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Platform</p>
              <div className="flex gap-2">
                <Button
                  variant={selectedPlatform === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPlatform("all")}
                >
                  All
                </Button>
                <Button
                  variant={selectedPlatform === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPlatform("mobile")}
                >
                  Mobile
                </Button>
                <Button
                  variant={selectedPlatform === "pc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPlatform("pc")}
                >
                  PC
                </Button>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <ComparisonTable games={gamesWithKPIs} sortBy={sortBy} />

          {/* Scatter Plots */}
          <div className="grid gap-4 md:grid-cols-2">
            <ScatterChartComponent games={gamesWithKPIs} xAxis="dau" yAxis="arpdau" />
            <ScatterChartComponent games={gamesWithKPIs} xAxis="d7Retention" yAxis="arpdau" />
          </div>
        </div>
      </main>
    </div>
  )
}
