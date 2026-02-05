# Bitcoin Price Chart

A React application that displays Bitcoin price data in an interactive chart.

## Features

- Real-time Bitcoin price tracking
- 30-day historical price chart
- Key statistics: Current price, High, Low, Average, and 30-day percentage change
- Auto-refresh every 5 minutes
- Responsive design with modern UI

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Recharts** - Chart visualization library
- **Axios** - HTTP client for API calls
- **CoinGecko API** - Bitcoin price data source

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

The app will be available at `http://localhost:5173` after running `npm run dev`.

The application automatically fetches Bitcoin price data from the CoinGecko API and displays:
- Current Bitcoin price in USD
- 30-day price change percentage
- Highest and lowest prices in the period
- Average price over 30 days
- Interactive area chart showing price trends

## Project Structure

```
ronin-planets/
├── src/
│   ├── App.jsx          # Main app component
│   ├── App.css          # Application styles
│   ├── BitcoinChart.jsx # Bitcoin chart component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## API

Uses the CoinGecko API endpoint:
```
https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily
```

## License

MIT
