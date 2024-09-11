# QuaryMateAI Assistant for Weather, News, and Stock Queries

This AI Assistant project is a dynamic web application built using **React.js**, **Tailwind CSS**, and **Node.js** on the backend. The assistant helps users by integrating with various APIs to provide real-time weather data, stock prices, and news articles. The application also supports natural language processing (NLP) using custom logic to understand the user queries and provide relevant responses. The assistant is capable of responding in multiple languages, including Turkish and English, based on the user's input.

## Features

1. **NLP Query Classification**: Automatically detects if the user's query is related to weather, stocks, or news.
2. **Multilingual Support**: Responds in Turkish or English based on the detected language.
3. **Weather Integration**: Fetches and displays live weather data using the **OpenWeather API**.
4. **Stock Price Integration**: Retrieves real-time stock prices using the **Alpha Vantage API**.
5. **News Integration**: Shows relevant news articles using the **NewsAPI**.
6. **Interactive UI**: The app switches between chat, weather, stocks, and news sections dynamically based on the user’s input.
7. **Real-Time Graphs**: Stock data is visualized through real-time graphs.
8. **Mobile-Responsive**: Built with responsive design principles to work seamlessly across devices.
9. **Customizable**: Designed for easy integration with new APIs or additional features.

## How it Works

1. **Natural Language Classification**: The app uses a custom NLP logic to classify user queries as related to weather, news, stocks, or general chat.
2. **API Requests**: Once classified, the app sends requests to the appropriate API (OpenWeather, Alpha Vantage, or NewsAPI).
3. **Language Detection**: The assistant supports multilingual queries (English and Turkish) and adjusts the responses accordingly.
4. **Dynamic Rendering**: Based on the classification, the app dynamically switches between Weather, Stocks, and News tabs.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
  - [Weather API](#weather-api)
  - [Stock API](#stock-api)
  - [News API](#news-api)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/xatren/QuaryMateAI.git
```

2. Install dependencies for both the frontend and backend:

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. Set up environment variables (see below for details).

4. Run the development server:

```bash
# Run backend
cd backend
python app.py
# Run frontend
cd frontend
npm start
```

The app will now be available on `http://localhost:3000`.

## Usage

Once the project is up and running:

1. **Chat Interaction**: Enter questions in the chat window to get responses about weather, stock prices, or news.
2. **Weather Queries**: Ask questions like "What is the weather in London?" or "Ankara'da hava nasıl?".
3. **Stock Queries**: Ask for stock prices like "What is the stock price of AAPL?" or "AAPL hisse fiyatı nedir?".
4. **News Queries**: Request news using queries like "Tell me the latest Bitcoin news" or "En son teknoloji haberleri nedir?".

The assistant will automatically switch to the relevant section (Weather, Stocks, or News) based on your query.

## Environment Variables

You need to create a `.env` file in samefolder path with `package.json` for environment variables.

### Frontend `.env` file:

```bash
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_STOCK_API_KEY=your_alphavantage_api_key
REACT_APP_NEWS_API_KEY=your_newsapi_key
```

## API Integration

The application integrates with three external APIs:

### Weather API

- **API Used**: [OpenWeather API](https://openweathermap.org/api)
- **Functionality**: Fetches current weather data for a specified city.

Example Request:
```bash
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY
```

### Stock API

- **API Used**: [Alpha Vantage API](https://www.alphavantage.co/)
- **Functionality**: Retrieves intraday stock prices for specified companies.

Example Request:
```bash
https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=YOUR_API_KEY
```

### News API

- **API Used**: [NewsAPI](https://newsapi.org/)
- **Functionality**: Fetches the latest news articles based on user-defined keywords.

Example Request:
```bash
https://newsapi.org/v2/everything?q=technology&apiKey=YOUR_API_KEY
```



## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
