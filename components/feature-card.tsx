import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { FeatureTeardown } from "@/lib/data/features"
import { games } from "@/lib/data/games"

interface FeatureCardProps {
  feature: FeatureTeardown
}

const featureTypeLabels: Record<FeatureTeardown["featureType"], string> = {
  "battle-pass": "Battle Pass",
  gacha: "Gacha System",
  "seasonal-event": "Seasonal Event",
  "daily-rewards": "Daily Rewards",
  "social-features": "Social Features",
  "pvp-ranked": "PVP Ranked",
  cosmetics: "Cosmetics",
  subscription: "Subscription",
}

const impactColors = {
  high: "bg-chart-3 text-chart-3",
  medium: "bg-chart-4 text-chart-4",
  low: "bg-muted-foreground text-muted-foreground",
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const game = games.find((g) => g.id === feature.gameId)

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base text-foreground">{featureTypeLabels[feature.featureType]}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{game?.title}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{feature.impactScore}</div>
            <p className="text-xs text-muted-foreground">Impact Score</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground">{feature.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={`${impactColors[feature.monetizationImpact]} bg-opacity-10`}>
            Monetization: {feature.monetizationImpact}
          </Badge>
          <Badge variant="outline" className={`${impactColors[feature.retentionImpact]} bg-opacity-10`}>
            Retention: {feature.retentionImpact}
          </Badge>
          <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
            Complexity: {feature.implementationComplexity}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
