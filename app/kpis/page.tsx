import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { games } from "@/lib/data/games"
import { getLatestKPIs, getKPIHistory } from "@/lib/data/kpis"
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils/format"
import { KPIChart } from "@/components/kpi-chart"

export default function KPIsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">KPI Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track DAU, ARPDAU, and retention metrics across all games
          </p>
        </div>

        <div className="space-y-8 p-8">
          {games.map((game) => {
            const latest = getLatestKPIs(game.id)
            const history = getKPIHistory(game.id, 14)

            return (
              <Card key={game.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground">{game.title}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {game.publisher} • {game.platform} • {game.genre}
                      </p>
                    </div>
                    <div className="flex gap-6 text-right">
                      <div>
                        <p className="text-sm text-muted-foreground">DAU</p>
                        <p className="text-lg font-bold text-foreground">{formatNumber(latest?.dau || 0)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ARPDAU</p>
                        <p className="text-lg font-bold text-foreground">{formatCurrency(latest?.arpdau || 0)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">D7 Retention</p>
                        <p className="text-lg font-bold text-foreground">
                          {formatPercentage(latest?.d7Retention || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <KPIChart
                      title="DAU (14 days)"
                      data={history.map((d) => ({ date: d.date, value: d.dau }))}
                      color="hsl(var(--chart-1))"
                      formatValue={formatNumber}
                    />
                    <KPIChart
                      title="ARPDAU (14 days)"
                      data={history.map((d) => ({ date: d.date, value: d.arpdau }))}
                      color="hsl(var(--chart-2))"
                      formatValue={formatCurrency}
                    />
                    <KPIChart
                      title="D7 Retention (14 days)"
                      data={history.map((d) => ({ date: d.date, value: d.d7Retention }))}
                      color="hsl(var(--chart-3))"
                      formatValue={formatPercentage}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
