import requests

def get_news(api_key, query, language='en'):
    url = f"https://newsapi.org/v2/everything?q={query}&language={language}&apiKey={api_key}"
    response = requests.get(url)
    return response.json()
