import React from 'react';

const WeatherPage = ({ weatherData }) => {
    if (!weatherData) {
        return <div>No data available. Please ask about the weather.</div>;
    }

    return (
        <div className="weather-page p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">{weatherData.name}</h2>
            <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
            <p><strong>Feels Like:</strong> {weatherData.main.feels_like}°C</p>
            <p><strong>Weather:</strong> {weatherData.weather[0].main} ({weatherData.weather[0].description})</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
            <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
            <p><strong>Cloudiness:</strong> {weatherData.clouds.all}%</p>
            {weatherData.rain && <p><strong>Rain Volume:</strong> {weatherData.rain['1h']} mm (last hour)</p>}
            <p><strong>Visibility:</strong> {weatherData.visibility} meters</p>
            <p><strong>Sunrise:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
    );
};

export default WeatherPage;
