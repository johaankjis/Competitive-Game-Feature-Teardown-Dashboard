"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scatter, ScatterChart, ResponsiveContainer, XAxis, YAxis, Tooltip, ZAxis, Cell } from "recharts"
import type { Game } from "@/lib/data/games"
import type { KPIData } from "@/lib/data/kpis"
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/utils/format"

interface ScatterChartProps {
  games: Array<Game & Partial<KPIData>>
  xAxis: "dau" | "arpdau" | "d7Retention"
  yAxis: "dau" | "arpdau" | "d7Retention"
}

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function ScatterChartComponent({ games, xAxis, yAxis }: ScatterChartProps) {
  const data = games.map((game, index) => ({
    x: game[xAxis] || 0,
    y: game[yAxis] || 0,
    name: game.title,
    color: colors[index % colors.length],
  }))

  const formatters = {
    dau: formatNumber,
    arpdau: formatCurrency,
    d7Retention: formatPercentage,
  }

  const labels = {
    dau: "DAU",
    arpdau: "ARPDAU",
    d7Retention: "D7 Retention",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">
          {labels[yAxis]} vs {labels[xAxis]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis
              type="number"
              dataKey="x"
              name={labels[xAxis]}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={formatters[xAxis]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={labels[yAxis]}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={formatters[yAxis]}
            />
            <ZAxis range={[100, 400]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number, name: string) => {
                if (name === labels[xAxis]) return [formatters[xAxis](value), name]
                if (name === labels[yAxis]) return [formatters[yAxis](value), name]
                return [value, name]
              }}
            />
            <Scatter data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-3">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm text-muted-foreground">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
