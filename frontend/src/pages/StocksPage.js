import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StocksPage = () => {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get('YOUR_STOCK_API_ENDPOINT', {
                    params: {
                        function: 'TIME_SERIES_INTRADAY',
                        symbol: 'AAPL', // Example: Apple Inc.
                        interval: '1min',
                        apikey: 'YOUR_STOCK_API_KEY',
                    },
                });
                setStockData(response.data['Time Series (1min)']);
            } catch (err) {
                setError('Failed to fetch stock data.');
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="stocks-page">
            <h2 className="text-xl font-bold mb-4">Stock Prices (AAPL)</h2>
            {stockData ? (
                <div className="stock-info">
                    {Object.keys(stockData).slice(0, 5).map((time, index) => (
                        <div key={index} className="mb-2">
                            <p><strong>Time:</strong> {time}</p>
                            <p><strong>Open:</strong> {stockData[time]['1. open']}</p>
                            <p><strong>Close:</strong> {stockData[time]['4. close']}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No stock data available.</p>
            )}
        </div>
    );
};

export default StocksPage;
