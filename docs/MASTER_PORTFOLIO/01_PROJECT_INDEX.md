# Master Portfolio Proje İndeksi

Arşiv anlık görüntüsü: **2026-08-02**<br>
Kanonik proje sayısı: **29**<br>
Çözümlenmemiş aday sayısı: **8**

## Kanıt standardı

Bu bilgi tabanı yalnız erişilebilir yerel dosyalar, Git yapılandırmaları ve ayrı olarak belirtilen canlı web kontrollerinden üretilmiştir. Birincil kanıt bulunmayan değerler `Unknown` olarak tutulur. Planlanan teknoloji ile uygulanmış teknoloji, belgeli yayın ile canlı doğrulama ve gerçek varlık ile AI destek görsel birbirine eşit sayılmaz. Kaynak dosyalarda görülen parola, anahtar, merchant kimliği ve benzeri hassas değerler bu arşive alınmamıştır.

`content/projects/<slug>/` altındaki klasörler kanonik veritabanından üretilir. Mevcut `lib/content.ts` yalnız `content/projects` kökündeki doğrudan MD/MDX dosyalarını okuduğu için bu alt klasörler mevcut site rotalarını değiştirmez. [S006]

## Öncelikli kanonik liste

Öncelik puanı; iş değeri, teknik karmaşıklık, portföy değeri ve eğitsel değerin 25'er puanlık toplamıdır. Bu puanlar arşiv değerlendirmesidir; müşteri geliri veya başarı iddiası değildir.

| # | Proje | Tür | Durum | Belge skoru | Öncelik | Kanıt |
|---:|---|---|---|---:|---:|---|
| 1 | [CAU INK](../../content/projects/cau-ink/index.mdx) | Kurumsal stüdyo sitesi ve galeri | Üretim sitesi 2026-08-02 web taramasında erişildi; yerel klasörlerde birden fazla tarihsel yeniden tasarım bulunuyor. | 94 | 99 | [S010] [S011] [S012] [S013] [S014] [S015] |
| 2 | [SalonIQ](../../content/projects/saloniq/index.mdx) | Çok kiracılı SaaS | Yerel kanonik belgede v2.2.90 MVP ve production kaydı var; dışarıdan güncel canlı doğrulama yapılamadı. | 86 | 99 | [S020] [S021] [S022] [S023] |
| 3 | [InkOS](../../content/projects/inkos/index.mdx) | AI destekli web ürünü | Haziran 2026 temel dokümanında çekirdek kod öncesi aşama; BRKUNLUER.SITE anlatısında çalışan MVP iddiası var. Çelişki çözülmedi ve güncel üretim doğrulanamadı. | 74 | 99 | [S005] [S030] [S031] [S032] [S033] |
| 4 | [AI Factory OS](../../content/projects/ai-factory-os/index.mdx) | İç ürün ve süreç platformu | MVP kapsamı ve mimari belgeli; yerel uygulama/dokümantasyon mevcut. Üretim yayın durumu Unknown. | 68 | 98 | [S040] [S041] [S042] [S005] |
| 5 | [SatışMetni AI](../../content/projects/satis-metni-ai/index.mdx) | Türkçe AI SaaS | Yerel Next.js uygulama, API, admin, veritabanı ve ödeme dosyaları mevcut; üretim yayını Unknown. | 69 | 94 | [S070] [S071] |
| 6 | [Gold Tracker](../../content/projects/gold-tracker/index.mdx) | Mobil öncelikli PWA | Yerel tam uygulama ve README'de Vercel yayın kaydı mevcut; URL bu taramada canlı doğrulanamadı. | 72 | 93 | [S080] [S081] [S082] |
| 7 | [BRKUNLUER.SITE](../../content/projects/brkunluer-site/index.mdx) | Kişisel marka, portföy ve bilgi merkezi | Yerel uygulama aktif geliştirmede; üretim URL'si yapılandırılmış, bu taramada canlı erişim doğrulanamadı. | 81 | 92 | [S001] [S002] [S003] [S004] [S005] [S006] |
| 8 | [WPForge](../../content/projects/wpforge/index.mdx) | AI-first CLI | Yerel Python kaynakları, mimari ve test klasörü mevcut; README 32 testin geçtiğini kaydediyor fakat bu taramada testler yeniden çalıştırılmadı. | 61 | 89 | [S170] [S171] [S172] |
| 9 | [AdresModa](../../content/projects/adres-moda/index.mdx) | E-ticaret sitesi | Teklif, kurulum rehberi, tema planı ve ürün/varlık dosyaları mevcut; üretim tamamlanması ve canlı site Unknown. | 77 | 84 | [S050] [S051] [S052] [S053] |
| 10 | [Mr. Pisi](../../content/projects/mr-pisi/index.mdx) | Marka ve ürün landing sitesi | Üç yerel Vite varyantı ve kapsamlı marka arşivi mevcut; web indeksinde site başlığı görüldü, güncel işlev ve yayın sürümü doğrulanmadı. | 73 | 79 | [S060] [S061] [S062] [S063] |
| 11 | [codex-skills](../../content/projects/codex-skills/index.mdx) | Skill kütüphanesi / açık kaynak depo | Yerel Git deposu mevcut; paketlerin güncel yayın durumu Unknown. | 44 | 76 | [S210] [S211] |
| 12 | [MEZAT](../../content/projects/mezat/index.mdx) | Gerçek zamanlı web ürün konsepti | Küratörlü arşivde WebSocket açık artırma spesifikasyonu kayıtlı; atıf yapılan birincil design/Stitch dosyaları yerelde bulunamadı. | 19 | 69 | [S190] [S191] |
| 13 | [Takipler Store](../../content/projects/takipler-store/index.mdx) | Sipariş ve servis paneli | Yerel Next.js uygulama ve Vercel proje yapılandırması mevcut; production URL ve yayın doğrulaması Unknown. | 38 | 65 | [S090] [S091] [S092] |
| 14 | [Personal CRM](../../content/projects/personal-crm/index.mdx) | Web uygulaması prototipi | Yerel frontend/backend prototipi mevcut; auth ve kalıcı veri üretimde değil, yayın Unknown. | 49 | 64 | [S140] [S141] |
| 15 | [Google Business Profile Data Service](../../content/projects/google-business-profile-service/index.mdx) | Web arayüzlü veri çıkarma servisi | Yerel Node/Express kaynakları ve README mevcut; production Unknown. | 46 | 64 | [S180] [S181] |
| 16 | [3Dikili](../../content/projects/3dikili/index.mdx) | E-ticaret UX demosu | Yerel responsive demo mevcut; kaynak belge gerçek backend ve e-ticaret işlevi olmadığını açıkça söylüyor. | 49 | 62 | [S100] [S101] |
| 17 | [Tattoo Design Desktop App](../../content/projects/tattoo-design-desktop-app/index.mdx) | Masaüstü uygulama konsepti | Yalnız küratörlü arşiv kaydı bulundu; InkOS ile birleşme kararı açık değil ve birincil kaynak kod bulunamadı. | 16 | 61 | [S190] [S191] |
| 18 | [OFF İlan Platformu](../../content/projects/off-ilan-platformu/index.mdx) | Tam yığın ilan platformu | Yerel frontend, backend, admin, Docker ve Nginx kaynakları mevcut; production ve gerçek ödeme doğrulaması Unknown. | 48 | 60 | [S160] [S161] |
| 19 | [Atelier Dimora](../../content/projects/atelier-dimora/index.mdx) | Kurumsal site yeniden tasarım prototipi | Birden fazla masaüstü/mobil Stitch HTML prototipi mevcut; uygulama ve production durumu Unknown. | 40 | 60 | [S120] |
| 20 | [StageKey](../../content/projects/stagekey/index.mdx) | Web + masaüstü ürün konsepti | Yalnız küratörlü arşiv kaydı bulundu; atıf yapılan HTML mockup yerelde bulunamadı. | 17 | 60 | [S190] [S191] |
| 21 | [Yapay Zekâ Model Karşılaştırması](../../content/projects/yapay-zeka-model-karsilastirmasi/index.mdx) | Veri görselleştirmeli statik içerik sayfası | Yerel index.html ve models.json mevcut; verilerin güncelliği ve üretim URL'si Unknown. | 46 | 59 | [S202] |
| 22 | [CAU INK × MoveZone LED Reklamları](../../content/projects/cau-ink-movezone-led/index.mdx) | Motion reklam teslimi | Küratörlü arşivde teslim edilmiş iki LED motion çalışma olarak kayıtlı; birincil video dosyası kesin eşleştirmesi Unknown. | 29 | 52 | [S014] [S190] [S191] |
| 23 | [AI Trainer Kamu Eğitimi](../../content/projects/ai-trainer-kamu-egitimi/index.mdx) | Eğitim sunumu ve materyal paketi | Küratörlü arşivde 17 slayt ve ilişkili eğitim materyalleri kayıtlı; birincil dosya yolu bulunamadı. | 21 | 51 | [S190] [S191] |
| 24 | [Yasui](../../content/projects/yasui/index.mdx) | API gateway/proxy konsepti | Yalnız küratörlü arşiv kaydı bulundu; bağımsız kaynak kod veya birincil belge bulunamadı. | 15 | 50 | [S190] [S191] |
| 25 | [HERA BRAID Link-in-Bio](../../content/projects/hera-braid/index.mdx) | Tek sayfa link-in-bio | Yerel HTML/CSS/JS uygulama ve gerçek marka/kartvizit varlıkları mevcut; canlı URL Unknown. | 47 | 49 | [S110] [S111] |
| 26 | [Karesi Periyodik Kontrol](../../content/projects/karesi-periyodik-kontrol/index.mdx) | Kurumsal web sitesi teklifi | İki teklif belgesi mevcut; uygulama, kaynak kod ve yayın kanıtı Unknown. | 37 | 49 | [S130] |
| 27 | [8 Mart Dünya Kadınlar Günü Deneyimi](../../content/projects/8-mart-deneyimi/index.mdx) | Sesli ve etkileşimli statik web deneyimi | Yerel HTML, CSS, JavaScript ve ses dosyaları mevcut; production URL Unknown. | 42 | 44 | [S201] |
| 28 | [Premium Listing Platform](../../content/projects/premium-listing-platform/index.mdx) | Frontend-only ilan platformu MVP | Yerel frontend-only MVP; README backend, gerçek login ve admin olmadığını belirtiyor. Production Unknown. | 32 | 44 | [S150] [S151] |
| 29 | [Buse Birthday Web Experience](../../content/projects/buse-birthday/index.mdx) | Tek dosyalı etkileşimli web deneyimi | Yerel index.html ve görsel varlık mevcut; production URL Unknown. | 26 | 32 | [S200] |

## Birleştirme kaydı

| Kanonik proje | Birleştirilen ad/klasörler | Kanıt |
|---|---|---|
| CAU INK | CAU_INK, CAU_INK_STITCH, CAU_INK_WHITE_DEMO, CAU_INK_MEDICAL, CAU INK Gallery v2, Tattoo-Demo, CAU_INK_REDESING-1 | [S010] [S011] [S012] [S014] [S015] |
| SalonIQ | SALONIQ_APP, _SalonIQ_Archive, Saloniq APP Yedekler, 222les / KasaPage | [S020] [S021] [S022] [S023] |
| SatışMetni AI | FABLE-MONEY-SYSTEM, e-ticaret-asistan | [S070] [S071] |
| HERA BRAID Link-in-Bio | LINK-BIO, Buse-HairBraid | [S110] [S111] |
| BRKUNLUER.SITE | BRKUNLUER.SITE, BRKUNLUER.SITE-KAYNAK | [S001] [S002] [S003] |
| Mr. Pisi | mr.-pisi---premium-kedi-kumu, mr.-pisi---premium-kedi-kumu (1), mr.-pisi---premium-kedi-kumu (2), MR.Pisi | [S060] [S061] [S062] |

## Kaynak kayıt defteri

Belge içindeki her `[Sxxx]` işareti aşağıdaki kaynağa gider. Dizin düzeyindeki kayıtlar, o proje için dosya kökü olarak kullanılmıştır.

| Kimlik | Kaynak | Kullanım |
|---|---|---|
| S001 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\BRKUNLUER.SITE\docs\OVERVIEW.md` | BRKUNLUER.SITE ürün kapsamı |
| S002 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\BRKUNLUER.SITE\docs\ARCHITECTURE.md` | BRKUNLUER.SITE mimarisi ve ADR'ler |
| S003 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\BRKUNLUER.SITE\package.json` | BRKUNLUER.SITE gerçek bağımlılık bildirimi |
| S004 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\BRKUNLUER.SITE\lib\site.ts` | Site kimliği ve üretim URL'si |
| S005 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\BRKUNLUER.SITE\content` | Makaleler, yöntemler ve InkOS proje anlatısı |
| S006 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\BRKUNLUER.SITE\lib\content.ts` | İçerik keşfi ve doğrudan dosya yükleme davranışı |
| S010 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\CAU_INK_STITCH\PROJECT_MEMORY.md` | CAU INK sahne, içerik ve uygulama durumu |
| S011 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\CAU_INK_STITCH\ARCHITECTURE.md` | CAU INK sahne mimarisi |
| S012 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\CAU_INK_STITCH\package.json` | CAU INK güncel paket bildirimi |
| S013 | `https://cauink.com/` | 2026-08-02 taramasında erişilen üretim sitesi |
| S014 | `C:\Users\Burak\Documents\ByyHit Works\GENEL PROJE DOSYALARI\CAU-INK-DOSYALAR` | CAU INK fotoğraf, video, logo ve içerik arşivi |
| S015 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\CAU_INK` | CAU INK statik/SEO ve Netlify dönemi |
| S020 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\SALONIQ_APP\docs\core\MASTER-CONTEXT-AND-VERSION.md` | SalonIQ kanonik ürün bağlamı |
| S021 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\SALONIQ_APP\docs\operations\DEPLOYMENT.md` | SalonIQ yerel yayın kaydı |
| S022 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\SALONIQ_APP\package.json` | SalonIQ monorepo bildirimi |
| S023 | `C:\Users\Burak\Documents\ByyHit Works\222les\CONTEXT-KASA-EK.md` | SalonIQ kasa modülü ve gerçek zamanlı stok |
| S030 | `C:\Users\Burak\Documents\ByyHit Works\Ink-OS\docs\handoff\CURRENT_STATE.md` | InkOS belgeli temel/teslim durumu |
| S031 | `C:\Users\Burak\Documents\ByyHit Works\Ink-OS\docs\architecture\tech-stack.md` | InkOS planlanan teknik yığını |
| S032 | `C:\Users\Burak\Documents\ByyHit Works\Ink-OS\docs\product\vision.md` | InkOS ürün vizyonu |
| S033 | `C:\Users\Burak\Documents\ByyHit Works\Ink-OS` | InkOS depo, landing ve dokümantasyon kökü |
| S040 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\AI-FACTORY-OS\README.md` | AI Factory OS vizyon ve akış |
| S041 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\AI-FACTORY-OS\docs\canonical\MVP_SCOPE.md` | AI Factory OS MVP kapsamı |
| S042 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\AI-FACTORY-OS\docs` | AI Factory OS mimari, ADR ve operasyon belgeleri |
| S050 | `C:\Users\Burak\Documents\ByyHit Works\Adress_Moda\ibrahim_Adress_Moda_roadmap.docx` | AdresModa teklif ve yol haritası |
| S051 | `C:\Users\Burak\Documents\ByyHit Works\Adress_Moda\AdresModa_Kurulum_Rehberi_v1.docx` | AdresModa kurulum kararı |
| S052 | `C:\Users\Burak\Documents\ByyHit Works\Adress_Moda\Tema-Uygulama-Yol-Haritası.txt` | AdresModa Clotya tasarım ve uygulama planı |
| S053 | `C:\Users\Burak\Documents\ByyHit Works\Adress_Moda` | AdresModa ürün CSV, logo, tema ve eklenti varlıkları |
| S060 | `C:\Users\Burak\Documents\ByyHit Works\Mr.Pisi Kedi Kumu` | Mr. Pisi Vite varyantları ve marka varlıkları |
| S061 | `C:\Users\Burak\Documents\ByyHit Works\Mr.Pisi Kedi Kumu\MRPISI.COM -- TO DO LIST.docx` | Mr. Pisi yayın, SEO ve form kontrol listesi |
| S062 | `C:\Users\Burak\Documents\ByyHit Works\Mr.Pisi Kedi Kumu\MR.Pisi\DURUM BELGESİ.docx` | Mr. Pisi marka ve dijital hazırlık durumu |
| S063 | `https://www.mrpisi.com/` | Web indeksinde görülen Mr. Pisi başlığı; güncel işlev doğrulanmadı |
| S070 | `C:\Users\Burak\Documents\ByyHit Works\ARQEN STUDIO\FABLE-MONEY-SYSTEM\Plan.md` | SatışMetni AI ürün planı |
| S071 | `C:\Users\Burak\Documents\ByyHit Works\ARQEN STUDIO\FABLE-MONEY-SYSTEM` | SatışMetni AI uygulama kaynakları |
| S080 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\FİKİR\GOLD TRACKER\README.md` | Gold Tracker özellik, yığın ve repo kaydı |
| S081 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\FİKİR\GOLD TRACKER\docs\Plan.md` | Gold Tracker ürün ve teknik planı |
| S082 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\FİKİR\GOLD TRACKER` | Gold Tracker uygulama kaynakları |
| S090 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\Takipler-Store\package.json` | Takipler Store paket bildirimi |
| S091 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\Takipler-Store\app\page.tsx` | Takipler Store panel akışı |
| S092 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\Takipler-Store\vercel.json` | Takipler Store Vercel yapılandırması |
| S100 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\3dikili-demo\3Demo_context.md` | 3Dikili demo kapsamı ve sınırları |
| S101 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\3dikili-demo` | 3Dikili Vite demo kaynakları ve teklif ekleri |
| S110 | `C:\Users\Burak\Documents\ByyHit Works\brkunluer.pro\LINK-BIO\README.md` | HERA BRAID link-in-bio kapsamı |
| S111 | `C:\Users\Burak\Documents\ByyHit Works\Buse-HairBraid` | HERA BRAID kartvizit ve marka varlıkları |
| S120 | `C:\Users\Burak\Documents\ByyHit Works\REDESING ÇALIŞMALAR\ATALIER DIMORA TATTOO` | Atelier Dimora Stitch HTML prototipleri |
| S130 | `C:\Users\Burak\Documents\ByyHit Works\TEKLİF DOSYALARI` | Karesi Periyodik Kontrol / Hasan Çimen teklifleri |
| S140 | `C:\Users\Burak\Documents\ByyHit Works\OLD.PROJECT\PersonelCRM\replit.md` | Personal CRM ürün ve teknik bağlamı |
| S141 | `C:\Users\Burak\Documents\ByyHit Works\OLD.PROJECT\PersonelCRM` | Personal CRM kaynak ve tasarım dosyaları |
| S150 | `C:\Users\Burak\Documents\ByyHit Works\OLD.PROJECT\OldcityLove\premium-listing-platform\README.md` | Premium Listing Platform MVP sınırları |
| S151 | `C:\Users\Burak\Documents\ByyHit Works\OLD.PROJECT\OldcityLove\premium-listing-platform` | Premium Listing Platform kaynakları |
| S160 | `C:\Users\Burak\Documents\ByyHit Works\ARQEN STUDIO\OFF-PROJELER\off_site_proje\README.md` | OFF ilan platformu kapsamı |
| S161 | `C:\Users\Burak\Documents\ByyHit Works\ARQEN STUDIO\OFF-PROJELER\off_site_proje` | OFF frontend, backend ve admin kaynakları |
| S170 | `C:\Users\Burak\Documents\ByyHit Works\WPForge\README.md` | WPForge ürün kapsamı |
| S171 | `C:\Users\Burak\Documents\ByyHit Works\WPForge\ARCHITECTURE.md` | WPForge mimarisi |
| S172 | `C:\Users\Burak\Documents\ByyHit Works\WPForge` | WPForge Python kaynakları ve testleri |
| S180 | `C:\Users\Burak\Documents\ByyHit Works\OLD.PROJECT\GOOGLE_DATA\README.md` | Google Business Profile veri servisi |
| S181 | `C:\Users\Burak\Documents\ByyHit Works\OLD.PROJECT\GOOGLE_DATA` | Google veri servisi kaynakları |
| S190 | `C:\Users\Burak\Documents\ByyHit Works\Projeler-Kaynak\Kaynak-1\MASTER_PROJECT_ARCHIVE.md` | Eski proje arşivi; tek başına doğrulama sayılmaz |
| S191 | `C:\Users\Burak\Documents\ByyHit Works\Projeler-Kaynak\Kaynak-1\knowledge\projects` | Yasui, StageKey, MEZAT ve ilişkili çalışma kayıtları |
| S200 | `C:\Users\Burak\Documents\ByyHit Works\Buse_Birthday` | Buse doğum günü statik deneyimi |
| S201 | `C:\Users\Burak\Documents\ByyHit Works\GENEL PROJE DOSYALARI\8-mart` | 8 Mart etkileşimli statik deneyimi |
| S202 | `C:\Users\Burak\Documents\ByyHit Works\YAPAYZEKA-KARSILASTIRMA` | Yapay zekâ model karşılaştırma sayfası ve veri dosyası |
| S210 | `C:\Users\Burak\Documents\ByyHit Works\codex-skills` | codex-skills yerel Git deposu |
| S211 | `C:\Users\Burak\Documents\ByyHit Works\Projeler-Kaynak\Kaynak-1\knowledge\projects\11_codex_skills_repo.md` | codex-skills arşiv kaydı |
