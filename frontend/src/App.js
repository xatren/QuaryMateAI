import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCloudSun, faNewspaper, faChartLine, faComments } from '@fortawesome/free-solid-svg-icons';
import ChatPage from './pages/ChatPage';
import WeatherPage from './pages/WeatherPage';
import NewsPage from './pages/NewsPage';
import StocksPage from './pages/StocksPage';

const App = () => {
    const [activeTab, setActiveTab] = useState('Chat');
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [language, setLanguage] = useState('en');  // Track the detected language

    // Function to classify the query (weather, news, stocks, or chat)
    const classifyQuery = async (query) => {
        if (query.toLowerCase().includes("weather") || query.toLowerCase().includes("hava")) {
            return "weather";
        }
        if (query.toLowerCase().includes("news")) {
            return "news";
        }
        if (query.toLowerCase().includes("stock")) {
            return "stocks";
        }
        return "chat";
    };

    // Function to detect if the query is in Turkish
    const isTurkishQuery = (query) => {
        const turkishKeywords = ["hava", "sıcaklık", "nem", "rüzgar", "durumu", "bugün", "nasıl", "ne", "yapmalı"];
        return turkishKeywords.some(keyword => query.toLowerCase().includes(keyword));
    };

    // Function to extract the city name from the query
    const extractCityFromQuery = (query) => {
        // List of common weather-related keywords and question words that should be ignored
        const ignoreKeywords = ["hava", "sıcaklık", "nem", "rüzgar", "durumu", "bugün", "nasıl", "ne", "yapmalı"];

        const words = query.split(" ");
        const inIndex = words.indexOf("in"); // If the query says "weather in city"
        
        // Check if the query includes "in" and a city afterward
        if (inIndex !== -1 && inIndex < words.length - 1) {
            const cityCandidate = words[inIndex + 1];
            if (!ignoreKeywords.includes(cityCandidate.toLowerCase())) {
                return cityCandidate;
            }
        }

        // If "in" is not used, find a city by filtering out weather-related and question keywords
        const cityWords = words
            .filter(word => word.length > 2 && !ignoreKeywords.includes(word.toLowerCase()))
            .map(word => word.replace(/da$|de$/, '')); // Remove Turkish suffixes like "da" or "de"

        // Return the first valid word as the city, or null if no city is found
        return cityWords.length > 0 ? cityWords[0] : null;
    };

    // Fetch weather data with language detection
    const fetchWeather = async (city, isTurkish) => {
        try {
            console.log("City detected:", city); // Debugging log for the city
            const lang = isTurkish ? 'tr' : 'en';  // Set language based on the query
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: process.env.REACT_APP_WEATHER_API_KEY,  // Use the API key from .env
                    units: 'metric',
                    lang
                },
            });

            console.log("Weather data response:", response.data); // Debugging log for weather data

            setWeatherData(response.data); // Update state with fetched data
            setActiveTab('Weather');  // Switch to the Weather tab

        } catch (err) {
            console.error("Failed to fetch weather data:", err);
            setMessages([...messages, { text: isTurkish ? "Hava durumu alınamadı. Lütfen tekrar deneyin." : "Could not fetch weather data. Please try again.", isUser: false }]);
        }
    };

    // Handle sending a message and triggering actions
    const handleSend = async () => {
        if (inputValue.trim()) {
            const newMessages = [...messages, { text: inputValue, isUser: true }];
            setMessages(newMessages);

            const label = await classifyQuery(inputValue);
            const isTurkish = isTurkishQuery(inputValue);

            // Set language based on the detected query language
            setLanguage(isTurkish ? 'tr' : 'en');

            if (label === "weather") {
                const city = extractCityFromQuery(inputValue);  // Extract city

                // Handle case where no city is provided
                if (city) {
                    await fetchWeather(city, isTurkish);  // Fetch weather with language preference
                } else {
                    setMessages([...newMessages, { text: isTurkish ? "Lütfen bir şehir belirtin." : "Please specify a city.", isUser: false }]);
                }

                setActiveTab('Weather');  // Switch to the Weather tab
            } else if (label === "news") {
                setActiveTab('News');
            } else if (label === "stocks") {
                setActiveTab('Stocks');
            } else {
                setActiveTab('Chat');
            }

            setInputValue('');
        }
    };

    // Render the appropriate page based on the active tab
    const renderPage = () => {
        switch (activeTab) {
            case 'Chat':
                return <ChatPage messages={messages} />;
            case 'Weather':
                return <WeatherPage weatherData={weatherData} language={language} />;
            case 'News':
                return <NewsPage />;
            case 'Stocks':
                return <StocksPage />;
            default:
                return <ChatPage messages={messages} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <h1 className="text-2xl font-bold text-center mb-4">AI Assistant for API Integration</h1>
                <div className="flex justify-between mb-4">
                    <button 
                        onClick={() => setActiveTab('Chat')} 
                        className={`flex-1 py-2 px-4 text-center rounded-l-lg ${activeTab === 'Chat' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border`}>
                        <FontAwesomeIcon icon={faComments} /> Chat
                    </button>
                    <button 
                        onClick={() => setActiveTab('Weather')} 
                        className={`flex-1 py-2 px-4 text-center ${activeTab === 'Weather' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border`}>
                        <FontAwesomeIcon icon={faCloudSun} /> Weather
                    </button>
                    <button 
                        onClick={() => setActiveTab('News')} 
                        className={`flex-1 py-2 px-4 text-center ${activeTab === 'News' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border`}>
                        <FontAwesomeIcon icon={faNewspaper} /> News
                    </button>
                    <button 
                        onClick={() => setActiveTab('Stocks')} 
                        className={`flex-1 py-2 px-4 text-center rounded-r-lg ${activeTab === 'Stocks' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'} border`}>
                        <FontAwesomeIcon icon={faChartLine} /> Stocks
                    </button>
                </div>
                <div className="flex-1 overflow-auto border rounded-lg bg-gray-50 p-4 mb-4">
                    {renderPage()}
                </div>
                <div className="flex items-center mt-4">
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about weather, news, or stocks..." 
                        className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                    />
                    <button 
                        onClick={handleSend}
                        className="bg-orange-500 text-white p-2 rounded-r-lg hover:bg-orange-600"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
