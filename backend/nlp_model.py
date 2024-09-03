from transformers import pipeline

nlp = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def classify_query(query):
    labels = ["weather", "news", "stocks", "chat"]
    result = nlp(query, candidate_labels=labels)
    return result['labels'][0]  # Return the top label

def extract_city_from_query(query):
    # Basic approach: Assuming the query format is simple and contains the city name after "in"
    words = query.split()
    if "in" in words:
        city_index = words.index("in") + 1
        if city_index < len(words):
            return words[city_index]
    return None
