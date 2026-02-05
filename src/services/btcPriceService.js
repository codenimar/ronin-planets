import axios from 'axios';

/**
 * Service for fetching Bitcoin price history data
 */
class BtcPriceService {
  constructor() {
    this.baseUrl = 'https://api.coingecko.com/api/v3';
  }

  /**
   * Generate mock data for demo purposes
   * @param {Date} startDate - Start date for history
   * @param {Date} endDate - End date for history
   * @returns {Array} Array of mock price data points
   */
  generateMockData(startDate, endDate) {
    const data = [];
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const basePrice = 95000; // Starting BTC price
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      // Generate realistic price variations
      const variation = Math.sin(i / 5) * 3000 + Math.random() * 2000 - 1000;
      const price = basePrice + variation + (i * 50); // Slight upward trend
      
      data.push({
        timestamp: date.getTime(),
        date: new Date(date),
        price: parseFloat(price.toFixed(2))
      });
    }
    
    return data;
  }

  /**
   * Fetch Bitcoin price history for a date range
   * @param {Date} startDate - Start date for history
   * @param {Date} endDate - End date for history
   * @returns {Promise<Array>} Array of price data points {timestamp, price}
   */
  async fetchPriceHistory(startDate, endDate) {
    try {
      // Convert dates to Unix timestamps (seconds)
      const fromTimestamp = Math.floor(startDate.getTime() / 1000);
      const toTimestamp = Math.floor(endDate.getTime() / 1000);

      // CoinGecko API endpoint for market chart range
      const url = `${this.baseUrl}/coins/bitcoin/market_chart/range`;
      const params = {
        vs_currency: 'usd',
        from: fromTimestamp,
        to: toTimestamp
      };

      const response = await axios.get(url, { params });

      // Transform the response data
      if (response.data && response.data.prices) {
        return response.data.prices.map(([timestamp, price]) => ({
          timestamp,
          date: new Date(timestamp),
          price: parseFloat(price.toFixed(2))
        }));
      }

      return [];
    } catch (error) {
      console.error('Error fetching BTC price history:', error);
      console.log('Using mock data for demonstration purposes...');
      
      // Return mock data as fallback
      return this.generateMockData(startDate, endDate);
    }
  }

  /**
   * Validate date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Object} Validation result {valid, error}
   */
  validateDateRange(startDate, endDate) {
    if (!startDate || !endDate) {
      return { valid: false, error: 'Both start and end dates are required' };
    }

    if (startDate >= endDate) {
      return { valid: false, error: 'Start date must be before end date' };
    }

    const now = new Date();
    if (endDate > now) {
      return { valid: false, error: 'End date cannot be in the future' };
    }

    // Check if date range is too large (CoinGecko has limits)
    const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    if (daysDiff > 365) {
      return { valid: false, error: 'Date range cannot exceed 365 days' };
    }

    return { valid: true };
  }
}

export default new BtcPriceService();
