import { useState, useEffect } from 'react'
import axios from 'axios'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const fetchBitcoinPrices = () => 
  axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily')

const transformPrice = (timestamp, price) => ({
  dateString: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  priceUSD: Math.round(price)
})

const calculateStats = (prices) => {
  const sorted = [...prices].sort((a, b) => a - b)
  return {
    current: prices[prices.length - 1],
    initial: prices[0],
    maximum: sorted[sorted.length - 1],
    minimum: sorted[0],
    average: Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length)
  }
}

export default function BitcoinChart() {
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchBitcoinPrices()
        const transformed = response.data.prices.map(([ts, p]) => transformPrice(ts, p))
        setChartData(transformed)
        setIsLoading(false)
      } catch (error) {
        setHasError(true)
        setIsLoading(false)
      }
    }

    loadData()
    const intervalId = setInterval(loadData, 300000)
    return () => clearInterval(intervalId)
  }, [])

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loader-wrapper">
          <div className="loading-spinner"></div>
          <p>Loading Bitcoin data...</p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="app-container">
        <div className="error-wrapper">
          <h2>Error</h2>
          <p>Failed to fetch Bitcoin data</p>
        </div>
      </div>
    )
  }

  const prices = chartData.map(item => item.priceUSD)
  const stats = calculateStats(prices)
  const changePercent = ((stats.current - stats.initial) / stats.initial * 100).toFixed(2)
  const isPositiveChange = stats.current >= stats.initial

  return (
    <div className="app-container">
      <div className="header-area">
        <h1>Bitcoin Price Chart</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Current</span>
            <span className="stat-value">${stats.current.toLocaleString()}</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-label">30-Day Change</span>
            <span className={`stat-value ${isPositiveChange ? 'positive' : 'negative'}`}>
              {changePercent}%
            </span>
          </div>
          
          <div className="stat-card">
            <span className="stat-label">High</span>
            <span className="stat-value">${stats.maximum.toLocaleString()}</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-label">Low</span>
            <span className="stat-value">${stats.minimum.toLocaleString()}</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-label">Average</span>
            <span className="stat-value">${stats.average.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="chart-area">
        <ResponsiveContainer width="100%" height={450}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f7931a" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f7931a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="dateString" 
              stroke="#999"
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis stroke="#999" />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#000',
                border: '2px solid #f7931a',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="priceUSD"
              stroke="#f7931a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="footer-area">
        <p>Data from CoinGecko API • Updates every 5 minutes</p>
      </div>
    </div>
  )
}
