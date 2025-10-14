import { SidebarNav } from "@/components/sidebar-nav"
import { MetricCard } from "@/components/metric-card"
import { KPIChart } from "@/components/kpi-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { games } from "@/lib/data/games"
import { kpiData, getLatestKPIs } from "@/lib/data/kpis"
import { featureTeardowns } from "@/lib/data/features"
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils/format"
import { Users, DollarSign, TrendingUp, Target } from "lucide-react"

export default function HomePage() {
  // Calculate aggregate metrics
  const totalGames = games.length
  const avgDAU = Math.round(
    games.reduce((sum, game) => {
      const latest = getLatestKPIs(game.id)
      return sum + (latest?.dau || 0)
    }, 0) / totalGames,
  )
  const avgARPDAU =
    games.reduce((sum, game) => {
      const latest = getLatestKPIs(game.id)
      return sum + (latest?.arpdau || 0)
    }, 0) / totalGames
  const avgRetention = Math.round(
    games.reduce((sum, game) => {
      const latest = getLatestKPIs(game.id)
      return sum + (latest?.d7Retention || 0)
    }, 0) / totalGames,
  )

  // Get trend data for last 7 days
  const last7Days = kpiData
    .filter((d) => {
      const date = new Date(d.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date >= weekAgo
    })
    .reduce(
      (acc, curr) => {
        const existing = acc.find((d) => d.date === curr.date)
        if (existing) {
          existing.dau += curr.dau
          existing.arpdau += curr.arpdau
          existing.retention += curr.d7Retention
          existing.count += 1
        } else {
          acc.push({ date: curr.date, dau: curr.dau, arpdau: curr.arpdau, retention: curr.d7Retention, count: 1 })
        }
        return acc
      },
      [] as Array<{ date: string; dau: number; arpdau: number; retention: number; count: number }>,
    )
    .map((d) => ({
      date: d.date,
      dau: Math.round(d.dau / d.count),
      arpdau: d.arpdau / d.count,
      retention: Math.round(d.retention / d.count),
    }))

  // Top performing games
  const topGames = games
    .map((game) => {
      const latest = getLatestKPIs(game.id)
      return { ...game, ...latest }
    })
    .sort((a, b) => (b.dau || 0) - (a.dau || 0))
    .slice(0, 5)

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Competitive intelligence dashboard for live-service games
          </p>
        </div>

        <div className="space-y-6 p-8">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Avg Daily Active Users"
              value={formatNumber(avgDAU)}
              change="+5.2% from last week"
              changeType="positive"
              icon={Users}
            />
            <MetricCard
              title="Avg ARPDAU"
              value={formatCurrency(avgARPDAU)}
              change="+2.8% from last week"
              changeType="positive"
              icon={DollarSign}
            />
            <MetricCard
              title="Avg D7 Retention"
              value={formatPercentage(avgRetention)}
              change="-1.2% from last week"
              changeType="negative"
              icon={TrendingUp}
            />
            <MetricCard
              title="Games Tracked"
              value={totalGames.toString()}
              change={`${featureTeardowns.length} features analyzed`}
              changeType="neutral"
              icon={Target}
            />
          </div>

          {/* Trend Charts */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <KPIChart
              title="Average DAU Trend"
              data={last7Days.map((d) => ({ date: d.date, value: d.dau }))}
              color="hsl(var(--chart-1))"
              formatValue={formatNumber}
            />
            <KPIChart
              title="Average ARPDAU Trend"
              data={last7Days.map((d) => ({ date: d.date, value: d.arpdau }))}
              color="hsl(var(--chart-2))"
              formatValue={formatCurrency}
            />
            <KPIChart
              title="Average Retention Trend"
              data={last7Days.map((d) => ({ date: d.date, value: d.retention }))}
              color="hsl(var(--chart-3))"
              formatValue={formatPercentage}
            />
          </div>

          {/* Top Performing Games */}
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground">Top Performing Games by DAU</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topGames.map((game, index) => (
                  <div key={game.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{game.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {game.publisher} • {game.platform}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{formatNumber(game.dau || 0)}</p>
                      <p className="text-sm text-muted-foreground">DAU</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
