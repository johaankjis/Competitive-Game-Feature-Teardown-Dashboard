# Game Intelligence Dashboard

A comprehensive competitive game analytics and feature teardown platform for analyzing live-service games. This dashboard provides deep insights into game KPIs, monetization mechanics, and competitive benchmarking across mobile and PC gaming platforms.

## 🎮 Overview

The Game Intelligence Dashboard is a Next.js-based analytics platform designed for game developers, publishers, and analysts to track, compare, and analyze key performance indicators and monetization features across popular live-service games. It aggregates data from multiple sources to provide actionable insights for competitive intelligence and feature adoption decisions.

## ✨ Features

### 📊 KPI Dashboard
- **Real-time Metrics Tracking**: Monitor Daily Active Users (DAU), Average Revenue Per Daily Active User (ARPDAU), and D7 Retention rates
- **Historical Trends**: Visualize performance trends over 7-30 day periods
- **Game-by-Game Analysis**: Drill down into individual game performance metrics
- **Comparative Analytics**: Benchmark games against category averages

### 🔍 Feature Teardowns
- **Monetization Analysis**: Detailed breakdowns of revenue-driving features:
  - Battle Pass systems
  - Gacha mechanics
  - Seasonal events
  - Daily rewards
  - Cosmetics shops
  - Subscription models
  - Social features
  - PvP ranked systems
- **Impact Scoring**: Quantified assessment of feature effectiveness
- **Implementation Complexity**: Evaluate development effort vs. return
- **Adoption Recommendations**: Top-3 high-impact features for implementation

### 📈 Competitive Analysis
- **Market Positioning**: Cross-game KPI comparisons
- **Platform Distribution**: PC vs. Mobile market analysis
- **Scatter Plot Visualizations**: Identify correlations between metrics
- **Genre Insights**: Category-specific performance benchmarks
- **Publisher Comparisons**: Track competitive positioning by publisher

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Package Manager**: pnpm

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Competitive-Game-Feature-Teardown-Dashboard.git
   cd Competitive-Game-Feature-Teardown-Dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   
   Or with npm:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```
   
   Or with npm:
   ```bash
   npm run dev
   ```

4. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📁 Project Structure

```
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Homepage - Overview dashboard
│   ├── kpis/                  # KPI Dashboard page
│   ├── features/              # Feature Teardowns page
│   ├── competitive/           # Competitive Analysis page
│   ├── layout.tsx             # Root layout with metadata
│   └── globals.css            # Global styles and theme
├── components/                 # React components
│   ├── ui/                    # Reusable UI components
│   ├── sidebar-nav.tsx        # Main navigation sidebar
│   ├── metric-card.tsx        # KPI metric display cards
│   ├── kpi-chart.tsx          # Time series charts
│   ├── feature-card.tsx       # Feature detail cards
│   ├── comparison-table.tsx   # Game comparison table
│   └── scatter-chart.tsx      # Correlation visualizations
├── lib/                       # Utility functions and data
│   ├── data/                  # Data layer
│   │   ├── games.ts          # Game catalog
│   │   ├── kpis.ts           # KPI time series data
│   │   └── features.ts       # Feature teardown data
│   └── utils/                 # Helper functions
├── public/                    # Static assets
└── styles/                    # Additional stylesheets
```

## 🎯 Data Sources

The dashboard aggregates data from multiple industry-standard sources:

- **Sensor Tower**: Mobile app analytics and revenue estimates
- **SteamDB**: PC game player counts and engagement metrics
- **Publisher APIs**: Official game statistics where available

> **Note**: The current implementation includes simulated data for demonstration purposes. In production, integrate with live API endpoints for real-time data.

## 🎲 Featured Games

The dashboard currently tracks 10 major live-service titles:

| Game | Platform | Publisher | Genre |
|------|----------|-----------|-------|
| Apex Legends | PC | EA | Battle Royale |
| Genshin Impact | Mobile | HoYoverse | Action RPG |
| Fortnite | PC | Epic Games | Battle Royale |
| PUBG Mobile | Mobile | Krafton | Battle Royale |
| League of Legends | PC | Riot Games | MOBA |
| Valorant | PC | Riot Games | Tactical Shooter |
| Candy Crush Saga | Mobile | King | Puzzle |
| Roblox | PC | Roblox Corporation | Platform |
| Call of Duty Mobile | Mobile | Activision | FPS |
| Honkai: Star Rail | Mobile | HoYoverse | Turn-Based RPG |

## 🔧 Configuration

### Theme Customization

The dashboard uses a dark analytics theme. Customize colors in `app/globals.css`:

```css
:root {
  --background: oklch(0.12 0 0);
  --foreground: oklch(0.98 0 0);
  --primary: oklch(0.65 0.25 270);
  /* ... additional theme variables */
}
```

### Adding New Games

Add entries to `lib/data/games.ts`:

```typescript
{
  id: "game-11",
  title: "Your Game",
  platform: "mobile",
  publisher: "Publisher Name",
  genre: "Genre",
  releaseDate: "YYYY-MM-DD",
}
```

### Adding Feature Teardowns

Add analysis to `lib/data/features.ts`:

```typescript
{
  id: "feature-x",
  gameId: "game-11",
  featureType: "battle-pass",
  description: "Feature description",
  impactScore: 85,
  monetizationImpact: "high",
  retentionImpact: "medium",
  implementationComplexity: "low",
}
```

## 📊 Key Metrics Explained

- **DAU (Daily Active Users)**: Number of unique users engaging daily
- **ARPDAU (Average Revenue Per Daily Active User)**: Daily revenue divided by DAU
- **D7 Retention**: Percentage of users returning after 7 days
- **Impact Score**: Composite metric (0-100) evaluating feature effectiveness
- **Monetization Impact**: Revenue generation potential (high/medium/low)
- **Retention Impact**: User engagement improvement (high/medium/low)
- **Implementation Complexity**: Development effort required (high/medium/low)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for educational and commercial use.

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.dev/) - AI-powered UI generation
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Analytics powered by [Vercel Analytics](https://vercel.com/analytics)

## 📧 Contact

For questions, feedback, or collaboration opportunities, please open an issue on GitHub.

---

**Last Updated**: October 2025  
**Version**: 0.1.0
