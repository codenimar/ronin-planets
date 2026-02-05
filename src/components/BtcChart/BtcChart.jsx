import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import btcPriceService from '../../services/btcPriceService';
import './BtcChart.css';

const BtcChart = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set default dates on mount (last 30 days)
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = subDays(today, 30);
    
    setEndDate(format(today, 'yyyy-MM-dd'));
    setStartDate(format(thirtyDaysAgo, 'yyyy-MM-dd'));
  }, []);

  // Automatically load data when dates change
  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchData = async () => {
      setError('');
      
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Validate date range
      const validation = btcPriceService.validateDateRange(start, end);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }

      setLoading(true);

      try {
        const data = await btcPriceService.fetchPriceHistory(start, end);
        setPriceData(data);
        setError(''); // Clear any previous errors if data loads successfully
      } catch (err) {
        setError(err.message);
        setPriceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const formatPrice = (value) => {
    return `$${value.toLocaleString()}`;
  };

  const formatXAxis = (timestamp) => {
    return format(new Date(timestamp), 'MMM dd');
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{format(data.date, 'MMM dd, yyyy HH:mm')}</p>
          <p className="tooltip-price">{formatPrice(data.price)}</p>
        </div>
      );
    }
    return null;
  };

  const getStats = () => {
    if (priceData.length === 0) return null;

    const prices = priceData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const change = endPrice - startPrice;
    const changePercent = ((change / startPrice) * 100).toFixed(2);

    return {
      min: minPrice,
      max: maxPrice,
      avg: avgPrice,
      startPrice,
      endPrice,
      change,
      changePercent
    };
  };

  const stats = getStats();

  return (
    <div className="btc-chart-container">
      <div className="btc-chart-header">
        <h1>📈 Bitcoin Price History</h1>
        <p className="btc-chart-subtitle">
          View historical Bitcoin price data with customizable date range
        </p>
      </div>

      <div className="date-selector">
        <div className="date-input-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || format(new Date(), 'yyyy-MM-dd')}
            disabled={loading}
          />
        </div>

        <div className="date-input-group">
          <label htmlFor="end-date">End Date:</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            max={format(new Date(), 'yyyy-MM-dd')}
            disabled={loading}
          />
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {loading && (
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Loading Bitcoin price data...</p>
        </div>
      )}

      {!loading && !error && priceData.length > 0 && (
        <>
          {stats && (
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-label">Current</div>
                <div className="stat-value">{formatPrice(stats.endPrice)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Change</div>
                <div className={`stat-value ${stats.change >= 0 ? 'positive' : 'negative'}`}>
                  {stats.change >= 0 ? '+' : ''}{formatPrice(stats.change)}
                  <span className="stat-percent">
                    ({stats.changePercent >= 0 ? '+' : ''}{stats.changePercent}%)
                  </span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">High</div>
                <div className="stat-value">{formatPrice(stats.max)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Low</div>
                <div className="stat-value">{formatPrice(stats.min)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Average</div>
                <div className="stat-value">{formatPrice(stats.avg)}</div>
              </div>
            </div>
          )}

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={priceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatXAxis}
                  stroke="#888"
                  tick={{ fill: '#888' }}
                />
                <YAxis
                  tickFormatter={formatPrice}
                  stroke="#888"
                  tick={{ fill: '#888' }}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#f7931a"
                  strokeWidth={2}
                  dot={false}
                  name="BTC Price (USD)"
                  activeDot={{ r: 6, fill: '#f7931a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="data-info">
            <p>
              📊 Showing {priceData.length} data points from{' '}
              {format(priceData[0].date, 'MMM dd, yyyy')} to{' '}
              {format(priceData[priceData.length - 1].date, 'MMM dd, yyyy')}
            </p>
          </div>
        </>
      )}

      {!loading && !error && priceData.length === 0 && startDate && endDate && (
        <div className="no-data-message">
          <p>No data available for the selected date range.</p>
        </div>
      )}
    </div>
  );
};

export default BtcChart;
