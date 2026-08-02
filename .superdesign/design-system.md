# BRKUNLUER.SITE Tasarım Sistemi

## Ürün ve İçerik Bağlamı

BRKUNLUER.SITE, Burak Ünlüler'in Türkçe kişisel yayın, portföy ve dijital ürün sitesidir. Ana işler: gerçek proje/vaka analizlerini göstermek, AI Factory metotlarını açıklamak, makaleleri okunabilir bir yayın yapısında sunmak ve iletişim/bülten dönüşümünü desteklemek.

Temel rotalar: ana sayfa, portföy listesi ve vaka detayı, yazı listesi ve makale detayı, AI Factory, metotlar, hakkımda ve iletişim. Yeni proje, başarı, tarih, müşteri, teknoloji veya ekran görüntüsü uydurulmaz; yalnızca kaynak dosyalardaki içerik kullanılır.

## Mevcut Arayüz — Reprodüksiyon Kaynağı

Mevcut arayüz Geist, kırık beyaz ve kömür yüzeyleri, teal marka rengi, yuvarlak kartlar, pill rozetler, koyu hero alanları, ambient glow, vignette, noise ve gradient efektleri kullanır. “Current UI” taslağı oluşturulurken yalnızca gerçek kaynak dosyaları ve `app/globals.css` geçerlidir; bu bölüm değişiklik yapılmadan yeniden üretim içindir.

## Hedef Yön — Editorial Workshop

Yeni arayüz teknoloji ürünü şablonu gibi görünmemeli. Görsel dil; bağımsız bir tasarım stüdyosunun çalışma defteri, kültür-sanat yayını ve teknik vaka arşivi arasında durmalı. Etki; neon, parıltı veya dekoratif gradyandan değil tipografi, ritim, gerçek içerik, oran ve boşluktan gelir.

Seçilen Superdesign ilham kaynağı “Bold Editorial Studio Style”dır; Inter önerisi mevcut bağımlılık kuralı nedeniyle Geist ile, saf siyah-beyaz önerisi ise daha insani kâğıt/mürekkep tonları ve tek oksit vurguyla uyarlanır. Özel fare imleci ve sonsuz marquee kullanılmaz; erişilebilirlik ve içerik odağı korunur.

## Renk

- Paper: `#F2EFE8` — ana açık zemin
- Paper raised: `#FAF8F3` — yükseltilmiş içerik
- Ink: `#171613` — ana metin ve koyu yüzey
- Ink soft: `#4D4A43` — ikincil metin
- Rule: `#CFC9BC` — çizgiler ve ayırıcılar
- Oxide: `#B4472D` — tek marka/vurgu rengi
- Oxide dark: `#7D2D1F` — hover ve koyu tema vurgu
- Dark paper: `#1C1A17`
- Dark raised: `#25221D`
- Dark text: `#F0ECE3`

Yasaklar: mor, elektrik mavisi, cyan/teal, neon yeşil, çok renkli gradyan, aurora, glow, cam efekti ve gradient mesh. Renk yalnızca oksit vurguda ve gerçek proje görsellerinde görünür.

## Tipografi

- Yalnızca mevcut Geist Sans ve Geist Mono kullanılır; yeni font veya bağımlılık eklenmez.
- Display: Geist Sans 700, çok büyük, sıkı `-0.045em` tracking, 0.92–0.98 line-height.
- Başlık: Geist Sans 600, `-0.025em` tracking.
- Gövde: Geist Sans 400, 1.55–1.7 line-height, rahat satır uzunluğu.
- Metadata: Geist Mono 500, 11–13px, büyük harf, 0.08–0.12em tracking.
- Türkçe karakterler eksiksiz korunur. Her şeyi büyük harfe çevirmek yerine display ve kısa metadata alanlarında ölçülü kullanılır.

## Yerleşim

- Ana içerik genişliği 1180–1240px; okuma alanı 680–760px.
- 12 kolonlu editoryal ızgara; bölümler asimetrik 4/8, 5/7 ve 7/5 oranlarla kurulur.
- Her ana bölümde sol kenarda `01 / 02 / 03` gibi mono bölüm numarası ve ince yatay kural bulunur.
- Hero iki katmanlıdır: dev tipografik ifade + alt sırada kısa konumlandırma metni ve iki net CTA.
- Portföy, kart ızgarası yerine vaka indeksi mantığı taşır: büyük gerçek görsel, sıra numarası, yıl, rol/etiketler ve belirgin vaka bağlantısı.
- Yazılar yayın listesi gibi görünür: tarih, başlık, kısa özet ve okuma ipucu; gereksiz kart kutuları kaldırılır.
- Mobilde asimetri tek kolona çözülür; sıra numaraları, kurallar ve içerik hiyerarşisi korunur.

## Bileşenler

- Header: 1px alt çizgili, paper/ink yüzeyli, kompakt; sol marka, sağ metin navigasyonu ve küçük tema anahtarı. Yüzen pill navigasyon yok.
- Button: 2–4px köşe, dikdörtgen; birincil ink zemin/paper metin, ikincil şeffaf/1px çizgi. Tam pill yok.
- Card: Varsayılan olarak kutu/gölge değil, bölücü çizgi ve tipografik hiyerarşi. Görsel kart gerektiğinde 0–6px köşe ve 1px sınır.
- Badge/tag: Pill yerine mono metadata, köşeli küçük etiket veya düz metin. Sayısı azaltılır.
- Image: Gerçek görseller doğal oranında, sert kırpma ve ince kural ile. Grayscale zorunlu değildir; hover yalnızca küçük ölçek veya kontrast değişimi.
- Form: Geniş, alt çizgili veya 1px köşeli alanlar; belirgin label; oksit yalnızca focus halkasında.
- Footer: Ink zemin, büyük kapanış çağrısı, sade bağlantı kolonları ve ince beyaz kurallar.

## Hareket

- Giriş: 500–700ms, `cubic-bezier(0.16, 1, 0.3, 1)`, 16–24px dikey kayma ve opacity.
- Hover: 180–300ms; başlık/ok oksit olur, görsel en fazla `scale(1.015)`.
- Scroll tabanlı sürekli parıltı, ışık taraması, ambient pulse, otomatik marquee ve özel fare imleci yok.
- `prefers-reduced-motion` tam desteklenir; içerik hiçbir zaman animasyona bağımlı olmaz.

## Sayfa Sözleşmeleri

- Ana sayfa: güçlü kimlik cümlesi, uzmanlık şeridi, tek doğrulanmış portföy vakası, AI Factory sistemleri, yayın listesi, kısa insan profili ve bülten kapanışı.
- Portföy: mevcut InkOS içeriğini tek güçlü vaka olarak sunar; boşluğu sahte projelerle doldurmaz.
- Portföy detayında GitHub depo özeti hissi veren, ancak doğrulanmamış yüzde üretmeyen bir teknoloji tablosu bulunur. InkOS için kaynakta doğrulanan katmanlar: React tabanlı arayüz, Python tabanlı servisler, Google OAuth, prompt geliştirmede Claude, görsel üretimde OpenAI görüntü modeli ve tarayıcı tarafında Sobel filtresi. Tablo sütunları `Katman / Teknoloji / Sistemdeki rol` düzenindedir.
- Yazılar: editoryal indeks; kapak görselleri yardımcıdır, başlık ve özet baskındır.
- AI Factory/metotlar: satış hunisi klişeleri yerine sistem diyagramı hissi veren numaralı modüller ve net kapsam.
- Detay sayfaları: geniş vaka/makale başlığı, metadata rayı, dar okuma kolonu ve ilgili içerik kapanışı.

## Biyografi ve Uzmanlık Gerçekleri

- `2015–2021`: oyun sunucuları, paket geliştirmeleri ve bootstack geçişleri üzerinden teknik altyapı ve sistem kurma dönemi.
- `2022`: ilk profesyonel proje başlangıcı. `2019` ilk profesyonel proje veya profesyonel deneyim başlangıcı olarak kullanılmaz.
- Uzmanlık özeti; AI ürün geliştirme, ajan mühendisliği, prompt sistemleri, workflow/otomasyon, modern web uygulamaları ve ürün deneyimi eksenlerinde gösterilir.
- Zaman çizelgesi kısa, kanıtlanabilir ve aşamalı olmalıdır; yeni işveren, müşteri, proje adı, başarı metriği veya tarih uydurulmaz.

## Bağlantı Sözleşmesi

- Kilitli ana navigasyon sırası ve görünen etiketleri: `Portföy → /portfolyo`, `AI Factory → /ai-factory`, `Yayınlar → /yazilar`, `Hakkımda → /hakkinda`, `İletişim → /iletisim`.
- `Metotlar` kullanıcıya görünen ana kategori değildir. Mevcut `/metotlar` ve `/metotlar/[slug]` rotaları teknik olarak korunur; arayüzde bu koleksiyon `Sistem Kitaplığı` adıyla AI Factory altında sunulur.
- `Yazılar` teknik rota adında korunur; ana navigasyon ve sayfa başlığında `Yayınlar` kullanılır.
- Ana navigasyon, tüm CTA'lar, portföy, AI Factory, yazı, metot, hakkımda ve iletişim bağlantıları gerçek Next.js rotalarına gider.
- InkOS dış bağlantısı kaynakta tanımlı `https://www.inkosone.com` adresini kullanır.
- Sosyal bağlantılar yalnızca `lib/site.ts` içindeki GitHub, X ve Instagram adreslerinden alınır.
- Sahte `#` bağlantıları, uydurma slug'lar ve tasarım önizlemesine özgü rotalar uygulamaya taşınmaz.

## Zorunlu Görsel Kısıt

Her tasarımda yalnızca bu dosyada tanımlanan fontlar, renkler, boşluklar ve bileşen stilleri kullanılır. Yeni font, renk veya görsel stil eklenmez. Özellikle AI/SaaS çağrışımlı teal-cyan-mor paletler, glow, glassmorphism, gradient, aşırı yuvarlak kartlar ve pill yığınları kullanılmaz.
