import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherPage = ({ weatherData, language, airPollutionData }) => {
    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.myWidgetParam = window.myWidgetParam || [];
            window.myWidgetParam.push({
                id: 11,
                cityid: weatherData.id,
                appid: process.env.REACT_APP_WEATHER_API_KEY,
                units: 'metric',
                containerid: 'openweathermap-widget-11',
                lang: language
            });

            const widgetScript = document.createElement('script');
            widgetScript.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
            widgetScript.async = true;
            document.body.appendChild(widgetScript);
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [weatherData, language]);

    useEffect(() => {
        const fetchForecastData = async () => {
            if (weatherData && weatherData.coord) {
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${language}`);
                    const data = await response.json();
                    setForecastData(data);
                } catch (error) {
                    console.error('Hava durumu tahmin verileri alınırken hata oluştu:', error);
                }
            }
        };

        fetchForecastData();
    }, [weatherData, language]);

    const renderWeatherInfo = () => {
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
                airPollution: 'Air Pollution',
                aqi: 'Air Quality Index',
                weatherWidget: 'Weather Widget',
                forecast: '5 Day Forecast'
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
                airPollution: 'Hava Kirliliği',
                aqi: 'Hava Kalitesi İndeksi',
                weatherWidget: 'Hava Durumu Widget',
                forecast: '5 Günlük Tahmin'
            }
        };

        const selectedLabels = labels[language];

        return (
            <div className="weather-info">
                <h2>{weatherData.name}</h2>
                <p><strong>{selectedLabels.temperature}:</strong> {weatherData.main.temp}°C</p>
                <p><strong>{selectedLabels.feelsLike}:</strong> {weatherData.main.feels_like}°C</p>
                <p><strong>{selectedLabels.weather}:</strong> {weatherData.weather[0].description}</p>
                <p><strong>{selectedLabels.humidity}:</strong> {weatherData.main.humidity}%</p>
                <p><strong>{selectedLabels.pressure}:</strong> {weatherData.main.pressure} hPa</p>
                <p><strong>{selectedLabels.windSpeed}:</strong> {weatherData.wind.speed} m/s</p>
                <p><strong>{selectedLabels.cloudiness}:</strong> {weatherData.clouds.all}%</p>
                {weatherData.rain && <p><strong>{selectedLabels.rainVolume}:</strong> {weatherData.rain['1h']} mm</p>}
                <p><strong>{selectedLabels.visibility}:</strong> {weatherData.visibility} m</p>
                <p><strong>{selectedLabels.sunrise}:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p><strong>{selectedLabels.sunset}:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        );
    };

    const renderAirPollutionInfo = () => {
        if (!airPollutionData) {
            return null;
        }

        const labels = {
            en: {
                airPollution: 'Air Pollution',
                aqi: 'Air Quality Index'
            },
            tr: {
                airPollution: 'Hava Kirliliği',
                aqi: 'Hava Kalitesi İndeksi'
            }
        };

        const selectedLabels = labels[language];

        return (
            <div className="air-pollution-info">
                <h3>{selectedLabels.airPollution}</h3>
                <p><strong>{selectedLabels.aqi}:</strong> {airPollutionData.list[0].main.aqi}</p>
                <p><strong>CO:</strong> {airPollutionData.list[0].components.co} μg/m³</p>
                <p><strong>NO:</strong> {airPollutionData.list[0].components.no} μg/m³</p>
                <p><strong>NO2:</strong> {airPollutionData.list[0].components.no2} μg/m³</p>
                <p><strong>O3:</strong> {airPollutionData.list[0].components.o3} μg/m³</p>
                <p><strong>SO2:</strong> {airPollutionData.list[0].components.so2} μg/m³</p>
                <p><strong>PM2.5:</strong> {airPollutionData.list[0].components.pm2_5} μg/m³</p>
                <p><strong>PM10:</strong> {airPollutionData.list[0].components.pm10} μg/m³</p>
                <p><strong>NH3:</strong> {airPollutionData.list[0].components.nh3} μg/m³</p>
            </div>
        );
    };

    const prepareChartData = () => {
        if (!forecastData) return null;

        const labels = forecastData.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
        const temperatures = forecastData.list.map(item => item.main.temp);

        return {
            labels,
            datasets: [
                {
                    label: language === 'tr' ? 'Sıcaklık (°C)' : 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: language === 'tr' ? '5 Günlük Hava Durumu Tahmini' : '5 Day Weather Forecast',
            },
        },
    };

    return (
        <div className="weather-page">
            <h1>{language === 'tr' ? 'Hava Durumu' : 'Weather'}</h1>
            {renderWeatherInfo()}
            {renderAirPollutionInfo()}
            <div className="weather-widget mt-8">
                <h3 className="text-lg font-semibold mb-4">{language === 'tr' ? 'Hava Durumu Widget' : 'Weather Widget'}</h3>
                <div id="openweathermap-widget-11"></div>
            </div>
            {forecastData && (
                <div className="forecast mt-8">
                    <h3 className="text-lg font-semibold mb-4">{language === 'tr' ? '5 Günlük Tahmin' : '5 Day Forecast'}</h3>
                    <Line options={chartOptions} data={prepareChartData()} />
                    <div className="forecast-details mt-4">
                        {forecastData.list.filter((item, index) => index % 8 === 0).map((day, index) => (
                            <div key={index} className="forecast-day mb-4">
                                <h4>{new Date(day.dt * 1000).toLocaleDateString()}</h4>
                                <p>{language === 'tr' ? 'Sıcaklık:' : 'Temperature:'} {day.main.temp}°C</p>
                                <p>{language === 'tr' ? 'Hissedilen:' : 'Feels like:'} {day.main.feels_like}°C</p>
                                <p>{language === 'tr' ? 'Durum:' : 'Condition:'} {day.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherPage;