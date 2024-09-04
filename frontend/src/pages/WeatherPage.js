import React from 'react';

const WeatherPage = ({ weatherData, language }) => {
    if (!weatherData) {
        return <div>{language === 'tr' ? 'Veri yok. Lütfen hava durumu hakkında bilgi isteyin.' : 'No data available. Please ask about the weather.'}</div>;
    }

    const labels = {
        en: {
            temperature: 'Temperature',
            feelsLike: 'Feels Like',
            weather: 'Weather',
            humidity: 'Humidity',
            pressure: 'Pressure',
            windSpeed: 'Wind Speed',
            cloudiness: 'Cloudiness',
            rainVolume: 'Rain Volume',
            visibility: 'Visibility',
            sunrise: 'Sunrise',
            sunset: 'Sunset',
        },
        tr: {
            temperature: 'Sıcaklık',
            feelsLike: 'Hissedilen Sıcaklık',
            weather: 'Hava Durumu',
            humidity: 'Nem Oranı',
            pressure: 'Basınç',
            windSpeed: 'Rüzgar Hızı',
            cloudiness: 'Bulutluluk',
            rainVolume: 'Yağış Miktarı',
            visibility: 'Görüş Mesafesi',
            sunrise: 'Gündoğumu',
            sunset: 'Günbatımı',
        }
    };

    const selectedLabels = labels[language];

    return (
        <div className="weather-page p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">{weatherData.name}</h2>
            <p><strong>{selectedLabels.temperature}:</strong> {weatherData.main.temp}°C</p>
            <p><strong>{selectedLabels.feelsLike}:</strong> {weatherData.main.feels_like}°C</p>
            <p><strong>{selectedLabels.weather}:</strong> {weatherData.weather[0].main} ({weatherData.weather[0].description})</p>
            <p><strong>{selectedLabels.humidity}:</strong> {weatherData.main.humidity}%</p>
            <p><strong>{selectedLabels.pressure}:</strong> {weatherData.main.pressure} hPa</p>
            <p><strong>{selectedLabels.windSpeed}:</strong> {weatherData.wind.speed} m/s</p>
            <p><strong>{selectedLabels.cloudiness}:</strong> {weatherData.clouds.all}%</p>
            {weatherData.rain && <p><strong>{selectedLabels.rainVolume}:</strong> {weatherData.rain['1h']} mm (last hour)</p>}
            <p><strong>{selectedLabels.visibility}:</strong> {weatherData.visibility} meters</p>
            <p><strong>{selectedLabels.sunrise}:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>{selectedLabels.sunset}:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
    );
};

export default WeatherPage;
