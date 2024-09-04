import React from 'react';

const StockPage = ({ stockData }) => {
    if (!stockData || !stockData['Meta Data'] || !stockData['Time Series (5min)']) {
        return <div>No stock data available. Please search for a stock symbol.</div>;
    }

    const metaData = stockData['Meta Data'];
    const timeSeries = stockData['Time Series (5min)'];

    return (
        <div className="stock-page">
            <h2>Stock Information: {metaData['2. Symbol']}</h2>
            <p><strong>Last Refreshed:</strong> {metaData['3. Last Refreshed']}</p>
            <p><strong>Interval:</strong> {metaData['4. Interval']}</p>
            <p><strong>Output Size:</strong> {metaData['5. Output Size']}</p>
            <p><strong>Time Zone:</strong> {metaData['6. Time Zone']}</p>

            <h3>Intraday Time Series (5min):</h3>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(timeSeries).map((time) => (
                        <tr key={time}>
                            <td>{time}</td>
                            <td>{timeSeries[time]['1. open']}</td>
                            <td>{timeSeries[time]['2. high']}</td>
                            <td>{timeSeries[time]['3. low']}</td>
                            <td>{timeSeries[time]['4. close']}</td>
                            <td>{timeSeries[time]['5. volume']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockPage;
