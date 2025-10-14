export interface FeatureTeardown {
  id: string
  gameId: string
  featureType:
    | "battle-pass"
    | "gacha"
    | "seasonal-event"
    | "daily-rewards"
    | "social-features"
    | "pvp-ranked"
    | "cosmetics"
    | "subscription"
  description: string
  impactScore: number
  monetizationImpact: "high" | "medium" | "low"
  retentionImpact: "high" | "medium" | "low"
  implementationComplexity: "high" | "medium" | "low"
}

export const featureTeardowns: FeatureTeardown[] = [
  {
    id: "feature-1",
    gameId: "game-1",
    featureType: "battle-pass",
    description: "Seasonal battle pass with 100 tiers, premium and free tracks",
    impactScore: 92,
    monetizationImpact: "high",
    retentionImpact: "high",
    implementationComplexity: "medium",
  },
  {
    id: "feature-2",
    gameId: "game-1",
    featureType: "seasonal-event",
    description: "Limited-time events with exclusive cosmetics and challenges",
    impactScore: 85,
    monetizationImpact: "medium",
    retentionImpact: "high",
    implementationComplexity: "medium",
  },
  {
    id: "feature-3",
    gameId: "game-2",
    featureType: "gacha",
    description: "Character and weapon gacha system with pity mechanics",
    impactScore: 98,
    monetizationImpact: "high",
    retentionImpact: "high",
    implementationComplexity: "high",
  },
  {
    id: "feature-4",
    gameId: "game-2",
    featureType: "battle-pass",
    description: "Monthly battle pass with character materials and primogems",
    impactScore: 88,
    monetizationImpact: "high",
    retentionImpact: "medium",
    implementationComplexity: "medium",
  },
  {
    id: "feature-5",
    gameId: "game-2",
    featureType: "daily-rewards",
    description: "Daily login rewards and commission system",
    impactScore: 76,
    monetizationImpact: "low",
    retentionImpact: "high",
    implementationComplexity: "low",
  },
  {
    id: "feature-6",
    gameId: "game-3",
    featureType: "battle-pass",
    description: "Chapter-based battle pass with cosmetic rewards",
    impactScore: 94,
    monetizationImpact: "high",
    retentionImpact: "high",
    implementationComplexity: "medium",
  },
  {
    id: "feature-7",
    gameId: "game-3",
    featureType: "cosmetics",
    description: "Item shop with rotating cosmetics and bundles",
    impactScore: 91,
    monetizationImpact: "high",
    retentionImpact: "medium",
    implementationComplexity: "low",
  },
  {
    id: "feature-8",
    gameId: "game-3",
    featureType: "seasonal-event",
    description: "Seasonal events with unique game modes and rewards",
    impactScore: 87,
    monetizationImpact: "medium",
    retentionImpact: "high",
    implementationComplexity: "high",
  },
  {
    id: "feature-9",
    gameId: "game-5",
    featureType: "battle-pass",
    description: "Event pass system with prestige skins",
    impactScore: 89,
    monetizationImpact: "high",
    retentionImpact: "medium",
    implementationComplexity: "medium",
  },
  {
    id: "feature-10",
    gameId: "game-5",
    featureType: "cosmetics",
    description: "Champion skins with multiple tiers and chromas",
    impactScore: 93,
    monetizationImpact: "high",
    retentionImpact: "low",
    implementationComplexity: "medium",
  },
  {
    id: "feature-11",
    gameId: "game-6",
    featureType: "battle-pass",
    description: "Act-based battle pass with weapon skins",
    impactScore: 86,
    monetizationImpact: "high",
    retentionImpact: "medium",
    implementationComplexity: "medium",
  },
  {
    id: "feature-12",
    gameId: "game-7",
    featureType: "subscription",
    description: "Gold bars subscription with unlimited lives",
    impactScore: 82,
    monetizationImpact: "high",
    retentionImpact: "medium",
    implementationComplexity: "low",
  },
  {
    id: "feature-13",
    gameId: "game-8",
    featureType: "subscription",
    description: "Premium membership with Robux stipend",
    impactScore: 95,
    monetizationImpact: "high",
    retentionImpact: "high",
    implementationComplexity: "low",
  },
  {
    id: "feature-14",
    gameId: "game-9",
    featureType: "battle-pass",
    description: "Seasonal battle pass with weapon blueprints",
    impactScore: 84,
    monetizationImpact: "high",
    retentionImpact: "medium",
    implementationComplexity: "medium",
  },
  {
    id: "feature-15",
    gameId: "game-10",
    featureType: "gacha",
    description: "Character and light cone gacha with soft pity",
    impactScore: 96,
    monetizationImpact: "high",
    retentionImpact: "high",
    implementationComplexity: "high",
  },
]

export function getFeaturesByGame(gameId: string): FeatureTeardown[] {
  return featureTeardowns.filter((f) => f.gameId === gameId)
}

export function getFeaturesByType(featureType: FeatureTeardown["featureType"]): FeatureTeardown[] {
  return featureTeardowns.filter((f) => f.featureType === featureType)
}
