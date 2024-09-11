import React, { useState } from 'react';
import axios from 'axios';
import ChatPage from './pages/ChatPage';
import WeatherPage from './pages/WeatherPage';
import NewsPage from './pages/NewsPage';
import StocksPage from './pages/StocksPage';
import AppLayout from './AppLayout';

const App = () => {
    const [activeTab, setActiveTab] = useState('Chat');
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [stockData, setStockData] = useState(null);
    const [newsData, setNewsData] = useState(null);
    const [language, setLanguage] = useState('en');
    const [airPollutionData, setAirPollutionData] = useState(null);

    const classifyQuery = async (query) => {
        if (query.toLowerCase().includes("weather") || query.toLowerCase().includes("hava")) {
            return "weather";
        }
        if (query.toLowerCase().includes("news") || query.toLowerCase().includes("haber")) {
            return "news";
        }
        if (query.toLowerCase().includes("stock") || query.toLowerCase().includes("hisse")) {
            return "stocks";
        }
        return "chat";
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const isTurkishQuery = (query) => {
        const turkishKeywords = ["hava", "haber", "sıcaklık", "nem", "rüzgar", "durumu", "bugün", "nasıl", "fiyat", "hisse"];
        return turkishKeywords.some(keyword => query.toLowerCase().includes(keyword));
    };

    const extractCityFromQuery = (query) => {
        const ignoreKeywords = ["hava", "sıcaklık", "nem", "rüzgar", "durumu", "bugün", "nasıl", "ne", "yapmalı"];
        const words = query.split(" ");
        const inIndex = words.indexOf("in");

        if (inIndex !== -1 && inIndex < words.length - 1) {
            const cityCandidate = words[inIndex + 1];
            if (!ignoreKeywords.includes(cityCandidate.toLowerCase())) {
                return cityCandidate;
            }
        }

        const cityWords = words
            .filter(word => word.length > 2 && !ignoreKeywords.includes(word.toLowerCase()))
            .map(word => word.replace(/da$|de$/, ''));

        return cityWords.length > 0 ? cityWords[0] : null;
    };

    const extractStockSymbol = (query) => {
        const words = query.split(" ");
        return words.length > 0 ? words[words.length - 1].toUpperCase() : null;
    };

    const fetchAirPollution = async (lat, lon) => {
        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
                params: {
                    lat,
                    lon,
                    appid: process.env.REACT_APP_WEATHER_API_KEY
                }
            });
            setAirPollutionData(response.data);
        } catch (err) {
            console.error("Hava kirliliği verileri alınamadı:", err);
        }
    };

    const fetchWeather = async (city, isTurkish) => {
        try {
            const lang = isTurkish ? 'tr' : 'en';
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: process.env.REACT_APP_WEATHER_API_KEY,
                    units: 'metric',
                    lang
                },
            });

            setWeatherData(response.data);
            if (response.data.coord) {
                await fetchAirPollution(response.data.coord.lat, response.data.coord.lon);
            }
            setActiveTab('Weather');
        } catch (err) {
            console.error("Failed to fetch weather data:", err);
            setMessages([...messages, { text: isTurkish ? "Hava durumu alınamadı. Lütfen tekrar deneyin." : "Could not fetch weather data. Please try again.", isUser: false }]);
        }
    };

    const fetchStockData = async (symbol, isTurkish) => {
        try {
            const response = await axios.get('https://www.alphavantage.co/query', {
                params: {
                    function: 'TIME_SERIES_INTRADAY',
                    symbol,
                    interval: '5min',
                    apikey: process.env.REACT_APP_STOCK_API_KEY,
                    outputsize: 'compact',
                    datatype: 'json',
                },
            });
    
            console.log("API Response:", response.data);
    
            if (!response.data || !response.data['Meta Data']) {
                const errorMessage = isTurkish ? "Hisse senedi verileri alınamadı. Lütfen tekrar deneyin." : "Could not fetch stock data. Please try again.";
                setMessages([...messages, { text: errorMessage, isUser: false }]);
                return;
            }
    
            setStockData(response.data);
            setActiveTab('Stocks');
            
            const successMessage = isTurkish ? `${symbol} hisse senedi fiyatı başarıyla alındı.` : `The stock price of ${symbol} has been fetched successfully.`;
            setMessages([...messages, { text: successMessage, isUser: false }]);
    
        } catch (err) {
            console.error("Failed to fetch stock data:", err);
            const errorMessage = isTurkish ? "Hisse senedi verileri alınamadı. Lütfen tekrar deneyin." : "Could not fetch stock data. Please try again.";
            setMessages([...messages, { text: errorMessage, isUser: false }]);
        }
    };

    const fetchNewsData = async (query, isTurkish) => {
        try {
            const lang = isTurkish ? 'tr' : 'en';
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: query,
                    apiKey: process.env.REACT_APP_NEWS_API_KEY,
                    language: lang,
                    sortBy: 'publishedAt',
                    pageSize: 10, // Daha fazla haber göstermek için artırıldı
                },
            });

            setNewsData(response.data.articles);
            setActiveTab('News');
            
            const successMessage = isTurkish 
                ? `"${query}" ile ilgili ${response.data.articles.length} haber bulundu.` 
                : `Found ${response.data.articles.length} news articles related to "${query}".`;
            setMessages(prevMessages => [...prevMessages, { text: successMessage, isUser: false }]);
        } catch (err) {
            console.error("Failed to fetch news data:", err);
            const errorMessage = isTurkish ? "Haberler alınamadı. Lütfen tekrar deneyin." : "Could not fetch news data. Please try again.";
            setMessages(prevMessages => [...prevMessages, { text: errorMessage, isUser: false }]);
        }
    };

    const handleSend = async () => {
        if (inputValue.trim()) {
            const newMessages = [...messages, { text: inputValue, isUser: true }];
            setMessages(newMessages);
    
            const label = await classifyQuery(inputValue);
            const isTurkish = isTurkishQuery(inputValue);
    
            setLanguage(isTurkish ? 'tr' : 'en');
    
            switch (label) {
                case "weather":
                    const city = extractCityFromQuery(inputValue);
                    if (city) {
                        await fetchWeather(city, isTurkish);
                    } else {
                        setMessages([...newMessages, { text: isTurkish ? "Lütfen bir şehir belirtin." : "Please specify a city.", isUser: false }]);
                    }
                    setActiveTab('Weather');
                    break;
                case "stocks":
                    const symbol = extractStockSymbol(inputValue);
                    if (symbol) {
                        await fetchStockData(symbol, isTurkish);
                    } else {
                        setMessages([...newMessages, { text: isTurkish ? "Lütfen bir hisse sembolü belirtin." : "Please specify a stock symbol.", isUser: false }]);
                    }
                    setActiveTab('Stocks');
                    break;
                case "news":
                    await fetchNewsData(inputValue, isTurkish);
                    break;
                default:
                    setActiveTab('Chat');
                    // Burada chatbot yanıtı eklenebilir
                    break;
            }
    
            setInputValue('');
        }
    };

    const renderPage = () => {
        switch (activeTab) {
            case 'Chat':
                return <ChatPage messages={messages} />;
            case 'Weather':
                return <WeatherPage weatherData={weatherData} language={language} airPollutionData={airPollutionData} />;
            case 'News':
                return <NewsPage newsData={newsData} language={language} />;
            case 'Stocks':
                return <StocksPage stockData={stockData} language={language} />;
            default:
                return <ChatPage messages={messages} />;
        }
    };

    return (
        <AppLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
            renderPage={renderPage}
            handleKeyPress={handleKeyPress}
        />
    );
};

export default App;