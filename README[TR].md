# Hava Durumu, Haber ve Hisse Senedi Sorguları için Yapay Zeka Asistanı

Bu Yapay Zeka Asistanı projesi, **React.js**, **Tailwind CSS** ve backend'de **Node.js** kullanılarak inşa edilmiş dinamik bir web uygulamasıdır. Asistan, çeşitli API'lerle entegre olarak kullanıcılara hava durumu, hisse senedi fiyatları ve haberler hakkında gerçek zamanlı bilgi sağlar. Uygulama, kullanıcının sorgularını anlamak ve ilgili yanıtları sağlamak için özel bir doğal dil işleme (NLP) mantığı içerir. Asistan, kullanıcının girdisine göre Türkçe ve İngilizce dahil birden fazla dilde yanıt verebilir.

## Özellikler
1. **Çok Dilli NLP Sorgu Sınıflandırma**: Kullanıcının sorgusunun dilini (Türkçe veya İngilizce) ve konusunu (hava durumu, hisse senedi, haberler veya genel sohbet) otomatik olarak algılar ve sınıflandırır.

2. **API Entegrasyonları**: 
   - Hava Durumu: OpenWeather API ile canlı veriler
   - Hisse Senedi: Alpha Vantage API ile gerçek zamanlı fiyatlar
   - Haberler: NewsAPI ile güncel makaleler

3. **Etkileşimli ve Dinamik UI**: 
   - Kullanıcı girdisine göre sohbet, hava durumu, hisse senetleri ve haberler bölümleri arasında otomatik geçiş yapar
   - Hisse senedi verileri için gerçek zamanlı grafikler sunar
   - Mobil uyumlu, responsive tasarım

4. **Akıllı Yanıt Sistemi**:
   - Sorgu sınıflandırmasına göre ilgili API'ye istek gönderir
   - Kullanıcının diline (Türkçe veya İngilizce) uygun yanıtlar verir

5. **Genişletilebilir Yapı**: 
   - Yeni API'ler veya ek özelliklerle kolay entegrasyon için tasarlanmıştır
   - Özelleştirilebilir ve ölçeklenebilir mimari

6. **Veri Görselleştirme**: 
   - Hava durumu bilgileri için görsel öğeler
   - Hisse senedi verileri için gerçek zamanlı grafikler
   - Haber makaleleri için özetler ve önizlemeler

7. **Kullanıcı Deneyimi Odaklı**:
   - Doğal dil etkileşimi sayesinde kolay kullanım
   - Cihazlar arası tutarlı deneyim için responsive tasarım
   - Dinamik içerik yükleme ile hızlı yanıt süresi

## İçindekiler

- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Çevre Değişkenleri](#çevre-değişkenleri)
- [API Entegrasyonu](#api-entegrasyonu)
  - [Hava Durumu API](#hava-durumu-api)
  - [Hisse Senedi API](#hisse-api)
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
