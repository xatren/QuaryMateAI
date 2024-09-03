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

    const classifyQuery = async (query) => {
        // Mock classification: If the query includes "weather", return "weather"
        if (query.toLowerCase().includes("weather")) {
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

    const extractCityFromQuery = (query) => {
        const words = query.split(" ");
        const inIndex = words.indexOf("in");
        if (inIndex !== -1 && inIndex < words.length - 1) {
            return words[inIndex + 1];
        }
        return null;
    };

    const fetchWeather = async (city) => {
        try {
            console.log("API Key:", process.env.REACT_APP_WEATHER_API_KEY); // Debugging: Check if the key is logged correctly
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: process.env.REACT_APP_WEATHER_API_KEY, // Use the API key from .env
                    units: 'metric',
                    lang: 'en'
                },
            });

            console.log('Weather API Response:', response.data); // Check the response data

            setWeatherData(response.data); // Update state with fetched data
            setActiveTab('Weather'); // Switch to the Weather tab
        } catch (err) {
            console.error("Failed to fetch weather data:", err);
            setMessages([...messages, { text: "Could not fetch weather data. Please try again.", isUser: false }]);
        }
    };

    const handleSend = async () => {
        if (inputValue.trim()) {
            const newMessages = [...messages, { text: inputValue, isUser: true }];
            setMessages(newMessages);
            const label = await classifyQuery(inputValue);

            if (label === "weather") {
                const city = extractCityFromQuery(inputValue);  // Extract the city name
                if (city) {
                    await fetchWeather(city); // Fetch the weather data
                    setActiveTab('Weather');  // Switch to the Weather tab
                } else {
                    setMessages([...newMessages, { text: "Please specify a city.", isUser: false }]);
                }
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

    const renderPage = () => {
        switch (activeTab) {
            case 'Chat':
                return <ChatPage messages={messages} />;
            case 'Weather':
                return <WeatherPage weatherData={weatherData} />;
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
