import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Game } from "@/lib/data/games"
import type { KPIData } from "@/lib/data/kpis"
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils/format"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"

interface ComparisonTableProps {
  games: Array<Game & Partial<KPIData>>
  sortBy: "dau" | "arpdau" | "d7Retention"
}

export function ComparisonTable({ games, sortBy }: ComparisonTableProps) {
  const sortedGames = [...games].sort((a, b) => {
    const aVal = a[sortBy] || 0
    const bVal = b[sortBy] || 0
    return bVal - aVal
  })

  const avgValue = sortedGames.reduce((sum, g) => sum + (g[sortBy] || 0), 0) / sortedGames.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Competitive Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Rank</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Game</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Platform</th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">DAU</th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">ARPDAU</th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">D7 Retention</th>
                <th className="pb-3 text-center text-sm font-medium text-muted-foreground">vs Avg</th>
              </tr>
            </thead>
            <tbody>
              {sortedGames.map((game, index) => {
                const currentValue = game[sortBy] || 0
                const diff = ((currentValue - avgValue) / avgValue) * 100
                const isAboveAvg = diff > 5
                const isBelowAvg = diff < -5

                return (
                  <tr key={game.id} className="border-b border-border/50">
                    <td className="py-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-medium text-foreground">{game.title}</p>
                      <p className="text-sm text-muted-foreground">{game.publisher}</p>
                    </td>
                    <td className="py-4">
                      <Badge variant="outline">{game.platform}</Badge>
                    </td>
                    <td className="py-4 text-right font-semibold text-foreground">{formatNumber(game.dau || 0)}</td>
                    <td className="py-4 text-right font-semibold text-foreground">
                      {formatCurrency(game.arpdau || 0)}
                    </td>
                    <td className="py-4 text-right font-semibold text-foreground">
                      {formatPercentage(game.d7Retention || 0)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-1">
                        {isAboveAvg ? (
                          <>
                            <ArrowUp className="h-4 w-4 text-chart-3" />
                            <span className="text-sm font-medium text-chart-3">{diff.toFixed(1)}%</span>
                          </>
                        ) : isBelowAvg ? (
                          <>
                            <ArrowDown className="h-4 w-4 text-destructive" />
                            <span className="text-sm font-medium text-destructive">{Math.abs(diff).toFixed(1)}%</span>
                          </>
                        ) : (
                          <>
                            <Minus className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">~Avg</span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
