"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { FeatureCard } from "@/components/feature-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { featureTeardowns, type FeatureTeardown } from "@/lib/data/features"
import { games } from "@/lib/data/games"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featureTypes: Array<{ value: FeatureTeardown["featureType"]; label: string }> = [
  { value: "battle-pass", label: "Battle Pass" },
  { value: "gacha", label: "Gacha" },
  { value: "seasonal-event", label: "Seasonal Events" },
  { value: "daily-rewards", label: "Daily Rewards" },
  { value: "cosmetics", label: "Cosmetics" },
  { value: "subscription", label: "Subscription" },
  { value: "social-features", label: "Social" },
  { value: "pvp-ranked", label: "PVP Ranked" },
]

export default function FeaturesPage() {
  const [selectedType, setSelectedType] = useState<FeatureTeardown["featureType"] | "all">("all")
  const [selectedImpact, setSelectedImpact] = useState<"all" | "high" | "medium" | "low">("all")

  const filteredFeatures = featureTeardowns
    .filter((f) => selectedType === "all" || f.featureType === selectedType)
    .filter((f) => selectedImpact === "all" || f.monetizationImpact === selectedImpact)
    .sort((a, b) => b.impactScore - a.impactScore)

  // Feature type distribution
  const featureDistribution = featureTypes.map((type) => ({
    type: type.label,
    count: featureTeardowns.filter((f) => f.featureType === type.value).length,
  }))

  // Top features by impact
  const topFeatures = [...featureTeardowns].sort((a, b) => b.impactScore - a.impactScore).slice(0, 3)

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Feature Teardowns</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Analyze monetization mechanics and engagement features across live-service games
          </p>
        </div>

        <div className="space-y-6 p-8">
          {/* Top Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Top 3 High-Impact Features for Adoption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFeatures.map((feature, index) => {
                  const game = games.find((g) => g.id === feature.gameId)
                  return (
                    <div
                      key={feature.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {feature.featureType.replace("-", " ").toUpperCase()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {game?.title} • {feature.description.slice(0, 60)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{feature.impactScore}</p>
                          <p className="text-xs text-muted-foreground">Impact Score</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className="bg-chart-3 text-chart-3 bg-opacity-10">
                            {feature.monetizationImpact} monetization
                          </Badge>
                          <Badge className="bg-chart-2 text-chart-2 bg-opacity-10">
                            {feature.retentionImpact} retention
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Feature Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Feature Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {featureDistribution.map((item) => (
                  <div key={item.type} className="rounded-lg border border-border p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{item.count}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.type}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Feature Type</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                >
                  All
                </Button>
                {featureTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Monetization Impact</p>
              <div className="flex gap-2">
                <Button
                  variant={selectedImpact === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedImpact("all")}
                >
                  All
                </Button>
                <Button
                  variant={selectedImpact === "high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedImpact("high")}
                >
                  High
                </Button>
                <Button
                  variant={selectedImpact === "medium" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedImpact("medium")}
                >
                  Medium
                </Button>
                <Button
                  variant={selectedImpact === "low" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedImpact("low")}
                >
                  Low
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">All Features ({filteredFeatures.length})</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
