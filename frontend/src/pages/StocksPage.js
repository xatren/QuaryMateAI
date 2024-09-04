import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const StockPage = ({ stockData }) => {
    if (!stockData || !stockData['Meta Data'] || !stockData['Time Series (5min)']) {
        return <div>No stock data available. Please search for a stock symbol.</div>;
    }

    const timeSeries = stockData['Time Series (5min)'];
    const labels = Object.keys(timeSeries).reverse(); // Reverse to display in chronological order
    const stockPrices = labels.map(time => parseFloat(timeSeries[time]['4. close']));

    const chartData = {
        labels,  // Time labels for the x-axis
        datasets: [
            {
                label: `Stock Price (${stockData['Meta Data']['2. Symbol']})`,
                data: stockPrices,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Stock Price (USD)',
                }
            }
        }
    };

    return (
        <div>
            <h2>{stockData['Meta Data']['2. Symbol']} Stock Prices</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default StockPage;

