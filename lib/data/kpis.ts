export interface KPIData {
  gameId: string
  date: string
  dau: number
  arpdau: number
  d7Retention: number
}

// Generate simulated KPI data for the last 30 days
function generateKPIData(): KPIData[] {
  const data: KPIData[] = []
  const gameIds = ["game-1", "game-2", "game-3", "game-4", "game-5", "game-6", "game-7", "game-8", "game-9", "game-10"]

  const baseMetrics: Record<string, { dau: number; arpdau: number; retention: number }> = {
    "game-1": { dau: 450000, arpdau: 0.85, retention: 42 },
    "game-2": { dau: 850000, arpdau: 2.35, retention: 68 },
    "game-3": { dau: 1200000, arpdau: 1.45, retention: 55 },
    "game-4": { dau: 680000, arpdau: 0.95, retention: 48 },
    "game-5": { dau: 920000, arpdau: 1.15, retention: 62 },
    "game-6": { dau: 520000, arpdau: 0.75, retention: 58 },
    "game-7": { dau: 1500000, arpdau: 0.45, retention: 35 },
    "game-8": { dau: 2100000, arpdau: 0.65, retention: 72 },
    "game-9": { dau: 780000, arpdau: 1.25, retention: 52 },
    "game-10": { dau: 620000, arpdau: 2.85, retention: 71 },
  }

  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]

    gameIds.forEach((gameId) => {
      const base = baseMetrics[gameId]
      const variance = 0.15
      const trend = Math.sin(i / 7) * 0.1

      data.push({
        gameId,
        date: dateStr,
        dau: Math.round(base.dau * (1 + (Math.random() - 0.5) * variance + trend)),
        arpdau: Number((base.arpdau * (1 + (Math.random() - 0.5) * variance)).toFixed(2)),
        d7Retention: Math.round(base.retention * (1 + (Math.random() - 0.5) * 0.1)),
      })
    })
  }

  return data
}

export const kpiData = generateKPIData()

export function getLatestKPIs(gameId: string): KPIData | undefined {
  return kpiData
    .filter((d) => d.gameId === gameId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
}

export function getKPIHistory(gameId: string, days = 30): KPIData[] {
  return kpiData
    .filter((d) => d.gameId === gameId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-days)
}
