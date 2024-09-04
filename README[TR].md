# Hava Durumu, Haber ve Hisse Senedi Sorguları için Yapay Zeka Asistanı

Bu Yapay Zeka Asistanı projesi, **React.js**, **Tailwind CSS** ve backend'de **Node.js** kullanılarak inşa edilmiş dinamik bir web uygulamasıdır. Asistan, çeşitli API'lerle entegre olarak kullanıcılara hava durumu, hisse senedi fiyatları ve haberler hakkında gerçek zamanlı bilgi sağlar. Uygulama, kullanıcının sorgularını anlamak ve ilgili yanıtları sağlamak için özel bir doğal dil işleme (NLP) mantığı içerir. Asistan, kullanıcının girdisine göre Türkçe ve İngilizce dahil birden fazla dilde yanıt verebilir.

## Özellikler

1. **NLP Sorgu Sınıflandırma**: Kullanıcının sorgusunun hava durumu, hisse senedi veya haberlerle ilgili olup olmadığını otomatik olarak algılar.
2. **Çok Dilli Destek**: Kullanıcının sorgusunun diline göre Türkçe veya İngilizce yanıt verir.
3. **Hava Durumu Entegrasyonu**: **OpenWeather API** kullanarak canlı hava durumu verilerini çeker ve görüntüler.
4. **Hisse Senedi Fiyatı Entegrasyonu**: **Alpha Vantage API** kullanarak gerçek zamanlı hisse senedi fiyatlarını alır.
5. **Haber Entegrasyonu**: **NewsAPI** kullanarak ilgili haber makalelerini gösterir.
6. **Etkileşimli UI**: Kullanıcının girdisine göre sohbet, hava durumu, hisse senetleri ve haberler bölümleri arasında dinamik geçiş yapar.
7. **Gerçek Zamanlı Grafikler**: Hisse senedi verileri gerçek zamanlı grafiklerle görselleştirilir.
8. **Mobil Uyumlu**: Cihazlar arasında sorunsuz çalışmak üzere tasarlanmış responsive tasarım.
9. **Özelleştirilebilir**: Yeni API'lerle veya ek özelliklerle kolayca entegre edilebilecek şekilde tasarlanmıştır.

## Nasıl Çalışır

1. **Doğal Dil Sınıflandırma**: Uygulama, kullanıcı sorgusunu hava durumu, haber, hisse senetleri veya genel sohbet olarak sınıflandırmak için özel bir NLP mantığı kullanır.
2. **API İstekleri**: Sınıflandırıldıktan sonra, uygulama ilgili API'ye (OpenWeather, Alpha Vantage veya NewsAPI) istek gönderir.
3. **Dil Algılama**: Asistan çok dilli sorguları (İngilizce ve Türkçe) destekler ve yanıtları buna göre ayarlar.
4. **Dinamik Sayfa Yükleme**: Sınıflandırmaya bağlı olarak, uygulama dinamik olarak Hava Durumu, Hisse Senetleri ve Haberler sekmeleri arasında geçiş yapar.


## İçindekiler

- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Proje Yapısı](#proje-yapısı)
- [Çevre Değişkenleri](#çevre-değişkenleri)
- [API Entegrasyonu](#api-entegrasyonu)
  - [Hava Durumu API](#hava-durumu-api)
  - [Hisse Senedi API](#hisse-senedi-api)
  - [Haber API](#haber-api)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

## Kurulum

Projeyi yerel olarak kurmak için aşağıdaki adımları izleyin:

1. Depoyu klonlayın:

```bash
git clone https://github.com/xatren/QuaryMateAI
```

2. Hem frontend hem de backend için bağımlılıkları yükleyin:

```bash
cd frontend
npm install

```

3. Çevre değişkenlerini ayarlayın (aşağıda ayrıntılar verilmiştir).

4. Geliştirme sunucusunu çalıştırın:

```bash
# Backend'i çalıştır
cd backend
python app.py
# Frontend'i çalıştır
cd frontend
npm start
```

Uygulama artık `http://localhost:3000` adresinde kullanılabilir olacaktır.

## Kullanım

Proje çalışmaya başladığında:

1. **Sohbet Etkileşimi**: Sohbet penceresine sorular girerek hava durumu, hisse senedi fiyatları veya haberler hakkında yanıtlar alın.
2. **Hava Durumu Sorguları**: "London'da hava durumu nedir?" veya "Ankara'da hava nasıl?" gibi sorular sorabilirsiniz.
3. **Hisse Senedi Sorguları**: "AAPL hisse fiyatı nedir?" gibi hisse senedi fiyatlarını sorabilirsiniz.
4. **Haber Sorguları**: "Son Bitcoin haberleri nedir?" veya "En son teknoloji haberleri nedir?" gibi haber talepleri oluşturabilirsiniz.

Asistan, sorgunuza göre otomatik olarak ilgili bölüme (Hava Durumu, Hisse Senetleri veya Haberler) geçiş yapacaktır.

## Çevre Değişkenleri

bir `.env` dosyası oluşturmanız gerekecek. `package.json` dosyası ile aynı konumda olması gerekir.

### Frontend `.env` dosyası:

```bash
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_STOCK_API_KEY=your_alphavantage_api_key
REACT_APP_NEWS_API_KEY=your_newsapi_key
```


## API Entegrasyonu

Uygulama üç harici API ile entegredir:

### Hava Durumu API

- **Kullanılan API**: [OpenWeather API](https://openweathermap.org/api)
- **İşlevsellik**: Belirtilen bir şehir için mevcut hava durumu verilerini çeker.

Örnek İstek:
```bash
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY
```

### Hisse API

- **Kullanılan API**: [Alpha Vantage API](https://www.alphavantage.co/)
- **İşlevsellik**: Belirtilen şirketler için gerçek zamanlı hisse senedi fiyatlarını alır.

Örnek İstek:
```bash
https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=YOUR_API_KEY
```

### Haber API

- **Kullanılan API**: [NewsAPI](https://newsapi.org/)
- **İşlevsellik**: Kullanıcı tanımlı anahtar kelimelere dayalı en son haber makalelerini çeker.

Örnek İstek:
```bash
https://newsapi.org/v2/everything?q=technology&apiKey=YOUR_API_KEY
```


## Katkıda Bulunma

Katkılar memnuniyetle kabul edilir! Katkıda bulunmak için:

1. Depoyu fork edin.
2. Yeni bir branch oluşturun (`git checkout -b özellik-adi`).
3. Değişikliklerinizi yapın.
4. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`).
5. Branch'i push edin (`git push origin özellik-adi`).
6. Yeni bir Pull Request oluşturun.

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır - daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

---

Bu `README.md`, projenizin tüm yönlerini kapsar ve kullanıcıların projeyi nasıl kullanacakları ve katkıda bulunabilecekleri konusunda kapsamlı bir rehber sunar.
