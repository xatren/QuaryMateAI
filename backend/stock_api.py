import requests

def get_stock_prices(api_key, symbol, interval='1min'):
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval={interval}&apikey={api_key}"
    response = requests.get(url)
    return response.json()
