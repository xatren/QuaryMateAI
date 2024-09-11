import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = {
    en: {
        symbol: 'Stock Symbol',
        lastRefreshed: 'Last Refreshed',
        interval: 'Interval',
        outputSize: 'Output Size',
        timeZone: 'Time Zone',
        open: 'Open',
        high: 'High',
        low: 'Low',
        close: 'Close',
        volume: 'Volume'
    },
    tr: {
        symbol: 'Hisse Sembolü',
        lastRefreshed: 'Son Güncelleme',
        interval: 'Zaman Aralığı',
        outputSize: 'Veri Boyutu',
        timeZone: 'Zaman Dilimi',
        open: 'Açılış',
        high: 'En Yüksek',
        low: 'En Düşük',
        close: 'Kapanış',
        volume: 'Hacim'
    }
};

const StockPage = ({ stockData, language }) => {
    const selectedLabels = labels[language];  // Get the labels based on the language

    // Handle case when stock data is not available
    if (!stockData || !stockData['Meta Data'] || !stockData['Time Series (5min)']) {
        return <div>{language === 'tr' ? 'Hisse senedi verisi mevcut değil. Lütfen bir hisse sembolü arayın.' : 'No stock data available. Please search for a stock symbol.'}</div>;
    }

    const metaData = stockData['Meta Data'];
    const timeSeries = stockData['Time Series (5min)'];
    const labelTimes = Object.keys(timeSeries).reverse(); // Reverse to display in chronological order

    // Safely access 'close' values and filter valid data points
    const stockPrices = labelTimes.map(time => {
        const closeValue = timeSeries[time] && timeSeries[time]['4. close']; // Check if '4. close' exists
        return closeValue ? parseFloat(closeValue) : null;
    }).filter(price => price !== null);  // Filter out null values

    // Check if there are valid stock prices after filtering
    if (stockPrices.length === 0) {
        return <div>{language === 'tr' ? 'Geçerli hisse senedi fiyatı bulunamadı.' : 'No valid stock prices available.'}</div>;
    }

    const chartData = {
        labels: labelTimes,  // Time labels for the x-axis
        datasets: [
            {
                label: `${metaData['2. Symbol']} ${selectedLabels.close}`,
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
                    text: selectedLabels.time,
                }
            },
            y: {
                title: {
                    display: true,
                    text: `${selectedLabels.close} (USD)`,
                }
            }
        }
    };

    const stockPrice = stockPrices.length > 0 ? stockPrices[stockPrices.length - 1] : null; // Get the last stock price

    return (
        <div>  
            {stockPrice !== null && (
                <h1 style={{ fontWeight: 'bold' }}>{language === 'tr' ? `Hisse Senedi Fiyatı: ${stockPrice} $` : `Stock Price: ${stockPrice} $`}</h1> // Dolar sembolü eklendi ve kalın yapıldı
            )}
            <p><strong>{selectedLabels.symbol}:</strong> {metaData['2. Symbol']}</p>
            <p><strong>{selectedLabels.lastRefreshed}:</strong> {metaData['3. Last Refreshed']}</p>
            <p><strong>{selectedLabels.interval}:</strong> {metaData['4. Interval']}</p>
            <p><strong>{selectedLabels.outputSize}:</strong> {metaData['5. Output Size']}</p>
            <p><strong>{selectedLabels.timeZone}:</strong> {metaData['6. Time Zone']}</p>

            <h3>{language === 'tr' ? 'Anlık Zaman Serisi (5 dk):' : 'Intraday Time Series (5min):'}</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default StockPage;
