from flask import Flask, request, jsonify
from nlp_model import classify_query
from weather_api import get_weather
from news_api import get_news
from stock_api import get_stock_prices

app = Flask(__name__)

@app.route('/api/query', methods=['POST'])
def handle_query():
    data = request.json
    query = data['query']
    category = classify_query(query)

    if category == 'weather':
        lat, lon = data.get('lat'), data.get('lon')
        response = get_weather(lat, lon, api_key='your_weather_api_key')
    elif category == 'news':
        response = get_news(api_key='your_news_api_key', query=query)
    elif category == 'stocks':
        symbol = data.get('symbol')
        response = get_stock_prices(api_key='your_stock_api_key', symbol=symbol)
    else:
        response = {"message": "How can I assist you?"}

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
