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


"""from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification

# Varlık tanıma (NER) için ModelPipeline kullanımı
ner_model = pipeline('ner', model='dbmdz/bert-large-cased-finetuned-conll03-english')

def extract_city_from_query(query):
    # Varlık tanıma ile şehir ismini çıkarma
    entities = ner_model(query)
    for entity in entities:
        if entity['entity'] == 'LOC':
            return entity['word']
    return None

# Metin sınıflandırması için fine-tuning
classifier = AutoModelForSequenceClassification.from_pretrained('facebook/bart-large-mnli')
tokenizer = AutoTokenizer.from_pretrained('facebook/bart-large-mnli')

def classify_query(query):
    labels = ["weather", "news", "stocks", "chat"]
    inputs = tokenizer(query, return_tensors='pt', padding=True, truncation=True)
    outputs = classifier(**inputs)
    scores = outputs[0][0].softmax(dim=0)
    return labels[scores.argmax().item()]

# Sentiment analizi eklentisi
sentiment_model = pipeline('sentiment-analysis')

def analyze_sentiment(query):
    result = sentiment_model(query)
    return result[0]['label'], result[0]['score']

# Modülerlik ve genişletilebilirlik
class NLPEngine:
    def __init__(self):
        self.ner_model = pipeline('ner', model='dbmdz/bert-large-cased-finetuned-conll03-english')
        self.classifier = AutoModelForSequenceClassification.from_pretrained('facebook/bart-large-mnli')
        self.tokenizer = AutoTokenizer.from_pretrained('facebook/bart-large-mnli')
        self.sentiment_model = pipeline('sentiment-analysis')

    def extract_city(self, query):
        entities = self.ner_model(query)
        for entity in entities:
            if entity['entity'] == 'LOC':
                return entity['word']
        return None

    def classify(self, query):
        labels = ["weather", "news", "stocks", "chat"]
        inputs = self.tokenizer(query, return_tensors='pt', padding=True, truncation=True)
        outputs = self.classifier(**inputs)
        scores = outputs[0][0].softmax(dim=0)
        return labels[scores.argmax().item()]

    def analyze_sentiment(self, query):
        result = self.sentiment_model(query)
        return result[0]['label'], result[0]['score']

# Kullanıcı deneyimi iyileştirmeleri
def handle_query(query):
    try:
        nlp_engine = NLPEngine()
        city = nlp_engine.extract_city(query)
        if city:
            print(f"City detected: {city}")
        else:
            print("No city detected in the query.")

        intent = nlp_engine.classify(query)
        print(f"Intent detected: {intent}")

        sentiment, score = nlp_engine.analyze_sentiment(query)
        print(f"Sentiment: {sentiment} ({score:.2f})")

    except Exception as e:
        print(f"Oops, something went wrong: {e}")
        print("Please try again with a different query.")"""