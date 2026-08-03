import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";

const U = "Unknown";
const snapshotDate = "2026-08-02";
const workspace = "C:\\Users\\Burak\\Documents\\ByyHit Works";

const sources = {
  S001: { path: `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\docs\\OVERVIEW.md`, note: "BRKUNLUER.SITE ürün kapsamı" },
  S002: { path: `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\docs\\ARCHITECTURE.md`, note: "BRKUNLUER.SITE mimarisi ve ADR'ler" },
  S003: { path: `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\package.json`, note: "BRKUNLUER.SITE gerçek bağımlılık bildirimi" },
  S004: { path: `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\lib\\site.ts`, note: "Site kimliği ve üretim URL'si" },
  S005: { path: `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\content`, note: "Makaleler, yöntemler ve InkOS proje anlatısı" },
  S006: { path: `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\lib\\content.ts`, note: "İçerik keşfi ve doğrudan dosya yükleme davranışı" },
  S010: { path: `${workspace}\\brkunluer.pro\\CAU_INK_STITCH\\PROJECT_MEMORY.md`, note: "CAU INK sahne, içerik ve uygulama durumu" },
  S011: { path: `${workspace}\\brkunluer.pro\\CAU_INK_STITCH\\ARCHITECTURE.md`, note: "CAU INK sahne mimarisi" },
  S012: { path: `${workspace}\\brkunluer.pro\\CAU_INK_STITCH\\package.json`, note: "CAU INK güncel paket bildirimi" },
  S013: { path: "https://cauink.com/", note: "2026-08-02 taramasında erişilen üretim sitesi" },
  S014: { path: `${workspace}\\GENEL PROJE DOSYALARI\\CAU-INK-DOSYALAR`, note: "CAU INK fotoğraf, video, logo ve içerik arşivi" },
  S015: { path: `${workspace}\\brkunluer.pro\\CAU_INK`, note: "CAU INK statik/SEO ve Netlify dönemi" },
  S020: { path: `${workspace}\\brkunluer.pro\\SALONIQ_APP\\docs\\core\\MASTER-CONTEXT-AND-VERSION.md`, note: "SalonIQ kanonik ürün bağlamı" },
  S021: { path: `${workspace}\\brkunluer.pro\\SALONIQ_APP\\docs\\operations\\DEPLOYMENT.md`, note: "SalonIQ yerel yayın kaydı" },
  S022: { path: `${workspace}\\brkunluer.pro\\SALONIQ_APP\\package.json`, note: "SalonIQ monorepo bildirimi" },
  S023: { path: `${workspace}\\222les\\CONTEXT-KASA-EK.md`, note: "SalonIQ kasa modülü ve gerçek zamanlı stok" },
  S030: { path: `${workspace}\\Ink-OS\\docs\\handoff\\CURRENT_STATE.md`, note: "InkOS belgeli temel/teslim durumu" },
  S031: { path: `${workspace}\\Ink-OS\\docs\\architecture\\tech-stack.md`, note: "InkOS planlanan teknik yığını" },
  S032: { path: `${workspace}\\Ink-OS\\docs\\product\\vision.md`, note: "InkOS ürün vizyonu" },
  S033: { path: `${workspace}\\Ink-OS`, note: "InkOS depo, landing ve dokümantasyon kökü" },
  S040: { path: `${workspace}\\brkunluer.pro\\AI-FACTORY-OS\\README.md`, note: "AI Factory OS vizyon ve akış" },
  S041: { path: `${workspace}\\brkunluer.pro\\AI-FACTORY-OS\\docs\\canonical\\MVP_SCOPE.md`, note: "AI Factory OS MVP kapsamı" },
  S042: { path: `${workspace}\\brkunluer.pro\\AI-FACTORY-OS\\docs`, note: "AI Factory OS mimari, ADR ve operasyon belgeleri" },
  S050: { path: `${workspace}\\Adress_Moda\\ibrahim_Adress_Moda_roadmap.docx`, note: "AdresModa teklif ve yol haritası" },
  S051: { path: `${workspace}\\Adress_Moda\\AdresModa_Kurulum_Rehberi_v1.docx`, note: "AdresModa kurulum kararı" },
  S052: { path: `${workspace}\\Adress_Moda\\Tema-Uygulama-Yol-Haritası.txt`, note: "AdresModa Clotya tasarım ve uygulama planı" },
  S053: { path: `${workspace}\\Adress_Moda`, note: "AdresModa ürün CSV, logo, tema ve eklenti varlıkları" },
  S060: { path: `${workspace}\\Mr.Pisi Kedi Kumu`, note: "Mr. Pisi Vite varyantları ve marka varlıkları" },
  S061: { path: `${workspace}\\Mr.Pisi Kedi Kumu\\MRPISI.COM -- TO DO LIST.docx`, note: "Mr. Pisi yayın, SEO ve form kontrol listesi" },
  S062: { path: `${workspace}\\Mr.Pisi Kedi Kumu\\MR.Pisi\\DURUM BELGESİ.docx`, note: "Mr. Pisi marka ve dijital hazırlık durumu" },
  S063: { path: "https://www.mrpisi.com/", note: "Web indeksinde görülen Mr. Pisi başlığı; güncel işlev doğrulanmadı" },
  S070: { path: `${workspace}\\ARQEN STUDIO\\FABLE-MONEY-SYSTEM\\Plan.md`, note: "SatışMetni AI ürün planı" },
  S071: { path: `${workspace}\\ARQEN STUDIO\\FABLE-MONEY-SYSTEM`, note: "SatışMetni AI uygulama kaynakları" },
  S080: { path: `${workspace}\\brkunluer.pro\\FİKİR\\GOLD TRACKER\\README.md`, note: "Gold Tracker özellik, yığın ve repo kaydı" },
  S081: { path: `${workspace}\\brkunluer.pro\\FİKİR\\GOLD TRACKER\\docs\\Plan.md`, note: "Gold Tracker ürün ve teknik planı" },
  S082: { path: `${workspace}\\brkunluer.pro\\FİKİR\\GOLD TRACKER`, note: "Gold Tracker uygulama kaynakları" },
  S090: { path: `${workspace}\\brkunluer.pro\\Takipler-Store\\package.json`, note: "Takipler Store paket bildirimi" },
  S091: { path: `${workspace}\\brkunluer.pro\\Takipler-Store\\app\\page.tsx`, note: "Takipler Store panel akışı" },
  S092: { path: `${workspace}\\brkunluer.pro\\Takipler-Store\\vercel.json`, note: "Takipler Store Vercel yapılandırması" },
  S100: { path: `${workspace}\\brkunluer.pro\\3dikili-demo\\3Demo_context.md`, note: "3Dikili demo kapsamı ve sınırları" },
  S101: { path: `${workspace}\\brkunluer.pro\\3dikili-demo`, note: "3Dikili Vite demo kaynakları ve teklif ekleri" },
  S110: { path: `${workspace}\\brkunluer.pro\\LINK-BIO\\README.md`, note: "HERA BRAID link-in-bio kapsamı" },
  S111: { path: `${workspace}\\Buse-HairBraid`, note: "HERA BRAID kartvizit ve marka varlıkları" },
  S120: { path: `${workspace}\\REDESING ÇALIŞMALAR\\ATALIER DIMORA TATTOO`, note: "Atelier Dimora Stitch HTML prototipleri" },
  S130: { path: `${workspace}\\TEKLİF DOSYALARI`, note: "Karesi Periyodik Kontrol / Hasan Çimen teklifleri" },
  S140: { path: `${workspace}\\OLD.PROJECT\\PersonelCRM\\replit.md`, note: "Personal CRM ürün ve teknik bağlamı" },
  S141: { path: `${workspace}\\OLD.PROJECT\\PersonelCRM`, note: "Personal CRM kaynak ve tasarım dosyaları" },
  S150: { path: `${workspace}\\OLD.PROJECT\\OldcityLove\\premium-listing-platform\\README.md`, note: "Premium Listing Platform MVP sınırları" },
  S151: { path: `${workspace}\\OLD.PROJECT\\OldcityLove\\premium-listing-platform`, note: "Premium Listing Platform kaynakları" },
  S160: { path: `${workspace}\\ARQEN STUDIO\\OFF-PROJELER\\off_site_proje\\README.md`, note: "OFF ilan platformu kapsamı" },
  S161: { path: `${workspace}\\ARQEN STUDIO\\OFF-PROJELER\\off_site_proje`, note: "OFF frontend, backend ve admin kaynakları" },
  S170: { path: `${workspace}\\WPForge\\README.md`, note: "WPForge ürün kapsamı" },
  S171: { path: `${workspace}\\WPForge\\ARCHITECTURE.md`, note: "WPForge mimarisi" },
  S172: { path: `${workspace}\\WPForge`, note: "WPForge Python kaynakları ve testleri" },
  S180: { path: `${workspace}\\OLD.PROJECT\\GOOGLE_DATA\\README.md`, note: "Google Business Profile veri servisi" },
  S181: { path: `${workspace}\\OLD.PROJECT\\GOOGLE_DATA`, note: "Google veri servisi kaynakları" },
  S190: { path: `${workspace}\\Projeler-Kaynak\\Kaynak-1\\MASTER_PROJECT_ARCHIVE.md`, note: "Eski proje arşivi; tek başına doğrulama sayılmaz" },
  S191: { path: `${workspace}\\Projeler-Kaynak\\Kaynak-1\\knowledge\\projects`, note: "Yasui, StageKey, MEZAT ve ilişkili çalışma kayıtları" },
  S200: { path: `${workspace}\\Buse_Birthday`, note: "Buse doğum günü statik deneyimi" },
  S201: { path: `${workspace}\\GENEL PROJE DOSYALARI\\8-mart`, note: "8 Mart etkileşimli statik deneyimi" },
  S202: { path: `${workspace}\\YAPAYZEKA-KARSILASTIRMA`, note: "Yapay zekâ model karşılaştırma sayfası ve veri dosyası" },
  S210: { path: `${workspace}\\codex-skills`, note: "codex-skills yerel Git deposu" },
  S211: { path: `${workspace}\\Projeler-Kaynak\\Kaynak-1\\knowledge\\projects\\11_codex_skills_repo.md`, note: "codex-skills arşiv kaydı" },
  S220: { path: `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\docs\\MASTER_PORTFOLIO\\USER_CORRECTIONS_2026-08-03.md`, note: "Portföy sahibinin başlık, görünürlük ve kapak talimatı" },
};

const defaults = {
  aliases: U, client: U, industry: U, projectType: U, categories: U, currentStatus: U,
  timeline: U, purpose: U, problemBeingSolved: U, targetUsers: U, businessGoals: U,
  technologyStack: U, frameworks: U, backend: U, database: U, hosting: U, cms: U,
  integrations: U, designSystem: U, brandLanguage: U, colorPalette: U, typography: U,
  responsiveStrategy: U, seoStrategy: U, performanceOptimizations: U,
  accessibilityNotes: U, majorFeatures: U, pages: U, architecture: U,
  interestingTechnicalDecisions: U, developmentChallenges: U, lessonsLearned: U,
  screenshotsReferences: U, assetLocations: U, gitRepository: U, productionUrl: U,
  coverImage: U, coverSourceScreens: U, coverProvenance: U, coverSources: U,
  portfolioVisibility: "visible",
  demoUrl: U, relatedDocumentation: U, relatedBlogPosts: U, relatedResearch: U,
  relatedPrompts: U, relatedAiWorkflows: U, relatedMethods: U, filesBelonging: U,
};

const score = (businessContext, technicalDepth, designDocumentation, screenshots, deployment, lessonsLearned, architecture, seo, performance, maintainability) => ({
  businessContext, technicalDepth, designDocumentation, screenshots, deployment,
  lessonsLearned, architecture, seo, performance, maintainability,
});
const priority = (businessValue, technicalComplexity, portfolioValue, educationalValue) => ({
  businessValue, technicalComplexity, portfolioValue, educationalValue,
});
const project = (data) => {
  const merged = { ...defaults, ...data };
  merged.documentationScore = Object.values(merged.documentationBreakdown).reduce((a, b) => a + b, 0);
  merged.priorityScore = Object.values(merged.priorityBreakdown).reduce((a, b) => a + b, 0);
  return merged;
};

const projects = [
  project({
    projectName: "BRKUNLUER.SITE", slug: "brkunluer-site", aliases: ["brkunluer.site", "BRKUNLUER.SITE-KAYNAK"],
    client: "Burak Ünlüer", industry: "Kişisel marka / bilgi ürünleri", projectType: "Kişisel marka, portföy ve bilgi merkezi", categories: ["Personal Brand", "Portfolio", "Educational"],
    currentStatus: "Yerel uygulama aktif geliştirmede; üretim URL'si yapılandırılmış, bu taramada canlı erişim doğrulanamadı.", timeline: "2026-08-02: mevcut Git geçmişindeki doğrulanabilen ilk ve son commit.",
    purpose: "Türkçe kişisel marka, projeler, makaleler, yöntemler ve dijital ürünleri tek sitede toplamak.", problemBeingSolved: "Dağınık profesyonel üretimi yayınlanabilir ve aranabilir bir bilgi mimarisinde birleştirmek.",
    targetUsers: ["Potansiyel müşteriler", "İşverenler", "Geliştiriciler", "Dijital ürün alıcıları"], businessGoals: ["Portföy görünürlüğü", "Uzmanlık kanıtı", "İçerik ve ürün dağıtımı"],
    technologyStack: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "MDX", "Zod", "Vercel Analytics"], frameworks: ["Next.js App Router", "React"], backend: "Next.js Route Handlers", database: "V1 yerel MDX; newsletter yerel saklama", hosting: "Vercel planı; Cloudflare DNS kararı", cms: "Git tabanlı MDX",
    integrations: ["Vercel Analytics", "Provider-bağımsız newsletter ve ödeme arayüzleri"], designSystem: "globals.css içindeki CSS değişkenleri ve Tailwind @theme inline", brandLanguage: "Türkçe; editoryal, doğrudan ve teknik", colorPalette: "CSS tasarım tokenlarında tanımlı", typography: "Geist",
    responsiveStrategy: "Mobil ve masaüstü App Router sayfaları; ayrıntı mevcut uygulama stillerinde.", seoStrategy: "Site config, metadata, robots ve sitemap; içerik tabanlı bilgi mimarisi.", performanceOptimizations: "Server Components varsayılanı ve yerel MDX okuma.", accessibilityNotes: "Repo belgelerinde kısmi QA kaydı var; tam güncel denetim Unknown.",
    majorFeatures: ["Proje vitrini", "Makaleler", "Yöntem/ürün sayfaları", "Etiket filtreleme", "İletişim ve newsletter akışları"], pages: ["/", "/projeler", "/makaleler", "/yontemler", "/hakkimda", "/iletisim"],
    architecture: "App Router; Server Components varsayılan; içerik lib/content.ts üzerinden MDX dosyalarından yüklenir.", interestingTechnicalDecisions: ["V1'de arama ve auth yok", "CMS yerine depo içi MDX", "Site kimliği lib/site.ts içinde tek kaynak"],
    developmentChallenges: "Gerçek portföy kanıtı az olduğu için uydurma içerikten kaçınma ve kaynakları birleştirme.", lessonsLearned: "Build/lint tek başına yayın ve tarayıcı doğrulaması değildir.", screenshotsReferences: ["public/images/projects/inkos-*.png", "public/images/covers"], assetLocations: ["public/images", "public/brand"],
    gitRepository: "https://github.com/Hitbullets/brkunluer.site.git", productionUrl: "https://brkunluer.site", relatedDocumentation: ["docs/OVERVIEW.md", "docs/ARCHITECTURE.md", "docs/CONTENT_GUIDE.md"],
    relatedBlogPosts: ["content/articles/ai-factory-planning-stack.md", "content/articles/ai-is-akislari-neden.md", "content/articles/prompt-muhendisligi-rehberi.md"], relatedAiWorkflows: ["AI Factory Planning Stack"], relatedMethods: ["AI Factory System", "AI Workflow Templates", "Prompt Engineering Kit"],
    filesBelonging: ["app", "components", "content", "docs", "lib", "public", "package.json", "next.config.ts"], sourceIds: ["S001", "S002", "S003", "S004", "S005", "S006"],
    documentationBreakdown: score(10,9,8,6,5,7,10,9,8,9), priorityBreakdown: priority(22,21,25,24),
  }),
  project({
    projectName: "CAU INK", slug: "cau-ink", aliases: ["CAUINK v1", "CAU INK redesign", "CAU INK Gallery v2", "CAU_INK_STITCH", "CAU_INK_WHITE_DEMO", "CAU_INK_MEDICAL", "Tattoo-Demo"],
    client: "CAU INK / Ahsen", industry: "Dövme, piercing ve lazer dövme silme", projectType: "Kurumsal stüdyo sitesi ve galeri", categories: ["Tattoo Studio", "Corporate Website", "Portfolio"],
    currentStatus: "Üretim sitesi 2026-08-02 web taramasında erişildi; yerel klasörlerde birden fazla tarihsel yeniden tasarım bulunuyor.", timeline: "2022: canlı sitede marka başlangıcı; 2026: statik, Stitch/Next.js ve Gallery v2 revizyonları.",
    purpose: "CAU INK hizmetlerini, sanatçı kimliğini, galeriyi ve randevu akışını sunmak.", problemBeingSolved: "Yerel stüdyonun güven, hijyen, uzmanlık ve iş kalitesi sinyallerini dijital randevu talebine dönüştürmek.",
    targetUsers: ["Balıkesir'de dövme arayanlar", "Piercing müşterileri", "Lazer dövme silme müşterileri"], businessGoals: ["Randevu talebi", "Yerel görünürlük", "Portföy sergileme", "Güven oluşturma"],
    technologyStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Three.js / React Three Fiber", "Vercel Blob"], frameworks: ["Next.js", "React", "GSAP sahne sistemi"], backend: "Next.js Route Handlers ve form akışı; ayrıntı revizyona göre değişiyor", database: U, hosting: "Tarihsel Netlify yapılandırması; güncel uygulamada Vercel/Vercel Blob belgeleri", cms: "Dosya ve varlık tabanlı",
    integrations: ["WhatsApp", "Google yorumları", "Vercel Blob"], designSystem: "Sahne bazlı sinematik sistem; koyu galeri ve medikal güven varyantları", brandLanguage: "Türkçe; sanatsal, güven veren, hijyen ve kişiselleştirme odaklı", colorPalette: "Revizyona göre siyah/beyaz/krem ve vurgu tonları; kesin kanonik token seti Unknown", typography: "Revizyona göre değişiyor; kanonik seçim Unknown",
    responsiveStrategy: "Sabit sahne/slayt yaklaşımı ile wheel, touch ve klavye girdileri; mobil varlık kırpma planları.", seoStrategy: "Yerel hizmet sayfaları, Balıkesir odaklı metadata, alt metin, robots/sitemap ve blog çalışmaları.", performanceOptimizations: ["Vercel Blob varlık göçü", "Görsel/video optimizasyonu", "Sahne bazlı lazy çalışma"], accessibilityNotes: "Reduced-motion ve gerçek tarayıcı doğrulaması belgelerde açık iş olarak geçiyor.",
    majorFeatures: ["Hizmet sunumu", "Sanatçı hikâyesi", "Filtreli galeri", "Randevu formu", "WhatsApp", "SSS", "Sinematik sahneler"], pages: ["Ana sayfa", "Galeri", "Hizmet detayları", "Gizlilik", "Kullanım şartları"],
    architecture: "Revizyonlar tek kanonik proje altında: statik/Netlify döneminden Next.js sahne mimarisine ve Gallery v2 SSR/edge denemelerine.", interestingTechnicalDecisions: ["Sabit slideshow navigasyonu", "Scene registry", "DOM + WebGL katmanları", "Gerçek varlıklarla AI destek görsellerini ayırma"],
    developmentChallenges: ["iOS Safari ve hareket azaltma doğrulaması", "R3F çalışma zamanı uyumluluğu", "Yüksek hacimli görsel/video arşivi"], lessonsLearned: "Derleme başarısı, WebGL ve sahne akışının gerçek tarayıcıda çalıştığını tek başına kanıtlamaz.",
    screenshotsReferences: ["DEMO-WORKS/CAUINK-DEMO/001.png", "CAU_INK_STITCH/public", "Konsept Görseller"], assetLocations: [sources.S014.path, `${workspace}\\brkunluer.pro\\CAU_INK_STITCH\\public`, `${workspace}\\brkunluer.pro\\Konsept Görseller`],
    gitRepository: "https://github.com/Hitbullets/cau-ink-gallery.git", productionUrl: "https://cauink.com", relatedDocumentation: [sources.S010.path, sources.S011.path, `${workspace}\\brkunluer.pro\\CAU_INK\\SEO.md`], relatedResearch: "Yerel SEO ve rakip/marka araştırmaları proje klasörlerinde dağınık.", relatedPrompts: "Stitch ve sahne üretim promptları CAU_INK_STITCH ve yeniden tasarım klasörlerinde.", relatedAiWorkflows: ["Stitch ekran üretimi", "Higgsfield görsel/video üretimi"], relatedMethods: ["Scene Bible", "Sabit slideshow uygulaması"],
    filesBelonging: [sources.S010.path, sources.S015.path, `${workspace}\\brkunluer.pro\\CAU_INK_MEDICAL`, `${workspace}\\brkunluer.pro\\CAU_INK_WHITE_DEMO`, `${workspace}\\HIGGSFIELD SUPERCOMPUTER\\cauink-gallery`, sources.S014.path, `${workspace}\\REDESING ÇALIŞMALAR\\CAU_INK_REDESING-1`], sourceIds: ["S010", "S011", "S012", "S013", "S014", "S015"],
    documentationBreakdown: score(10,10,10,10,9,8,10,10,8,9), priorityBreakdown: priority(25,25,25,24),
  }),
  project({
    projectName: "SalonIQ", slug: "saloniq", aliases: ["222les", "SalonIQ Kasa", "SalonIQ Staging", "Saloniq APP Yedekler"], client: "Salon işletmeleri için ürün", industry: "Güzellik ve salon yönetimi", projectType: "Çok kiracılı SaaS", categories: ["SaaS", "Internal Tool", "Corporate Product"],
    currentStatus: "Yerel kanonik belgede v2.2.90 MVP ve production kaydı var; dışarıdan güncel canlı doğrulama yapılamadı.", timeline: "2026-03: deployment belgesinde v2.2.90; sonraki T2/T3 dalgaları belgeli.", purpose: "Salonların randevu, müşteri, üyelik, stok, ödeme ve raporlama süreçlerini tek üründe yönetmek.", problemBeingSolved: "Parçalı salon operasyonlarını çok kiracılı, izlenebilir bir SaaS akışında birleştirmek.",
    targetUsers: ["Salon sahipleri", "Çalışanlar", "Müşteriler", "Platform yöneticileri"], businessGoals: ["Abonelik geliri", "Operasyon verimliliği", "Online rezervasyon", "Ödeme ve stok kontrolü"], technologyStack: ["React", "TypeScript", "Vite", "Node.js", "Express", "Supabase PostgreSQL", "RLS", "PayTR", "PWA", "Sentry"], frameworks: ["React/Vite", "Express"], backend: "Node.js/Express", database: "Supabase PostgreSQL; Row Level Security", hosting: "Belgeli yapı: Netlify frontend, Render backend, Supabase veri katmanı", cms: U,
    integrations: ["PayTR", "Supabase Realtime", "Sentry", "OCR/NLP ve AI hazırlıkları"], designSystem: "Uygulama ve landing bileşenleri; ayrıntılı token özeti Unknown", brandLanguage: "Türkçe SaaS ve operasyon dili", colorPalette: U, typography: U, responsiveStrategy: "Web uygulaması, public booking ve PWA akışları; ayrıntı kaynak kodda.", seoStrategy: "Public landing/booking bağlamı var; tam strateji Unknown", performanceOptimizations: ["Monorepo ayrımı", "Realtime + polling yedeği"], accessibilityNotes: U,
    majorFeatures: ["Randevu", "Müşteri/üyelik", "Kasa", "Stok", "Online rezervasyon", "Ödeme", "Raporlama", "Çoklu tenant", "Admin"], pages: ["Uygulama paneli", "Public booking", "Landing", "Admin"], architecture: "Frontend, server, landing ve araç paketlerinden oluşan monorepo; Supabase RLS ile tenant sınırı.", interestingTechnicalDecisions: ["Gerçek zamanlı değişiklikler için Supabase + polling yedeği", "PayTR ödeme katmanı", "Sürüm ve dalga bazlı kanonik dokümantasyon"], developmentChallenges: ["Çok kiracılı veri izolasyonu", "Ödeme güvenliği", "Stok-kasa tutarlılığı"], lessonsLearned: "Operasyonel durum, sürüm ve deployment kaydı tek kanonik belgede tutulmalı.", screenshotsReferences: `${workspace}\\brkunluer.pro\\SALONIQ_APP\\docs ve uygulama varlıkları`, assetLocations: [`${workspace}\\brkunluer.pro\\SALONIQ_APP`, `${workspace}\\brkunluer.pro\\Saloniq APP Yedekler`], gitRepository: ["https://github.com/Hitbullets/SALONIQ.git", "https://github.com/Hitbullets/Saloniq-Stagging.git"], productionUrl: "https://saloniq.app (yerel deployment belgesinde; canlı doğrulama Unknown)", demoUrl: "https://app.saloniq.app (yerel deployment belgesinde; canlı doğrulama Unknown)", relatedDocumentation: [sources.S020.path, sources.S021.path], relatedAiWorkflows: "AI/OCR/NLP hazırlıkları belgeli; üretim işlev durumu Unknown", filesBelonging: [sources.S020.path, sources.S023.path, `${workspace}\\brkunluer.pro\\_SalonIQ_Archive`, `${workspace}\\brkunluer.pro\\Saloniq APP Yedekler`], sourceIds: ["S020", "S021", "S022", "S023"], documentationBreakdown: score(10,10,8,7,9,8,10,6,8,10), priorityBreakdown: priority(25,25,25,24),
  }),
  project({
    projectName: "InkOS", slug: "inkos", aliases: ["Ink-OS", "InkOS One"], client: "Bağımsız ürün", industry: "Tattoo teknolojisi / üretken yapay zekâ", projectType: "AI destekli web ürünü", categories: ["AI Product", "SaaS", "Tattoo Studio"],
    currentStatus: "Haziran 2026 temel dokümanında çekirdek kod öncesi aşama; BRKUNLUER.SITE anlatısında çalışan MVP iddiası var. Çelişki çözülmedi ve güncel üretim doğrulanamadı.", timeline: "2026-06: dokümantasyon ve Phase -1 tamamlandı; sonraki MVP anlatısının tarihi Unknown.", purpose: "Kullanıcıların dövme fikrini görsel tasarıma ve stencil çıktısına dönüştürmesini sağlamak.", problemBeingSolved: "Dövme fikri keşfi, prompt geliştirme ve sanatçıya aktarılabilir stencil üretimini tek akışta toplamak.", targetUsers: ["Dövme yaptırmak isteyenler", "Dövme sanatçıları"], businessGoals: ["B2C tasarım üretimi", "Sonraki aşamada sanatçı araçları", "Kredi/abonelik geliri"],
    technologyStack: ["Plan: Next.js, TypeScript, Tailwind, shadcn/ui, Neon, Drizzle, Auth.js, Replicate, R2, Vercel, PostHog, Sentry, Stripe", "Portföy anlatısı: React, Python servisleri, Google OAuth, Claude, OpenAI görsel modeli, tarayıcı Sobel"], frameworks: ["Next.js planı", "React anlatısı"], backend: "Plan ve anlatı arasında doğrulanmamış fark: Next Route Handlers / Python servisleri", database: "Plan: Neon PostgreSQL; gerçek durum Unknown", hosting: "Plan: Vercel + Cloudflare R2; gerçek durum Unknown", cms: U, integrations: ["Google OAuth", "Claude", "OpenAI görsel üretimi", "Replicate planı", "PostHog landing"], designSystem: "Landing ve ürün belgelerinde ayrı tasarım akışları", brandLanguage: "Türkçe/uluslararası ürün dili; kanonik seçim Unknown", colorPalette: U, typography: U, responsiveStrategy: "Web tabanlı mobil/masaüstü ürün planı", seoStrategy: "Landing odaklı; ayrıntı Unknown", performanceOptimizations: "Tarayıcı tarafı stencil işleme portföy anlatısında", accessibilityNotes: U,
    majorFeatures: ["Prompt geliştirme", "AI görsel üretimi", "Stencil", "Galeri/geçmiş", "Kredi sistemi planı", "Waitlist landing"], pages: ["Landing", "Üretim stüdyosu", "Galeri/geçmiş", "Hesap"], architecture: "Dokümantasyon kökü ile ayrı landing uygulaması; planlanan ürün katmanları ve AI sağlayıcı soyutlaması.", interestingTechnicalDecisions: ["Sobel işlemini tarayıcıya taşıma anlatısı", "Sağlayıcıları değiştirilebilir tutma planı"], developmentChallenges: ["Planlanan ve uygulandığı iddia edilen yığın arasındaki çelişki", "Görsel maliyeti ve güvenlik", "Stencil kalitesi"], lessonsLearned: "Plan, landing ve gerçek ürün çalışma durumları ayrı kanıtlanmalı.", screenshotsReferences: ["BRKUNLUER.SITE/public/images/projects/inkos-*.png"], assetLocations: [`${workspace}\\Ink-OS`, `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\public\\images\\projects`], gitRepository: "https://github.com/Hitbullets/InkOS.git", productionUrl: "https://www.inkosone.com (portföy frontmatter'ında; canlı doğrulama Unknown)", relatedDocumentation: [sources.S030.path, sources.S031.path, sources.S032.path], relatedResearch: "LoRA/ControlNet planı ARQEN STUDIO/PLAN MD DOSYALARI altında", relatedPrompts: "Ürün ve görsel iş akışı promptları Ink-OS docs ve ARQEN planlarında", relatedAiWorkflows: ["Claude prompt geliştirme", "OpenAI/Replicate görsel üretimi", "LoRA/ControlNet araştırması"], relatedMethods: ["AI Factory Planning Stack ile ilişki yalnız genel süreç düzeyinde; doğrudan proje bağı Unknown"], filesBelonging: [sources.S033.path, `${workspace}\\ARQEN STUDIO\\PLAN MD DOSYALARI\\InkOS-LoRA-ControlNet-Plan.md`, `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\content\\projects\\inkos.mdx`], sourceIds: ["S005", "S030", "S031", "S032", "S033"], documentationBreakdown: score(9,9,8,8,3,7,9,6,7,8), priorityBreakdown: priority(24,25,25,25),
  }),
  project({
    projectName: "AI Factory OS", slug: "ai-factory-os", aliases: ["AI Factory", "AI Factory Planning Stack"], client: "Bağımsız ürün / geliştirici işletim sistemi", industry: "AI destekli yazılım geliştirme", projectType: "İç ürün ve süreç platformu", categories: ["AI Product", "Internal Tool", "Educational", "Open Source"], currentStatus: "MVP kapsamı ve mimari belgeli; yerel uygulama/dokümantasyon mevcut. Üretim yayın durumu Unknown.", timeline: "2026-07-22: kanonik MVP kapsamı güncellemesi; sonraki yerel geliştirme kayıtları mevcut.", purpose: "Fikirden araştırma, ürün tanımı ve mimari öneriye kadar ajanlı iş akışını insan onayıyla yönetmek.", problemBeingSolved: "AI ile ürün geliştirirken bağlam kaybı, plansız kodlama ve doğrulanamayan kararlar.", targetUsers: ["Bağımsız geliştiriciler", "Ürün ekipleri", "AI ajanlarıyla çalışan ekipler"], businessGoals: ["Tekrarlanabilir teslimat", "Karar izlenebilirliği", "Daha düşük üretim maliyeti"], technologyStack: "TypeScript tabanlı workspace ve web/iş akışı bileşenleri; kesin güncel manifest ayrıntıları kaynakta", frameworks: "Repo manifestleri ve docs; tek cümlelik kanonik framework özeti Unknown", backend: "Modüler monolit ve iş akışı/olay katmanı belgeleri", database: "Yerel geliştirme veri katmanı belgeli; üretim veritabanı kararı Unknown", hosting: U, cms: "GitHub kanonik dokümantasyon", integrations: "Ajanlar, approval gate ve dokümantasyon senkronizasyonu", designSystem: U, brandLanguage: "Mimari ve ürün sözleşmesi dili", colorPalette: U, typography: U, responsiveStrategy: U, seoStrategy: U, performanceOptimizations: "Transactional outbox ve kontrollü iş akışı kararları belgelerde", accessibilityNotes: U, majorFeatures: ["Fikir girişi", "Araştırma özeti", "MVP spec", "Mimari öneri", "İnsan onay kapısı", "Operasyonel kanıt"], pages: ["/factory yerel dilim", "Dokümantasyon kayıtları"], architecture: "Karar → Sözleşme → Uygulama → Doğrulama Kanıtı → Operasyonel Durum zinciri; modüler monolit yaklaşımı.", interestingTechnicalDecisions: ["GitHub kanonik, Notion teslimat kaydı", "İnsan onayı olmadan mimari ilerlememe", "Transactional outbox"], developmentChallenges: ["Ajanlar arası bağlam ve durum tutarlılığı", "Belge ile kodun senkron kalması"], lessonsLearned: "Mimari karar, uygulama ve çalışma kanıtı aynı teslim zincirinde tutulmalı.", screenshotsReferences: U, assetLocations: `${workspace}\\brkunluer.pro\\AI-FACTORY-OS`, gitRepository: "https://github.com/Hitbullets/ai-factory-os.git", relatedDocumentation: [sources.S040.path, sources.S041.path, sources.S042.path], relatedBlogPosts: ["content/articles/ai-factory-planning-stack.md"], relatedResearch: "Araştırma özeti MVP çıktısı olarak tanımlı", relatedPrompts: "Ajan rol ve iş akışı talimatları repo belgelerinde", relatedAiWorkflows: ["Idea → Research → Product → Human Approval → Architecture"], relatedMethods: ["AI Factory System", "AI Workflow Templates"], filesBelonging: [`${workspace}\\brkunluer.pro\\AI-FACTORY-OS`, `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\content\\articles\\ai-factory-planning-stack.md`, `${workspace}\\brkunluer.pro\\BRKUNLUER.SITE\\content\\methods\\ai-factory-system.mdx`], sourceIds: ["S040", "S041", "S042", "S005"], documentationBreakdown: score(10,9,6,2,3,9,10,2,7,10), priorityBreakdown: priority(23,25,25,25),
  }),
  project({
    projectName: "AdresModa", slug: "adres-moda", aliases: ["Adress_Moda", "addressmoda.com"], client: "İbrahim / AdresModa", industry: "Erkek giyim perakendesi", projectType: "E-ticaret sitesi", categories: ["E-commerce", "Corporate Website"], currentStatus: "Teklif, kurulum rehberi, tema planı ve ürün/varlık dosyaları mevcut; üretim tamamlanması ve canlı site Unknown.", timeline: "2026-03: yol haritası; 2026-04: Clotya tema uygulama planı.", purpose: "Balıkesir'deki fiziksel erkek giyim mağazasını çevrimiçi satış kanalına taşımak.", problemBeingSolved: "Ürün kataloğu, ödeme, kargo, WhatsApp iletişimi ve yerel/ürün SEO'sunu tek mağazada kurmak.", targetUsers: ["Erkek giyim müşterileri", "Balıkesir yerel müşterileri", "Türkiye geneli çevrimiçi alıcılar"], businessGoals: ["Online satış", "Yerel mağaza görünürlüğü", "Katalog yönetimi", "Dönüşüm ölçümü"], technologyStack: ["WordPress", "WooCommerce", "Elementor", "Clotya", "Rank Math"], frameworks: "WordPress tema/eklenti ekosistemi", backend: "WordPress/PHP", database: "WordPress veritabanı; sağlayıcı ayrıntısı Unknown", hosting: "Hostinger Business planı", cms: "WordPress", integrations: ["WooCommerce", "DHL eCommerce", "AkBank/iyzico planı", "WhatsApp API", "GA4", "Search Console"], designSystem: "Clotya v2 tema uyarlaması", brandLanguage: "Türkçe; güvenilir, premium erkek giyim", colorPalette: ["#1A2B4A", "#C9A84C", "kırık beyaz tonları"], typography: ["Open Sans", "Playfair Display", "Raleway"], responsiveStrategy: "Masaüstünde dört, mobilde iki kolon ürün ızgarası; tema responsive uyarlaması.", seoStrategy: ["Rank Math", "Ürün ve yerel şema", "Search Console", "GA4", "kategori/ürün içerikleri"], performanceOptimizations: "Tema ve görsel optimizasyon kontrol listeleri; tamamlanma kanıtı Unknown", accessibilityNotes: U, majorFeatures: ["Ürün kataloğu", "Sepet/ödeme", "Kargo", "WhatsApp", "Blog", "Kampanyalar"], pages: ["Ana sayfa", "Mağaza", "Kategori", "Ürün", "Sepet", "Ödeme", "Hakkımızda", "İletişim", "Blog", "Yasal sayfalar"], architecture: "WordPress + WooCommerce + ticari tema/eklenti tabanlı e-ticaret.", interestingTechnicalDecisions: ["Opsiyon C / Hostinger Business seçimi", "Clotya temasını marka tokenlarıyla uyarlama"], developmentChallenges: ["Ürün verisi ve görseller", "Ödeme/kargo entegrasyonu", "Kaynak belgede hassas bilgi bulunması"], lessonsLearned: "Teklif belgesi, uygulama kararı ve gerçek yayın kanıtı birbirinden ayrı tutulmalı; kaynaklardaki hassas bilgi yayımlanmamalı.", screenshotsReferences: `${workspace}\\Adress_Moda içindeki tema ve ürün görselleri`, assetLocations: [sources.S053.path], gitRepository: U, productionUrl: "https://adresmoda.com (belgeli hedef; canlı doğrulama Unknown)", relatedDocumentation: [sources.S050.path, sources.S051.path, sources.S052.path], relatedResearch: "Tema ve e-ticaret operasyon araştırması yol haritalarında", relatedPrompts: U, relatedAiWorkflows: U, relatedMethods: ["WordPress/WooCommerce kurulum kontrol listesi"], filesBelonging: [sources.S050.path, sources.S051.path, sources.S052.path, sources.S053.path], sourceIds: ["S050", "S051", "S052", "S053"], documentationBreakdown: score(10,7,9,9,4,7,7,10,6,8), priorityBreakdown: priority(24,18,22,20),
  }),
  project({
    projectName: "Mr. Pisi", slug: "mr-pisi", aliases: ["Mr.Pisi Kedi Kumu", "mr-pisi-web"], client: "Mr. Pisi", industry: "Evcil hayvan ürünleri", projectType: "Marka ve ürün landing sitesi", categories: ["Corporate Website", "Landing Page"], currentStatus: "Üç yerel Vite varyantı ve kapsamlı marka arşivi mevcut; web indeksinde site başlığı görüldü, güncel işlev ve yayın sürümü doğrulanmadı.", timeline: "2026: marka/dijital durum ve yayın kontrol listeleri; kesin tarih aralığı Unknown.", purpose: "Premium kedi kumu markasını ve ürün faydalarını tek sayfalı modern deneyimle sunmak.", problemBeingSolved: "Yeni markanın güven, hijyen, ürün farkı ve iletişim sinyallerini dijitalde kurmak.", targetUsers: ["Kedi sahipleri", "Evcil hayvan ürünü alıcıları", "Bayiler"], businessGoals: ["Marka bilinirliği", "Ürün talebi", "İletişim/form dönüşümü", "SEO hazırlığı"], technologyStack: ["React 18", "Vite 5", "TypeScript 5", "Tailwind CSS 3", "Google GenAI SDK"], frameworks: ["React", "Vite"], backend: "Statik/SPA; form ve AI servis bağlantısı belgelerde açık iş", database: U, hosting: "Vercel SPA rewrite yapılandırması", cms: U, integrations: ["Google GenAI", "Planlanan form/e-posta sağlayıcısı", "Analytics planı"], designSystem: "Premium marka ve ambalaj varlıkları", brandLanguage: "Türkçe; premium, hijyen ve modernlik odaklı", colorPalette: "Marka dosyalarında; kanonik kod listesi Unknown", typography: U, responsiveStrategy: "Tek sayfa responsive React deneyimi", seoStrategy: ["Product/LocalBusiness JSON-LD", "Open Graph", "sitemap", "robots", "Search Console"], performanceOptimizations: ["WebP planı", "Görsel optimizasyon kontrol listesi"], accessibilityNotes: "Alt metin kontrol listesinde; tamamlanma durumu Unknown", majorFeatures: ["Ürün tanıtımı", "Fayda anlatımı", "AI kedi bakım asistanı", "İletişim/form", "Marka hikâyesi"], pages: ["Tek sayfa landing"], architecture: "Vite tabanlı React SPA; üç yerel tasarım varyantı tek kanonik projede birleşti.", interestingTechnicalDecisions: ["Vercel SPA rewrite", "AI asistanı marka deneyimine ekleme"], developmentChallenges: ["Gerçek ürün görsellerinin tamamlanması", "Form ve KVKK", "Varyantlar arasında kanonik sürüm seçimi"], lessonsLearned: "Marka/ambalaj hazırlığı ile web yayına hazırlığı ayrı ilerliyor; durum belgesi bunu görünür kılıyor.", screenshotsReferences: `${workspace}\\Mr.Pisi Kedi Kumu içindeki ekran ve ambalaj görselleri`, assetLocations: [sources.S060.path], gitRepository: U, productionUrl: "https://www.mrpisi.com", relatedDocumentation: [sources.S061.path, sources.S062.path], relatedResearch: "Ürün/marka ve SEO kontrol listeleri", relatedPrompts: U, relatedAiWorkflows: "Google GenAI tabanlı kedi bakım asistanı", relatedMethods: U, filesBelonging: [sources.S060.path, sources.S061.path, sources.S062.path], sourceIds: ["S060", "S061", "S062", "S063"], documentationBreakdown: score(9,7,9,10,4,6,6,9,7,6), priorityBreakdown: priority(22,17,22,18),
  }),
  project({
    projectName: "SatışMetni AI", slug: "satis-metni-ai", aliases: ["FABLE-MONEY-SYSTEM", "e-ticaret-asistan"], client: "Bağımsız ürün", industry: "E-ticaret ve içerik üretimi", projectType: "Türkçe AI SaaS", categories: ["SaaS", "AI Product"], currentStatus: "Yerel Next.js uygulama, API, admin, veritabanı ve ödeme dosyaları mevcut; üretim yayını Unknown.", timeline: "2026: Plan, Stitch planı ve Phase 2 belgeleri; kesin başlangıç/bitiriş Unknown.", purpose: "E-ticaret satıcıları için Türkçe ürün ve satış metinlerini yapay zekâ ile üretmek.", problemBeingSolved: "Yüksek hacimli ürün kataloglarında tutarlı ve dönüşüm odaklı Türkçe metin üretme maliyeti.", targetUsers: ["E-ticaret satıcıları", "Pazarlama ekipleri", "Ajanslar"], businessGoals: ["Abonelik/kredi geliri", "Toplu içerik üretimi", "Kullanıcı edinimi"], technologyStack: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS", "Neon PostgreSQL", "Drizzle", "Vercel AI Gateway", "Resend", "PayTR"], frameworks: ["Next.js", "React"], backend: "Next.js Route Handlers", database: "Neon PostgreSQL / Drizzle", hosting: "Vercel yapılandırması; gerçek yayın Unknown", cms: "Uygulama içi blog/admin", integrations: ["Vercel AI Gateway", "Resend", "PayTR", "CSV içe aktarma"], designSystem: "StitchPlan ve uygulama bileşenleri", brandLanguage: "Türkçe; satış ve dönüşüm odaklı", colorPalette: "StitchPlan/uygulama stillerinde; özet kodlar Unknown", typography: U, responsiveStrategy: "SaaS dashboard ve pazarlama sayfaları", seoStrategy: "Blog ve çözüm sayfaları; tam strateji Unknown", performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["Metin üretimi", "Toplu CSV", "Admin", "Blog", "Çözüm sayfaları", "Fiyatlandırma", "Abonelik", "Referans sistemi"], pages: ["Landing", "Dashboard", "Admin", "Blog", "Çözümler", "Fiyatlandırma"], architecture: "Tek Next.js uygulamasında pazarlama, üretim API'leri, admin, veri ve ödeme katmanları.", interestingTechnicalDecisions: ["FABLE klasör adını ürün adı SatışMetni AI altında birleştirme", "Sağlayıcı geçidi üzerinden AI kullanımı"], developmentChallenges: ["Üretim kalitesi", "Kredi/abonelik ve ödeme", "Toplu işlem maliyeti"], lessonsLearned: "Klasör kod adı ile ürün markası kanonik arşivde ayrı alias olarak tutulmalı.", screenshotsReferences: `${workspace}\\ARQEN STUDIO\\FABLE-MONEY-SYSTEM içindeki Stitch çıktıları`, assetLocations: `${workspace}\\ARQEN STUDIO\\FABLE-MONEY-SYSTEM\\public`, gitRepository: "https://github.com/Hitbullets/e-ticaret-asistan.git", productionUrl: U, relatedDocumentation: [sources.S070.path, `${workspace}\\ARQEN STUDIO\\FABLE-MONEY-SYSTEM\\PHASE2-PLAN.md`, `${workspace}\\ARQEN STUDIO\\FABLE-MONEY-SYSTEM\\StitchPlan.md`], relatedResearch: "E-ticaret içerik ve fiyatlandırma planları", relatedPrompts: "Ürün metni üretim promptları Plan ve uygulama içinde", relatedAiWorkflows: ["AI ürün açıklaması ve satış metni üretimi"], relatedMethods: U, filesBelonging: [sources.S071.path], sourceIds: ["S070", "S071"], documentationBreakdown: score(9,9,8,6,3,6,8,7,5,8), priorityBreakdown: priority(24,23,24,23),
  }),
  project({
    projectName: "Gold Tracker", slug: "gold-tracker", aliases: ["Altın Fiyat ve Portföy Takip Uygulaması"], client: "Bağımsız ürün", industry: "Finansal takip", projectType: "Mobil öncelikli PWA", categories: ["SaaS", "Finance", "Experimental"], currentStatus: "Yerel tam uygulama ve README'de Vercel yayın kaydı mevcut; URL bu taramada canlı doğrulanamadı.", timeline: "2026: sıfır bütçeli MVP planı ve uygulama; kesin commit tarihçesi yerel Git nesnelerinden okunamadı.", purpose: "Türkiye altın fiyatlarını ve kişisel alım-satım portföy performansını takip etmek.", problemBeingSolved: "Kullanıcının gerçek işlem maliyetleriyle güncel/son doğrulanmış fiyatları dürüstçe birleştiren portföy görünümü eksikliği.", targetUsers: ["Türkiye'deki altın yatırımcıları", "Kişisel portföy takip kullanıcıları"], businessGoals: ["Ücretsiz MVP doğrulaması", "PWA kullanımı", "Güvenilir fiyat sunumu"], technologyStack: ["Next.js 13", "TypeScript", "Tailwind CSS", "shadcn/ui", "MongoDB", "Better Auth", "Zod", "Recharts", "web-push"], frameworks: ["Next.js App Router", "React"], backend: "Next.js API ve cron işleri", database: "MongoDB Atlas Free", hosting: "Vercel Hobby", cms: U, integrations: ["Çoklu fiyat sağlayıcı adaptörleri", "Vercel Cron", "Web Push"], designSystem: "shadcn/ui + Radix", brandLanguage: "Türkçe; finansal doğruluk ve şeffaflık", colorPalette: U, typography: U, responsiveStrategy: "Mobile-first PWA, alt navigasyon ve safe-area desteği", seoStrategy: "Landing metadata; ayrıntı Unknown", performanceOptimizations: ["15–60 saniye dinamik polling", "Son doğrulanmış fiyat önbelleği", "Sağlayıcı fallback"], accessibilityNotes: U, majorFeatures: ["7 altın türü", "Fiyat durumu rozetleri", "İşlem kaydı", "Ortalama maliyet", "Kâr/zarar", "PWA", "Push bildirim"], pages: ["Landing", "Dashboard", "Fiyatlar", "Portföy", "İşlemler", "Ayarlar"], architecture: "Sağlayıcı adaptörleri + doğrulama/yedek kaynak + son başarılı fiyat önbelleği; kullanıcı işlem verisi ayrı.", interestingTechnicalDecisions: ["Eski veriyi anlık diye göstermeme kuralı", "Sıfır bütçeli çoklu sağlayıcı", "Teorik fiyatı etiketleme"], developmentChallenges: ["Ücretsiz kaynakların kota/SLA riski", "Finansal veri güncelliği", "Push ve auth"], lessonsLearned: "Finans uygulamasında fiyatın kaynağı, piyasa zamanı ve doğrulama zamanı birlikte gösterilmeli.", screenshotsReferences: "README ekran görüntülerini yakında olarak işaretliyor; mevcut ekran görüntüsü Unknown", assetLocations: `${workspace}\\brkunluer.pro\\FİKİR\\GOLD TRACKER\\public`, gitRepository: "https://github.com/Hitbullets/gold-tracker.git", productionUrl: "https://gold-tracker-rouge.vercel.app (README'de; canlı doğrulama Unknown)", relatedDocumentation: [sources.S080.path, sources.S081.path], relatedResearch: "Altın fiyat sağlayıcıları ve veri güncellik araştırması Plan.md içinde", relatedPrompts: U, relatedAiWorkflows: U, relatedMethods: ["Provider adapter ve dürüstlük kuralı"], filesBelonging: [sources.S082.path], sourceIds: ["S080", "S081", "S082"], documentationBreakdown: score(10,9,7,2,6,8,9,4,9,8), priorityBreakdown: priority(22,23,23,25),
  }),
  project({
    projectName: "Takipler Store", slug: "takipler-store", aliases: ["takipler.store"], client: "Bağımsız ürün", industry: "Sosyal medya servisleri", projectType: "Sipariş ve servis paneli", categories: ["SaaS", "Internal Tool"], currentStatus: "Yerel Next.js uygulama ve Vercel proje yapılandırması mevcut; production URL ve yayın doğrulaması Unknown.", timeline: "2026: dosya tarihleri ve Next.js 16.2.7 manifesti; kesin tarihçe Unknown.", purpose: "SMM servislerini listelemek, komisyon uygulamak ve siparişleri yönetmek.", problemBeingSolved: "Harici SMM paneli servislerini tek marka altında fiyatlandırma ve sipariş akışına dönüştürmek.", targetUsers: ["Sosyal medya hizmeti alıcıları", "Panel yöneticisi"], businessGoals: ["Komisyonlu servis satışı", "Sipariş takibi", "Bakiye görünürlüğü"], technologyStack: ["Next.js 16.2.7", "React 19.2.4", "TypeScript 5", "Tailwind CSS 4"], frameworks: ["Next.js App Router", "React"], backend: "Next.js /api/smm proxy", database: "LocalStorage ile sipariş/ayar saklama; kalıcı sunucu veritabanı Unknown", hosting: "Vercel proje yapılandırması", cms: U, integrations: ["SMM API"], designSystem: "Özel dashboard bileşenleri", brandLanguage: "Türkçe panel dili", colorPalette: "CSS değişkenlerinde koyu panel; tam token özeti Unknown", typography: "Syne sınıfı kodda; font kaynağı Unknown", responsiveStrategy: "Dashboard/sidebar düzeni; mobil doğrulama Unknown", seoStrategy: U, performanceOptimizations: "Servis listesini LocalStorage'da saklama", accessibilityNotes: U, majorFeatures: ["Dashboard", "Yeni sipariş", "Servis listesi", "Siparişler", "Komisyon ayarı", "Destek", "Bakiye"], pages: ["Tek uygulama kabuğunda altı panel görünümü"], architecture: "Client state + LocalStorage + Next.js API proxy.", interestingTechnicalDecisions: ["Komisyonun istemci ayarı olarak saklanması", "Servis/API durum göstergesi"], developmentChallenges: ["API kimlik bilgisi güvenliği", "Kalıcı sipariş verisi", "Hata görünürlüğü"], lessonsLearned: U, screenshotsReferences: U, assetLocations: `${workspace}\\brkunluer.pro\\Takipler-Store\\public`, gitRepository: U, productionUrl: U, relatedDocumentation: "README yalnız varsayılan Next.js metni; ürün belgesi Unknown", relatedPrompts: U, relatedAiWorkflows: U, relatedMethods: U, filesBelonging: [`${workspace}\\brkunluer.pro\\Takipler-Store`], sourceIds: ["S090", "S091", "S092"], documentationBreakdown: score(6,7,5,2,3,1,5,1,4,4), priorityBreakdown: priority(19,16,16,14),
  }),
  project({
    projectName: "3Dikili", slug: "3dikili", aliases: ["3dikili-demo", "3Demo"], client: "3Dikili (teklif/demo bağlamı)", industry: "Moda / e-ticaret", projectType: "E-ticaret UX demosu", categories: ["E-commerce", "Experimental", "Landing Page"], currentStatus: "Yerel responsive demo mevcut; kaynak belge gerçek backend ve e-ticaret işlevi olmadığını açıkça söylüyor.", timeline: "2026: demo ve teklif dosyaları; kesin tarih Unknown.", purpose: "WordPress/WooCommerce mağazası için ürün keşfi, filtreleme ve sepet deneyimini göstermek.", problemBeingSolved: "Teklif öncesinde mağaza bilgi mimarisi ve kullanıcı akışını somutlaştırmak.", targetUsers: ["Moda müşterileri", "Proje karar vericileri"], businessGoals: ["Teklif/demonstrasyon", "E-ticaret dönüşüm akışını göstermek"], technologyStack: ["React", "Vite", "TypeScript"], frameworks: ["React", "Vite"], backend: "Yok; demo", database: "Yok; demo", hosting: U, cms: "Hedef WordPress/WooCommerce; demoda yok", integrations: U, designSystem: "Ürün kartları, filtreler, detay ve sepet mockup'ı", brandLanguage: "Türkçe e-ticaret", colorPalette: U, typography: U, responsiveStrategy: "Responsive ürün ızgarası ve akışlar", seoStrategy: "Hedef mağaza için teklif düzeyinde; demoda Unknown", performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["Ürün kartı", "Filtre", "Ürün detay", "Mock sepet"], pages: ["Ana sayfa", "Ürün listeleme", "Ürün detay", "Sepet"], architecture: "Frontend-only Vite demosu.", interestingTechnicalDecisions: "Gerçek ticaret davranışı yerine açıkça demo sınırı koyma.", developmentChallenges: "Demo ile üretim kapsamını karıştırmama.", lessonsLearned: "Teklif demosunun yapamadıkları dokümantasyonda açık olmalı.", screenshotsReferences: `${workspace}\\brkunluer.pro\\3dikili-demo içindeki teklif/görsel ekleri`, assetLocations: `${workspace}\\brkunluer.pro\\3dikili-demo`, gitRepository: U, productionUrl: U, demoUrl: U, relatedDocumentation: [sources.S100.path], filesBelonging: [sources.S101.path], sourceIds: ["S100", "S101"], documentationBreakdown: score(8,5,7,6,1,6,5,3,3,5), priorityBreakdown: priority(17,12,17,16),
  }),
  project({
    projectName: "HERA BRAID Link-in-Bio", slug: "hera-braid", aliases: ["LINK-BIO", "Buse-HairBraid", "Buse Durmaz link page"], client: "Buse Durmaz / HERA BRAID", industry: "Saç örgüsü ve kişisel bakım", projectType: "Tek sayfa link-in-bio", categories: ["Personal Brand", "Landing Page"], currentStatus: "Yerel HTML/CSS/JS uygulama ve gerçek marka/kartvizit varlıkları mevcut; canlı URL Unknown.", timeline: "2026: yerel README ve varlıklar; kesin tarih Unknown.", purpose: "Kartvizit QR kodundan sosyal medya ve iletişim kanallarına tek sayfalı geçiş vermek.", problemBeingSolved: "Instagram, WhatsApp, telefon ve konum bağlantılarını markalı, self-hosted tek hedefte toplamak.", targetUsers: ["HERA BRAID müşterileri"], businessGoals: ["İletişim dönüşümü", "Sosyal profil erişimi", "Kartvizit QR deneyimi"], technologyStack: ["HTML", "CSS", "JavaScript"], frameworks: "Yok", backend: "Yok", database: "Yok", hosting: U, cms: "Yapılandırma dosyası / statik içerik", integrations: ["Instagram", "WhatsApp", "Telefon", "Konum", "QR"], designSystem: "HERA BRAID marka ve kartvizit varlıkları", brandLanguage: "Türkçe; kişisel bakım ve doğrudan iletişim", colorPalette: "Marka varlıklarında; kodlanmış kanonik palet Unknown", typography: U, responsiveStrategy: "Mobil öncelikli tek sayfa", seoStrategy: U, performanceOptimizations: "Statik dosyalar", accessibilityNotes: U, majorFeatures: ["Sosyal bağlantılar", "WhatsApp", "Telefon", "Konum", "QR hedefi"], pages: ["Tek sayfa"], architecture: "Bağımlılıksız statik site.", interestingTechnicalDecisions: "Gerçek marka varlıkları ayrı klasörden, uygulama LINK-BIO klasöründen birleştirildi.", developmentChallenges: "Kartvizit ve web kimliğini tutarlı kılma.", lessonsLearned: U, screenshotsReferences: `${workspace}\\Buse-HairBraid`, assetLocations: [sources.S111.path, `${workspace}\\brkunluer.pro\\LINK-BIO\\assets`], gitRepository: U, productionUrl: U, relatedDocumentation: [sources.S110.path], filesBelonging: [`${workspace}\\brkunluer.pro\\LINK-BIO`, sources.S111.path], sourceIds: ["S110", "S111"], documentationBreakdown: score(8,4,7,9,1,2,4,2,5,5), priorityBreakdown: priority(15,8,16,10),
  }),
  project({
    projectName: "Atelier Dimora", slug: "atelier-dimora", aliases: ["ATALIER DIMORA TATTOO"], client: "Atelier Dimora", industry: "Dövme stüdyosu", projectType: "Kurumsal site yeniden tasarım prototipi", categories: ["Tattoo Studio", "Corporate Website", "Experimental"], currentStatus: "Birden fazla masaüstü/mobil Stitch HTML prototipi mevcut; uygulama ve production durumu Unknown.", timeline: "2026: yeniden tasarım prototipleri; kesin tarih Unknown.", purpose: "Sanat galerisi konseptli dövme stüdyosu kimliğini ve randevu akışını tasarlamak.", problemBeingSolved: "Premium galeri hissi, sanatçı/hizmet sunumu ve rezervasyon CTA'sını tek deneyimde birleştirmek.", targetUsers: ["Dövme müşterileri", "Sanat galerisi estetiği arayanlar"], businessGoals: ["Randevu talebi", "Premium marka konumlandırması", "Portföy sergileme"], technologyStack: ["Stitch tarafından üretilmiş HTML/CSS prototipleri"], frameworks: U, backend: U, database: U, hosting: U, cms: U, integrations: ["WhatsApp", "Instagram"], designSystem: "Monokrom, lüks galeri varyantları", brandLanguage: "Türkçe; sanatsal ve premium", colorPalette: ["#f9f9f9", "siyah", "gri tonları"], typography: "Prototip dosyalarında web fontları; kanonik seçim Unknown", responsiveStrategy: "Masaüstü ve mobil ekran varyantları", seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["Hizmetler", "Sanatçılar", "Galeri", "Rezervasyon formu", "Başarı ekranı", "WhatsApp/Instagram"], pages: ["Ana sayfa", "Hizmetler", "Rezervasyon", "Başarı"], architecture: "Birbirinden bağımsız statik tasarım prototipleri.", interestingTechnicalDecisions: "Aynı marka için koyu, açık, lüks ve mobil varyantlarla tasarım yönü araştırma.", developmentChallenges: "Prototipler arasından kanonik görsel sistem seçimi.", lessonsLearned: U, screenshotsReferences: sources.S120.path, assetLocations: sources.S120.path, gitRepository: U, productionUrl: U, demoUrl: U, relatedDocumentation: "HTML prototipleri", relatedPrompts: "Stitch ekran üretim talimatları dosya yapısında", relatedAiWorkflows: ["Stitch UI üretimi"], filesBelonging: [sources.S120.path], sourceIds: ["S120"], documentationBreakdown: score(6,3,10,9,1,2,3,1,2,3), priorityBreakdown: priority(16,9,20,15),
  }),
  project({
    projectName: "Karesi Periyodik Kontrol", slug: "karesi-periyodik-kontrol", aliases: ["Hasan Çimen web teklifi"], client: "Hasan Çimen / Karesi Periyodik Kontrol", industry: "İş güvenliği ve periyodik kontrol", projectType: "Kurumsal web sitesi teklifi", categories: ["Corporate Website"], currentStatus: "İki teklif belgesi mevcut; uygulama, kaynak kod ve yayın kanıtı Unknown.", timeline: "2026: teklif dönemi; kesin tarih belge metadata incelemesi olmadan Unknown.", purpose: "Periyodik kontrol hizmetlerini, teklif talebini ve yerel uzmanlığı dijitalde sunmak.", problemBeingSolved: "Hizmetlerin anlaşılır sunumu ve arama/WhatsApp üzerinden müşteri talebi üretimi.", targetUsers: ["İşletmeler", "İSG sorumluları", "Yerel kurumsal müşteriler"], businessGoals: ["Teklif talebi", "Yerel SEO", "Kurumsal güven"], technologyStack: U, frameworks: U, backend: U, database: U, hosting: U, cms: U, integrations: ["Planlanan WhatsApp", "Planlanan Analytics/Search Console"], designSystem: "Teklif düzeyinde modern, güven veren kurumsal tasarım", brandLanguage: "Türkçe; teknik, güvenilir ve kurumsal", colorPalette: U, typography: U, responsiveStrategy: "Teklifte responsive", seoStrategy: ["Yerel SEO", "Hizmet sayfaları", "Blog", "sitemap", "Search Console"], performanceOptimizations: "Teklifte performans hedefi; uygulama kanıtı Unknown", accessibilityNotes: U, majorFeatures: ["Hizmet sayfaları", "Teklif formu", "WhatsApp", "Blog", "İletişim"], pages: ["Ana sayfa", "Hizmetler", "Hizmet detay", "Hakkımızda", "Blog", "İletişim"], architecture: U, interestingTechnicalDecisions: U, developmentChallenges: U, lessonsLearned: "Teklif, tamamlanmış proje olarak sunulmamalı.", screenshotsReferences: U, assetLocations: sources.S130.path, gitRepository: U, productionUrl: U, relatedDocumentation: ["Karesi/Hasan Çimen teklif DOCX dosyaları"], filesBelonging: [sources.S130.path], sourceIds: ["S130"], documentationBreakdown: score(8,2,5,1,0,5,2,8,3,3), priorityBreakdown: priority(18,7,14,10),
  }),
  project({
    projectName: "Personal CRM", slug: "personal-crm", aliases: ["PersonelCRM"], client: "Bağımsız prototip", industry: "Kişisel üretkenlik / ilişki yönetimi", projectType: "Web uygulaması prototipi", categories: ["Internal Tool", "SaaS", "Experimental"], currentStatus: "Yerel frontend/backend prototipi mevcut; auth ve kalıcı veri üretimde değil, yayın Unknown.", timeline: "Eski proje arşivi; kesin tarih Unknown.", purpose: "Kişisel ilişkileri, kişileri ve etkileşimleri hafif bir CRM'de takip etmek.", problemBeingSolved: "Kişisel iletişim bağlamının ve takiplerin dağınık kalması.", targetUsers: ["Bireysel profesyoneller", "Ağını takip eden kullanıcılar"], businessGoals: U, technologyStack: ["React 18", "TypeScript", "Vite", "Wouter", "TanStack Query", "Tailwind", "shadcn/ui", "Express", "Drizzle/Neon hazırlığı"], frameworks: ["React/Vite", "Express"], backend: "Express/TypeScript", database: "Şu an in-memory; Drizzle/Neon hazırlığı", hosting: U, cms: U, integrations: U, designSystem: "shadcn/ui; açık/koyu tema ve i18n", brandLanguage: "Çok dilli hazırlık", colorPalette: "Tasarım yönergelerinde", typography: ["Inter", "JetBrains Mono"], responsiveStrategy: "Responsive dashboard", seoStrategy: U, performanceOptimizations: ["TanStack Query istemci veri katmanı"], accessibilityNotes: "Tasarım yönergesinde WCAG AA hedefi", majorFeatures: ["Kişiler", "İlişki notları", "Takip", "Tema", "i18n"], pages: ["Dashboard", "Kişiler", "Kişi detay", "Ayarlar"], architecture: "React SPA + Express API; depolama arayüzü şu an in-memory.", interestingTechnicalDecisions: ["Kalıcı veritabanı gelmeden storage interface", "Wouter ile hafif routing"], developmentChallenges: ["Auth yok", "Kalıcı veri yok"], lessonsLearned: "Hazır veri arayüzü, prototipi sonraki veritabanına taşımayı kolaylaştırır; üretim durumu olarak sunulmamalı.", screenshotsReferences: sources.S141.path, assetLocations: sources.S141.path, gitRepository: U, productionUrl: U, relatedDocumentation: [sources.S140.path], filesBelonging: [sources.S141.path], sourceIds: ["S140", "S141"], documentationBreakdown: score(7,7,7,5,0,5,7,1,4,6), priorityBreakdown: priority(13,17,16,18),
  }),
  project({
    projectName: "Premium Listing Platform", slug: "premium-listing-platform", aliases: ["OldcityLove"], client: U, industry: "İlan / yetişkin içerik pazaryeri", projectType: "Frontend-only ilan platformu MVP", categories: ["Marketplace", "Experimental"], currentStatus: "Yerel frontend-only MVP; README backend, gerçek login ve admin olmadığını belirtiyor. Production Unknown.", timeline: "Eski proje arşivi; kesin tarih Unknown.", purpose: "Premium ilan listeleme ve profil deneyimini prototiplemek.", problemBeingSolved: "İlan keşfi ve premium görünürlüğün frontend akışını doğrulamak.", targetUsers: ["İlan yayınlayanlar", "İlan ziyaretçileri"], businessGoals: ["Premium listeleme modeli doğrulaması"], technologyStack: ["Next.js/React kaynakları"], frameworks: ["Next.js", "React"], backend: "Yok; mock", database: "Yok; mock", hosting: U, cms: U, integrations: U, designSystem: "Uygulama kaynaklarında", brandLanguage: U, colorPalette: U, typography: U, responsiveStrategy: "Frontend MVP", seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["İlan listesi", "Profil", "Mock login", "Mock admin"], pages: ["Liste", "İlan detay", "Profil", "Login/admin mock"], architecture: "Frontend-only Next.js MVP.", interestingTechnicalDecisions: "Backend sınırını README'de açıkça belirtme.", developmentChallenges: ["Kimlik doğrulama ve moderasyon yok", "Gerçek veri yok"], lessonsLearned: "Mock akışlar üretim özelliği olarak sayılmamalı.", screenshotsReferences: sources.S151.path, assetLocations: sources.S151.path, gitRepository: U, productionUrl: U, relatedDocumentation: [sources.S150.path], filesBelonging: [sources.S151.path], sourceIds: ["S150", "S151"], documentationBreakdown: score(5,4,5,4,0,4,4,1,2,3), priorityBreakdown: priority(11,11,12,10),
  }),
  project({
    projectName: "OFF İlan Platformu", slug: "off-ilan-platformu", aliases: ["off_site_proje", "site-yetiskin-plan"], client: U, industry: "İlan / yetişkin içerik pazaryeri", projectType: "Tam yığın ilan platformu", categories: ["Marketplace", "SaaS"], currentStatus: "Yerel frontend, backend, admin, Docker ve Nginx kaynakları mevcut; production ve gerçek ödeme doğrulaması Unknown.", timeline: "2026 plan/source dönemi; kesin tarih Unknown.", purpose: "Admin kontrollü, kripto ödeme planlı ücretli ilan platformu kurmak.", problemBeingSolved: "İlan yayınlama, moderasyon, ödeme ve yönetimi tek platformda toplamak.", targetUsers: ["İlan yayınlayanlar", "İlan ziyaretçileri", "Yöneticiler"], businessGoals: ["Ücretli ilan geliri", "Moderasyon", "Premium görünürlük"], technologyStack: ["Next.js 14", "React 18", "Tailwind", "Express", "PostgreSQL", "React/Vite admin", "Docker", "Nginx"], frameworks: ["Next.js", "Express", "Vite"], backend: "Express", database: "PostgreSQL", hosting: "Docker/Nginx planı; sağlayıcı Unknown", cms: "Özel admin paneli", integrations: ["Kripto ödeme planı"], designSystem: "Frontend/admin uygulamaları", brandLanguage: U, colorPalette: U, typography: U, responsiveStrategy: "Web ve admin arayüzleri", seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["İlan", "Profil", "Admin", "Moderasyon", "Ödeme planı"], pages: ["Frontend ilan akışları", "Admin paneli"], architecture: "Ayrı frontend, Express backend ve Vite admin; Docker/Nginx dağıtım yapısı.", interestingTechnicalDecisions: ["Admin'i ayrı uygulama tutma", "Kripto ödeme modeli"], developmentChallenges: ["Moderasyon", "Ödeme güvenliği", "Gizlilik ve yasal uyum"], lessonsLearned: U, screenshotsReferences: sources.S161.path, assetLocations: sources.S161.path, gitRepository: U, productionUrl: U, relatedDocumentation: [sources.S160.path, `${workspace}\\ARQEN STUDIO\\PLAN MD DOSYALARI\\site-yetiskin-plan.md`], filesBelonging: [sources.S161.path], sourceIds: ["S160", "S161"], documentationBreakdown: score(7,8,6,4,1,3,7,2,4,6), priorityBreakdown: priority(13,20,13,14),
  }),
  project({
    projectName: "Google Business Profile Data Service", slug: "google-business-profile-service", aliases: ["GOOGLE_DATA"], client: "Bağımsız araç", industry: "Yerel işletme verisi", projectType: "Web arayüzlü veri çıkarma servisi", categories: ["Internal Tool", "Open Source"], currentStatus: "Yerel Node/Express kaynakları ve README mevcut; production Unknown.", timeline: "Eski proje arşivi; kesin tarih Unknown.", purpose: "Google paylaşım URL'sinden Place ID ve yapılandırılmış işletme verisi üretmek.", problemBeingSolved: "Google Business Profile bağlantılarını tekrar kullanılabilir JSON verisine dönüştürmek.", targetUsers: ["Ajanslar", "Yerel SEO uzmanları", "Geliştiriciler"], businessGoals: ["Yerel veri toplama otomasyonu"], technologyStack: ["Node.js", "Express", "Google Places API", "Playwright fallback"], frameworks: ["Express"], backend: "Node.js/Express", database: U, hosting: U, cms: U, integrations: ["Google Places API", "Playwright"], designSystem: "Basit yerel web UI", brandLanguage: U, colorPalette: U, typography: U, responsiveStrategy: U, seoStrategy: U, performanceOptimizations: "API başarısızlığında tarayıcı fallback", accessibilityNotes: U, majorFeatures: ["URL çözümleme", "Place ID", "JSON çıktı", "Web UI", "Fallback"], pages: ["Yerel araç arayüzü"], architecture: "API-first çözümleyici + Playwright yedeği + Express UI.", interestingTechnicalDecisions: "API ve tarayıcı yöntemini fallback zincirinde birleştirme.", developmentChallenges: ["Google sayfa değişiklikleri", "API kotası"], lessonsLearned: "Kırılgan web otomasyonu mümkünse resmi API'nin arkasında yedek olmalı.", screenshotsReferences: U, assetLocations: sources.S181.path, gitRepository: U, productionUrl: U, relatedDocumentation: [sources.S180.path], filesBelonging: [sources.S181.path], sourceIds: ["S180", "S181"], documentationBreakdown: score(7,7,3,1,0,6,7,3,6,6), priorityBreakdown: priority(12,17,15,20),
  }),
  project({
    projectName: "Yasui", slug: "yasui", aliases: U, client: U, industry: "API altyapısı", projectType: "API gateway/proxy konsepti", categories: ["SaaS", "Internal Tool", "Experimental"], currentStatus: "Yalnız küratörlü arşiv kaydı bulundu; bağımsız kaynak kod veya birincil belge bulunamadı.", timeline: U, purpose: "T0/T1/T2 katmanlarıyla API gateway/proxy ürünü tasarlamak.", problemBeingSolved: "API erişimi ve katmanlı servis yönetimi; ayrıntı Unknown.", targetUsers: U, businessGoals: U, technologyStack: U, frameworks: U, backend: U, database: U, hosting: U, cms: U, integrations: U, designSystem: U, brandLanguage: U, colorPalette: U, typography: U, responsiveStrategy: U, seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["T0/T1/T2 katmanları (arşiv kaydı)"], pages: U, architecture: "Katmanlı gateway/proxy konsepti; ayrıntı birincil kaynakla doğrulanmadı.", interestingTechnicalDecisions: U, developmentChallenges: "Birincil kaynak eksikliği.", lessonsLearned: "İkincil arşiv kaydı tek başına uygulama veya yayın kanıtı değildir.", screenshotsReferences: U, assetLocations: U, gitRepository: U, productionUrl: U, relatedDocumentation: `${sources.S191.path}\\03_Yasui.md`, filesBelonging: [`${sources.S191.path}\\03_Yasui.md`], sourceIds: ["S190", "S191"], documentationBreakdown: score(4,3,1,0,0,2,3,0,1,1), priorityBreakdown: priority(12,14,12,12),
  }),
  project({
    projectName: "StageKey", slug: "stagekey", aliases: U, client: U, industry: "Müzik / dijital varlık pazaryeri", projectType: "Web + masaüstü ürün konsepti", categories: ["Marketplace", "Experimental"], currentStatus: "Yalnız küratörlü arşiv kaydı bulundu; atıf yapılan HTML mockup yerelde bulunamadı.", timeline: U, purpose: "Ses paketleri için pazaryeri ve Tauri masaüstü deneyimi tasarlamak.", problemBeingSolved: "Müzik üreticilerinin ses paketlerini keşfetmesi ve masaüstünde kullanması.", targetUsers: ["Müzik üreticileri", "Ses paketi üreticileri"], businessGoals: U, technologyStack: ["Tauri (arşiv kaydı)", "Web marketplace (ayrıntı Unknown)"], frameworks: U, backend: U, database: U, hosting: U, cms: U, integrations: U, designSystem: U, brandLanguage: U, colorPalette: U, typography: U, responsiveStrategy: U, seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["Ses paketi pazaryeri", "Masaüstü istemci konsepti"], pages: U, architecture: "Web marketplace + Tauri istemci konsepti.", interestingTechnicalDecisions: U, developmentChallenges: "Birincil kaynak ve mockup eksikliği.", lessonsLearned: U, screenshotsReferences: U, assetLocations: U, gitRepository: U, productionUrl: U, relatedDocumentation: `${sources.S191.path}\\07_StageKey.md`, filesBelonging: [`${sources.S191.path}\\07_StageKey.md`], sourceIds: ["S190", "S191"], documentationBreakdown: score(5,3,2,0,0,1,3,1,1,1), priorityBreakdown: priority(13,16,16,15),
  }),
  project({
    projectName: "MEZAT", slug: "mezat", aliases: U, client: U, industry: "Canlı açık artırma", projectType: "Gerçek zamanlı web ürün konsepti", categories: ["SaaS", "Marketplace", "Experimental"], currentStatus: "Küratörlü arşivde WebSocket açık artırma spesifikasyonu kayıtlı; atıf yapılan birincil design/Stitch dosyaları yerelde bulunamadı.", timeline: U, purpose: "Gerçek zamanlı teklif verilen açık artırma deneyimi tasarlamak.", problemBeingSolved: "Teklif sırası, süre ve anlık durumun eşzamanlı yönetimi.", targetUsers: ["Açık artırma katılımcıları", "Müzayede yöneticileri"], businessGoals: U, technologyStack: ["WebSocket (arşiv kaydı)"], frameworks: U, backend: U, database: U, hosting: U, cms: U, integrations: U, designSystem: U, brandLanguage: U, colorPalette: U, typography: U, responsiveStrategy: U, seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["Canlı teklif", "Sayaç", "Oturum durumu"], pages: U, architecture: "Gerçek zamanlı WebSocket spesifikasyonu; birincil belge eksik.", interestingTechnicalDecisions: U, developmentChallenges: ["Eşzamanlılık", "Bağlantı kopması", "Birincil kaynak eksikliği"], lessonsLearned: U, screenshotsReferences: U, assetLocations: U, gitRepository: U, productionUrl: U, relatedDocumentation: `${sources.S191.path}\\08_MEZAT.md`, filesBelonging: [`${sources.S191.path}\\08_MEZAT.md`], sourceIds: ["S190", "S191"], documentationBreakdown: score(5,4,2,0,0,1,4,0,2,1), priorityBreakdown: priority(14,20,17,18),
  }),
  project({
    projectName: "WPForge", slug: "wpforge", aliases: U, client: "Bağımsız geliştirici aracı", industry: "WordPress geliştirme otomasyonu", projectType: "AI-first CLI", categories: ["Internal Tool", "Open Source", "AI Product"], currentStatus: "Yerel Python kaynakları, mimari ve test klasörü mevcut; README 32 testin geçtiğini kaydediyor fakat bu taramada testler yeniden çalıştırılmadı.", timeline: "2026 yerel proje; kesin Git tarihçesi Unknown.", purpose: "Prompttan site planı çıkarıp WP-CLI ile standart WordPress sitesi üretmek.", problemBeingSolved: "WordPress kurulum, child theme, içerik yapısı, WooCommerce ve SEO işlerinin tekrarlı manuel kurulumu.", targetUsers: ["WordPress geliştiricileri", "Ajanslar", "AI destekli site kurucuları"], businessGoals: ["Teslim süresini azaltma", "Tekrarlanabilir WordPress çıktısı"], technologyStack: ["Python 3.11+", "WP-CLI", "Claude API", "WordPress", "WooCommerce"], frameworks: "Python CLI mimarisi", backend: "Yerel CLI", database: "Hedef WordPress veritabanı", hosting: "Hedef WordPress ortamı; araç için Unknown", cms: "WordPress", integrations: ["Claude API", "WP-CLI", "WooCommerce", "iyzico", "Stripe", "PayPal"], designSystem: "Child theme üretimi", brandLanguage: "Geliştirici/operasyon dili", colorPalette: U, typography: U, responsiveStrategy: "Üretilen temaya bağlı", seoStrategy: "SEO motoru ve eklenti uyumu", performanceOptimizations: "Dry-run ve standart çıktı; çalışma zamanı performansı Unknown", accessibilityNotes: U, majorFeatures: ["Prompt parser", "Site planı", "WP executor", "Theme engine", "Structure engine", "WooCommerce", "Fix engine", "Dry-run"], pages: "Araç hedef site yapısını üretir; kendi web sayfası yok", architecture: "Parser → site planı → motorlar → WP-CLI uygulama zinciri.", interestingTechnicalDecisions: ["Standart WordPress çıktısı", "Child theme", "Dry-run", "Motor bazlı yapı"], developmentChallenges: ["Farklı hosting/tema ortamları", "WP-CLI güvenliği", "AI çıktısı doğrulama"], lessonsLearned: "AI üretimi, uygulanabilir plan ve deterministik yürütme katmanıyla sınırlandırılmalı.", screenshotsReferences: U, assetLocations: sources.S172.path, gitRepository: U, productionUrl: U, demoUrl: U, relatedDocumentation: [sources.S170.path, sources.S171.path], relatedResearch: "WordPress/WooCommerce otomasyonu", relatedPrompts: "Prompt parser girdileri", relatedAiWorkflows: ["Prompt → Site Plan → WP-CLI"], relatedMethods: ["Dry-run", "Engine tabanlı üretim"], filesBelonging: [sources.S172.path], sourceIds: ["S170", "S171", "S172"], documentationBreakdown: score(8,9,4,1,1,7,9,7,6,9), priorityBreakdown: priority(20,23,22,24),
  }),
  project({
    projectName: "codex-skills", slug: "codex-skills", aliases: ["Codex Skills Repo"], client: "Bağımsız geliştirici aracı", industry: "AI ajan geliştirme", projectType: "Skill kütüphanesi / açık kaynak depo", categories: ["Open Source", "Internal Tool", "Educational"], currentStatus: "Yerel Git deposu mevcut; paketlerin güncel yayın durumu Unknown.", timeline: U, purpose: "Codex için tekrar kullanılabilir beceri paketlerini düzenlemek ve dağıtmak.", problemBeingSolved: "Ajan talimatlarının dağınık ve tekrar yazılır halde kalması.", targetUsers: ["Codex kullanıcıları", "AI ajan geliştiricileri"], businessGoals: ["Tekrar kullanım", "Standart çalışma kalitesi"], technologyStack: "Markdown beceri paketleri ve yardımcı scriptler", frameworks: U, backend: U, database: U, hosting: "GitHub", cms: "Git deposu", integrations: ["Codex"], designSystem: U, brandLanguage: "Talimat ve operasyon dili", colorPalette: U, typography: U, responsiveStrategy: U, seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["SKILL.md paketleri", "Yardımcı scriptler", "Örnekler/şablonlar"], pages: U, architecture: "Her beceri için giriş talimatı ve isteğe bağlı script/örnek/şablon dizinleri.", interestingTechnicalDecisions: "Talimatları tekrar kullanılabilir paket sınırında tutma.", developmentChallenges: ["Beceri kapsamının netliği", "Sürümleme"], lessonsLearned: "Ajan davranışı da kod gibi sürümlenmeli ve kaynaklanmalı.", screenshotsReferences: U, assetLocations: sources.S210.path, gitRepository: "https://github.com/Hitbullets/codex-skills.git", productionUrl: U, relatedDocumentation: [sources.S211.path], relatedAiWorkflows: ["Codex skill çalıştırma"], relatedMethods: ["SKILL.md tabanlı paketleme"], filesBelonging: [sources.S210.path], sourceIds: ["S210", "S211"], documentationBreakdown: score(7,7,3,0,2,6,7,1,3,8), priorityBreakdown: priority(16,18,19,23),
  }),
  project({
    projectName: "Tattoo Design Desktop App", slug: "tattoo-design-desktop-app", aliases: ["InkOS Desktop olasılığı"], client: U, industry: "Tattoo teknolojisi / üretken yapay zekâ", projectType: "Masaüstü uygulama konsepti", categories: ["AI Product", "Experimental"], currentStatus: "Yalnız küratörlü arşiv kaydı bulundu; InkOS ile birleşme kararı açık değil ve birincil kaynak kod bulunamadı.", timeline: U, purpose: "AI destekli tattoo tasarımını masaüstü uygulamada sunmak.", problemBeingSolved: U, targetUsers: ["Dövme sanatçıları", "Dövme müşterileri"], businessGoals: U, technologyStack: ["Tauri", "fal.ai", "Cloudflare", "Lemon Squeezy (arşiv kaydı)"], frameworks: ["Tauri (arşiv kaydı)"], backend: U, database: U, hosting: U, cms: U, integrations: ["fal.ai", "Lemon Squeezy"], designSystem: U, brandLanguage: U, colorPalette: U, typography: U, responsiveStrategy: "Masaüstü", seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["AI tattoo tasarımı", "Masaüstü istemci", "Lisans/ödeme konsepti"], pages: U, architecture: "Tauri masaüstü + bulut AI servisleri konsepti.", interestingTechnicalDecisions: U, developmentChallenges: ["Birincil kaynak yok", "InkOS ile ürün sınırı belirsiz"], lessonsLearned: "Açık birleşme kanıtı yoksa benzer ürünler otomatik birleştirilmemeli.", screenshotsReferences: U, assetLocations: U, gitRepository: U, productionUrl: U, relatedDocumentation: `${sources.S191.path}\\05_Tattoo_Design_Desktop_App.md`, relatedResearch: "InkOS LoRA/ControlNet araştırmasıyla alan ilişkisi var; doğrudan bağı Unknown", relatedAiWorkflows: ["fal.ai görsel üretimi (arşiv kaydı)"], filesBelonging: [`${sources.S191.path}\\05_Tattoo_Design_Desktop_App.md`], sourceIds: ["S190", "S191"], documentationBreakdown: score(4,3,2,0,0,2,3,0,1,1), priorityBreakdown: priority(13,17,16,15),
  }),
  project({
    projectName: "CAU INK × MoveZone LED Reklamları", slug: "cau-ink-movezone-led", aliases: ["MoveZone LED Ads"], client: "CAU INK / MoveZone", industry: "Açık hava dijital reklam / tattoo", projectType: "Motion reklam teslimi", categories: ["Experimental", "Client Work"], currentStatus: "Küratörlü arşivde teslim edilmiş iki LED motion çalışma olarak kayıtlı; birincil video dosyası kesin eşleştirmesi Unknown.", timeline: U, purpose: "CAU INK kampanya mesajlarını MoveZone LED ekran formatına uyarlamak.", problemBeingSolved: "Kısa sürede okunabilir, ekran oranına uygun yerel reklam üretmek.", targetUsers: ["MoveZone ekran izleyicileri", "Potansiyel CAU INK müşterileri"], businessGoals: ["Yerel farkındalık", "Randevu talebi"], technologyStack: "Motion/video üretim araçları Unknown", frameworks: U, backend: U, database: U, hosting: "MoveZone LED ağı", cms: U, integrations: U, designSystem: "CAU INK marka varlıkları", brandLanguage: "Türkçe; kısa reklam mesajı", colorPalette: "CAU INK kimliği", typography: U, responsiveStrategy: "LED ekran oranı; kesin çözünürlük Unknown", seoStrategy: U, performanceOptimizations: "Kısa loop/video teslimi; codec Unknown", accessibilityNotes: U, majorFeatures: ["İki LED reklam kreatifi (arşiv kaydı)"], pages: U, architecture: U, interestingTechnicalDecisions: U, developmentChallenges: ["Okunabilirlik", "Ekran oranı", "Kısa süre"], lessonsLearned: U, screenshotsReferences: sources.S014.path, assetLocations: [sources.S014.path], gitRepository: U, productionUrl: U, demoUrl: U, relatedDocumentation: `${sources.S191.path}\\09_CAU_INK_MoveZone_LED_Ads.md`, relatedAiWorkflows: "Görsel/video üretim sürecinin ayrıntısı Unknown", relatedMethods: ["CAU INK marka varlığı yeniden kullanımı"], filesBelonging: [`${sources.S191.path}\\09_CAU_INK_MoveZone_LED_Ads.md`, sources.S014.path], sourceIds: ["S014", "S190", "S191"], documentationBreakdown: score(6,2,5,5,4,2,1,0,2,2), priorityBreakdown: priority(17,9,16,10),
  }),
  project({
    projectName: "AI Trainer Kamu Eğitimi", slug: "ai-trainer-kamu-egitimi", aliases: ["AI Trainer"], client: "Kamu eğitimi bağlamı; kurum Unknown", industry: "Eğitim", projectType: "Eğitim sunumu ve materyal paketi", categories: ["Educational"], currentStatus: "Küratörlü arşivde 17 slayt ve ilişkili eğitim materyalleri kayıtlı; birincil dosya yolu bulunamadı.", timeline: U, purpose: "Kamu bağlamında temel yapay zekâ okuryazarlığı eğitimi vermek.", problemBeingSolved: "Teknik olmayan katılımcılara AI kavram ve kullanımını anlaşılır aktarmak.", targetUsers: ["Kamu çalışanları / katılımcılar"], businessGoals: ["Eğitim teslimi"], technologyStack: U, frameworks: U, backend: U, database: U, hosting: U, cms: U, integrations: U, designSystem: "17 slaytlık eğitim anlatısı (arşiv kaydı)", brandLanguage: "Türkçe; eğitici", colorPalette: U, typography: U, responsiveStrategy: U, seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["17 slayt", "AI okuryazarlığı içeriği"], pages: U, architecture: U, interestingTechnicalDecisions: U, developmentChallenges: "Birincil materyal yolu eksik.", lessonsLearned: U, screenshotsReferences: U, assetLocations: U, gitRepository: U, productionUrl: U, relatedDocumentation: `${sources.S191.path}\\10_AI_Trainer_Kamu_Egitimi.md`, relatedResearch: "Eğitim içeriği araştırması; ayrıntı Unknown", relatedPrompts: U, relatedAiWorkflows: U, relatedMethods: U, filesBelonging: [`${sources.S191.path}\\10_AI_Trainer_Kamu_Egitimi.md`], sourceIds: ["S190", "S191"], documentationBreakdown: score(6,2,5,0,2,2,1,0,1,2), priorityBreakdown: priority(12,7,13,19),
  }),
  project({
    projectName: "Buse Birthday Web Experience", slug: "buse-birthday", aliases: ["Buse_Birthday"], client: "Kişisel çalışma", industry: "Kişisel dijital hediye", projectType: "Tek dosyalı etkileşimli web deneyimi", categories: ["Experimental", "Personal Brand"], currentStatus: "Yerel index.html ve görsel varlık mevcut; production URL Unknown.", timeline: "2026-04-12: yerel dosya zamanı; Git tarihçesi Unknown.", purpose: "Buse için kişisel doğum günü deneyimi oluşturmak.", problemBeingSolved: "Kişisel mesajı paylaşılabilir etkileşimli web formatına dönüştürmek.", targetUsers: ["Tek alıcı / kişisel çevre"], businessGoals: U, technologyStack: ["HTML", "CSS", "JavaScript; büyük ölçüde tek dosya"], frameworks: U, backend: "Yok", database: "Yok", hosting: U, cms: U, integrations: U, designSystem: "Tek dosya içi görsel sistem", brandLanguage: "Kişisel Türkçe", colorPalette: U, typography: U, responsiveStrategy: "HTML içinde; gerçek cihaz doğrulaması Unknown", seoStrategy: U, performanceOptimizations: U, accessibilityNotes: U, majorFeatures: ["Kişisel mesaj", "Görsel/animasyonlu deneyim"], pages: ["Tek sayfa"], architecture: "Self-contained statik HTML.", interestingTechnicalDecisions: "Dağıtımı kolaylaştırmak için tek dosya yaklaşımı.", developmentChallenges: "Büyük tek dosya ve medya performansı.", lessonsLearned: U, screenshotsReferences: sources.S200.path, assetLocations: sources.S200.path, gitRepository: U, productionUrl: U, filesBelonging: [sources.S200.path], sourceIds: ["S200"], documentationBreakdown: score(5,3,5,6,0,1,2,0,2,2), priorityBreakdown: priority(5,8,10,9),
  }),
  project({
    projectName: "8 Mart Dünya Kadınlar Günü Deneyimi", slug: "8-mart-deneyimi", aliases: ["8-mart"], client: "Kişisel/deneysel çalışma", industry: "Etkileşimli hikâye", projectType: "Sesli ve etkileşimli statik web deneyimi", categories: ["Experimental", "Educational"], currentStatus: "Yerel HTML, CSS, JavaScript ve ses dosyaları mevcut; production URL Unknown.", timeline: "2026: yerel proje; kesin tarih Unknown.", purpose: "8 Mart için teşekkür, öz-şefkat ve etkileşimli görev deneyimi sunmak.", problemBeingSolved: "Kutlama mesajını pasif kart yerine sesli ve etkileşimli deneyime dönüştürmek.", targetUsers: ["8 Mart mesajının alıcıları"], businessGoals: U, technologyStack: ["HTML", "CSS", "JavaScript", "Canvas", "MP3/WebM audio"], frameworks: "Yok", backend: "Yok", database: "Yok", hosting: U, cms: U, integrations: ["Google Fonts"], designSystem: "Cam panel, petal canvas, kart/carousel ve çiçek sayacı", brandLanguage: "Türkçe; sıcak ve onurlandırıcı", colorPalette: "CSS içinde; özet Unknown", typography: ["Cormorant Garamond", "Outfit", "Caveat", "Dancing Script"], responsiveStrategy: "Viewport meta ve tek sayfa uygulama düzeni", seoStrategy: "Temel title/description", performanceOptimizations: "Yerel ses formatları ve canvas; ölçüm Unknown", accessibilityNotes: "Ses gerektiren deneyim için metinsel uyarı var; tam klavye/reduced-motion denetimi Unknown", majorFeatures: ["Kart carousel", "Petal canvas", "Çiçek sayacı", "Arka plan sesi", "Etkileşimli görevler"], pages: ["Tek sayfa, çok ekranlı durum akışı"], architecture: "Bağımlılıksız statik HTML/CSS/JS ve durum bazlı ekranlar.", interestingTechnicalDecisions: ["Canvas petal arka planı", "Tek sayfada ekran durumları"], developmentChallenges: ["Otomatik ses politikaları", "Mobil performans", "Erişilebilir hareket"], lessonsLearned: U, screenshotsReferences: sources.S201.path, assetLocations: sources.S201.path, gitRepository: U, productionUrl: U, filesBelonging: [sources.S201.path], sourceIds: ["S201"], documentationBreakdown: score(7,5,7,5,0,2,5,3,4,4), priorityBreakdown: priority(6,11,13,14),
  }),
  project({
    projectName: "Yapay Zekâ Model Karşılaştırması", slug: "yapay-zeka-model-karsilastirmasi", aliases: ["YAPAYZEKA-KARSILASTIRMA", "Yapay Zeka Modeli Karşılaştırması 2025"], client: "ByyHit / bağımsız içerik", industry: "Yapay zekâ araştırma ve eğitim", projectType: "Veri görselleştirmeli statik içerik sayfası", categories: ["Educational", "Experimental"], currentStatus: "Yerel index.html ve models.json mevcut; verilerin güncelliği ve üretim URL'si Unknown.", timeline: "Sayfa başlığında 2025; yerel arşivde 2026 taraması.", purpose: "Altı AI modelini kod kalitesi, ajan davranışı, hız ve güvenilirlik gibi ölçütlerle karşılaştırmak.", problemBeingSolved: "Model seçimi için dağınık değerlendirmeleri görsel tek sayfada toplamak.", targetUsers: ["AI araçlarını karşılaştıran geliştiriciler", "Teknik karar vericiler"], businessGoals: ["Eğitici içerik", "Uzmanlık görünürlüğü"], technologyStack: ["HTML", "CSS", "JavaScript", "Chart.js 4.4.3", "models.json"], frameworks: ["Chart.js"], backend: "Yok", database: "models.json", hosting: U, cms: "Statik JSON", integrations: ["Google Fonts", "jsDelivr Chart.js"], designSystem: "Koyu veri dashboard'u", brandLanguage: "Türkçe; analitik ve teknik", colorPalette: ["#080c14", "#0d1220", "#111827", "#6c63ff"], typography: ["Outfit", "JetBrains Mono"], responsiveStrategy: "clamp ve responsive section düzeni", seoStrategy: "Title ve description", performanceOptimizations: "Tek HTML + yerel JSON; harici Chart.js CDN", accessibilityNotes: U, majorFeatures: ["Altı model karşılaştırması", "Grafikler", "Kriter tabloları"], pages: ["Tek sayfa"], architecture: "Statik HTML + JSON veri + Chart.js görselleştirme.", interestingTechnicalDecisions: "Veriyi models.json içinde sunumdan ayırma.", developmentChallenges: ["Hızla eskiyen model verisi", "Kriterlerin kaynaklandırılması"], lessonsLearned: "Model karşılaştırmaları tarih ve kaynak olmadan güncel gerçek gibi sunulmamalı.", screenshotsReferences: sources.S202.path, assetLocations: sources.S202.path, gitRepository: U, productionUrl: U, relatedDocumentation: `${sources.S202.path}\\models.json`, relatedResearch: "Karşılaştırma verileri models.json içinde; dış kaynak referansları Unknown", relatedAiWorkflows: U, relatedMethods: U, filesBelonging: [sources.S202.path], sourceIds: ["S202"], documentationBreakdown: score(7,5,8,3,0,5,5,4,4,5), priorityBreakdown: priority(10,12,17,20),
  }),
];

const userCorrections = {
  saloniq: {
    projectName: "SalonIQ App | Online Rezervasyon & Akıllı İşyeri Yönetimi",
    aliases: ["SalonIQ", "222les", "SalonIQ Kasa", "SalonIQ Staging", "Saloniq APP Yedekler"],
  },
  inkos: {
    projectName: "InkOS | AI Tattoo Creator",
    aliases: ["InkOS", "Ink-OS", "InkOS One"],
  },
  "satis-metni-ai": {
    projectName: "AI Satış Metni | Yapay Zeka ile Profesyonel Başlık & Metinler",
    aliases: ["SatışMetni AI", "FABLE-MONEY-SYSTEM", "e-ticaret-asistan"],
  },
  "hera-braid": {
    projectName: "Hair Designer Buse Durmaz",
    aliases: ["HERA BRAID Link-in-Bio", "LINK-BIO", "Buse-HairBraid", "Buse Durmaz link page"],
  },
  yasui: {
    projectName: "Yasui LLM Provider",
    aliases: ["Yasui"],
    industry: "LLM/API altyapısı",
    projectType: "LLM provider ve API gateway/proxy konsepti",
  },
  stagekey: {
    projectName: "STAGE KEY - Müzisyen Kit Box",
    aliases: ["StageKey"],
  },
  "cau-ink-movezone-led": {
    projectName: "CAU INK x MOVEZONE REKLAM ÇALIŞMALARI",
    aliases: ["CAU INK × MoveZone LED Reklamları", "MoveZone LED Ads"],
  },
  "off-ilan-platformu": {
    projectName: "Emlak/Oto Galeri İlan Otomasyonları",
    aliases: ["OFF İlan Platformu"],
    client: U,
    industry: "Emlak ve otomotiv ilan yönetimi",
    projectType: "İlan otomasyonu",
    categories: ["SaaS", "Internal Tool"],
    currentStatus: "Ürün kimliği portföy sahibi tarafından düzeltildi; uygulama ve yayın durumu Unknown.",
    timeline: U,
    purpose: "Emlak ve oto galerileri için ilan hazırlama ve yönetim süreçlerini otomatikleştirmek.",
    problemBeingSolved: "Emlak ve oto galeri ilan operasyonlarındaki tekrarlı hazırlık ve takip adımlarını azaltmak.",
    targetUsers: ["Emlak işletmeleri", "Oto galerileri"],
    businessGoals: U,
    technologyStack: U,
    frameworks: U,
    backend: U,
    database: U,
    hosting: U,
    cms: U,
    integrations: U,
    designSystem: U,
    brandLanguage: U,
    colorPalette: U,
    typography: U,
    responsiveStrategy: U,
    seoStrategy: U,
    performanceOptimizations: U,
    accessibilityNotes: U,
    majorFeatures: ["İlan hazırlama ve yönetim otomasyonu"],
    pages: U,
    architecture: U,
    interestingTechnicalDecisions: U,
    developmentChallenges: U,
    lessonsLearned: U,
    screenshotsReferences: U,
    assetLocations: U,
    gitRepository: U,
    productionUrl: U,
    demoUrl: U,
    relatedDocumentation: [sources.S220.path],
    relatedResearch: U,
    relatedPrompts: U,
    relatedAiWorkflows: U,
    relatedMethods: U,
    filesBelonging: U,
    sourceIds: ["S220"],
    documentationBreakdown: score(5, 1, 1, 0, 0, 1, 1, 0, 0, 1),
    priorityBreakdown: priority(20, 16, 19, 16),
  },
};

for (const [slug, correction] of Object.entries(userCorrections)) {
  const item = projects.find((projectItem) => projectItem.slug === slug);
  if (!item) continue;
  Object.assign(item, correction);
  item.sourceIds = [...new Set([...(correction.sourceIds ?? item.sourceIds), "S220"])];
  item.documentationScore = Object.values(item.documentationBreakdown).reduce((total, value) => total + value, 0);
  item.priorityScore = Object.values(item.priorityBreakdown).reduce((total, value) => total + value, 0);
}

const coverCatalog = {
  "cau-ink": {
    coverImage: "/images/projects/covers/cau-ink-mockup.png",
    coverSourceScreens: ["content/projects/cau-ink/assets/homepage-desktop.png"],
    coverProvenance: "verified-source-screen",
    coverSources: ["S010", "S014"],
    sourceFiles: ["content/projects/cau-ink/assets/homepage-desktop.png"],
    promptSummary: "Gerçek CAU INK ana sayfasını masaüstü ve mobil cihaz kompozisyonunda sunan kapak.",
  },
  saloniq: {
    coverImage: "/images/projects/covers/saloniq-mockup.png",
    coverSourceScreens: ["content/projects/saloniq/assets/homepage-desktop.png"],
    coverProvenance: "verified-source-screen",
    coverSources: ["S020", "S022"],
    sourceFiles: ["content/projects/saloniq/assets/homepage-desktop.png"],
    promptSummary: "Gerçek SalonIQ landing ekranını koyu masaüstü ve telefon mock-up kompozisyonunda sunan kapak.",
  },
  inkos: {
    coverImage: "/images/projects/covers/inkos-mockup.png",
    coverSourceScreens: ["content/projects/inkos/assets/product-interface-desktop.png"],
    coverProvenance: "verified-source-screen",
    coverSources: ["S030", "S033"],
    sourceFiles: ["content/projects/inkos/assets/product-interface-desktop.png"],
    promptSummary: "Gerçek InkOS ürün arayüzünü masaüstü ve mobil cihaz mock-up kompozisyonunda sunan kapak.",
  },
  "satis-metni-ai": {
    coverImage: "/images/projects/covers/satis-metni-ai-mockup.png",
    coverSourceScreens: ["content/projects/satis-metni-ai/assets/homepage-desktop.png"],
    coverProvenance: "verified-source-screen",
    coverSources: ["S070", "S071"],
    sourceFiles: ["content/projects/satis-metni-ai/assets/homepage-desktop.png"],
    promptSummary: "Gerçek AI Satış Metni ana sayfasını masaüstü ve mobil cihaz mock-up kompozisyonunda sunan kapak.",
  },
  "atelier-dimora": {
    coverImage: "/images/projects/covers/atelier-dimora-mockup.png",
    coverSourceScreens: [
      "content/projects/atelier-dimora/assets/homepage-desktop.png",
      "content/projects/atelier-dimora/assets/homepage-mobile.png",
    ],
    coverProvenance: "verified-source-screen",
    coverSources: ["S120"],
    sourceFiles: ["content/projects/atelier-dimora/assets/homepage-desktop.png", "content/projects/atelier-dimora/assets/homepage-mobile.png"],
    promptSummary: "Gerçek Atelier Dimora masaüstü ve mobil ana sayfa ekranlarını cihaz mock-up kompozisyonunda sunan arşiv kapağı.",
  },
  "ai-factory-os": { coverImage: "/images/projects/covers/ai-factory-os-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S040", "S041", "S042"], promptSummary: "Belgelenmiş fikir, araştırma, ürün tanımı, mimari ve insan onayı akışını gösteren AI Factory OS cihaz mock-up'ı." },
  "adres-moda": { coverImage: "/images/projects/covers/adres-moda-mockup.png", coverProvenance: "source-assets-and-documents", coverSources: ["S050", "S051", "S052", "S053"], sourceFiles: ["content/projects/adres-moda/assets/brand-fashion-source.png", "content/projects/adres-moda/assets/logo-source.png"], promptSummary: "AdresModa marka ve moda varlıklarını kullanan masaüstü ve mobil e-ticaret kapak kompozisyonu." },
  "mr-pisi": { coverImage: "/images/projects/covers/mr-pisi-mockup.png", coverProvenance: "source-assets-and-documents", coverSources: ["S060", "S061", "S062"], sourceFiles: ["content/projects/mr-pisi/assets/packaging-source.png"], promptSummary: "Gerçek Mr. Pisi ambalaj varlığını ürün kahramanı olarak kullanan cihaz mock-up kapağı." },
  "gold-tracker": { coverImage: "/images/projects/covers/gold-tracker-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S080", "S081", "S082"], promptSummary: "Belgelenmiş altın fiyatı ve kişisel portföy takibi işlevlerinden türetilen finans dashboard cihaz mock-up'ı." },
  wpforge: { coverImage: "/images/projects/covers/wpforge-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S170", "S171", "S172"], promptSummary: "Belgelenmiş prompttan site planına ve WP-CLI üretimine uzanan WPForge akışını gösteren geliştirici aracı mock-up'ı." },
  "codex-skills": { coverImage: "/images/projects/covers/codex-skills-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S210", "S211"], promptSummary: "Codex beceri paketlerinin katalog, dosya ve doğrulama görünümünü temsil eden geliştirici platformu mock-up'ı." },
  mezat: { coverImage: "/images/projects/covers/mezat-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S190", "S191"], promptSummary: "Belgelenmiş WebSocket, canlı teklif ve anti-snipe işlevlerinden türetilen MEZAT cihaz mock-up'ı." },
  "google-business-profile-service": { coverImage: "/images/projects/covers/google-business-profile-service-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S180", "S181"], promptSummary: "Paylaşım URL'sinden Place ID ve yapılandırılmış veri çıkarma akışını temsil eden web aracı mock-up'ı." },
  "personal-crm": { coverImage: "/images/projects/covers/personal-crm-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S140", "S141"], promptSummary: "Kişi, ilişki ve etkileşim takibi işlevlerinden türetilen kişisel CRM cihaz mock-up'ı." },
  "premium-listing-platform": { coverImage: "/images/projects/covers/premium-listing-platform-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S150", "S151"], promptSummary: "Belgelenmiş premium listeleme ve profil keşfi MVP'sini nötr görsellerle temsil eden cihaz mock-up'ı." },
  "off-ilan-platformu": { coverImage: "/images/projects/covers/off-ilan-platformu-mockup.png", coverProvenance: "owner-brief-informed-concept", coverSources: ["S220"], promptSummary: "Portföy sahibinin düzelttiği emlak ve oto galeri ilan otomasyonu kapsamını temsil eden B2B cihaz mock-up'ı." },
  stagekey: { coverImage: "/images/projects/covers/stagekey-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S190", "S191", "S220"], promptSummary: "Belgelenmiş üç panelli ses kiti arayüzü, amber vurgu ve loader/pazaryeri kapsamından türetilen cihaz mock-up'ı." },
  yasui: { coverImage: "/images/projects/covers/yasui-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S190", "S191", "S220"], promptSummary: "Belgelenmiş LLM/API gateway, maliyet ve abuse kontrolü ile T0 Trial, T1 Verified, T2 Power User katmanlarını temsil eden cihaz mock-up'ı." },
  "cau-ink-movezone-led": { coverImage: "/images/projects/covers/cau-ink-movezone-led-mockup.png", coverProvenance: "source-assets-and-documents", coverSources: ["S014", "S190", "S191", "S220"], sourceFiles: ["content/projects/cau-ink-movezone-led/assets/cau-ink-logo-source.webp"], promptSummary: "Gerçek CAU INK kimliği ve belgelenmiş 15 saniyelik dikey LED reklam kapsamını kullanan reklam üretim kapağı." },
  "ai-trainer-kamu-egitimi": { coverImage: "/images/projects/covers/ai-trainer-kamu-egitimi-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S190", "S191"], promptSummary: "Belgelenmiş 17 slaytlık kamu AI okuryazarlığı eğitimi ve Ocean Gradient paletinden türetilen sunum mock-up'ı." },
  "yapay-zeka-model-karsilastirmasi": { coverImage: "/images/projects/covers/yapay-zeka-model-karsilastirmasi-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S202"], promptSummary: "Belgelenmiş altı model, kriter tablosu ve grafik yapısından türetilen karşılaştırma cihaz mock-up'ı." },
  "hera-braid": { coverImage: "/images/projects/covers/hera-braid-mockup.png", coverProvenance: "source-assets-and-documents", coverSources: ["S110", "S111", "S220"], promptSummary: "Buse Durmaz'ın gerçek HERA BRAID kartvizit kimliğinden türetilen, iletişim bilgisi içermeyen link-in-bio cihaz mock-up'ı." },
  "karesi-periyodik-kontrol": { coverImage: "/images/projects/covers/karesi-periyodik-kontrol-mockup.png", coverProvenance: "document-informed-concept", coverSources: ["S130"], promptSummary: "Belgelenmiş periyodik kontrol hizmet sunumu ve teklif akışından türetilen kurumsal web cihaz mock-up'ı." },
};

const hiddenPortfolioSlugs = new Set([
  "atelier-dimora",
  "brkunluer-site",
  "takipler-store",
  "tattoo-design-desktop-app",
  "8-mart-deneyimi",
  "buse-birthday",
  "3dikili",
]);

for (const item of projects) {
  const cover = coverCatalog[item.slug];
  if (cover) {
    const publicCover = Object.fromEntries(
      Object.entries(cover).filter(([key]) => key !== "sourceFiles" && key !== "promptSummary"),
    );
    Object.assign(item, publicCover, { coverPromptSummary: cover.promptSummary });
  }
  item.portfolioVisibility = hiddenPortfolioSlugs.has(item.slug) ? "hidden" : "visible";
  if (item.portfolioVisibility === "hidden") {
    item.sourceIds = [...new Set([...item.sourceIds, "S220"])];
  }
}

const mergeRegister = [
  { canonical: "CAU INK", merged: ["CAU_INK", "CAU_INK_STITCH", "CAU_INK_WHITE_DEMO", "CAU_INK_MEDICAL", "CAU INK Gallery v2", "Tattoo-Demo", "CAU_INK_REDESING-1"], evidence: ["S010", "S011", "S012", "S014", "S015"] },
  { canonical: "SalonIQ App | Online Rezervasyon & Akıllı İşyeri Yönetimi", merged: ["SalonIQ", "SALONIQ_APP", "_SalonIQ_Archive", "Saloniq APP Yedekler", "222les / KasaPage"], evidence: ["S020", "S021", "S022", "S023", "S220"] },
  { canonical: "AI Satış Metni | Yapay Zeka ile Profesyonel Başlık & Metinler", merged: ["SatışMetni AI", "FABLE-MONEY-SYSTEM", "e-ticaret-asistan"], evidence: ["S070", "S071", "S220"] },
  { canonical: "Hair Designer Buse Durmaz", merged: ["HERA BRAID Link-in-Bio", "LINK-BIO", "Buse-HairBraid"], evidence: ["S110", "S111", "S220"] },
  { canonical: "BRKUNLUER.SITE", merged: ["BRKUNLUER.SITE", "BRKUNLUER.SITE-KAYNAK"], evidence: ["S001", "S002", "S003"] },
  { canonical: "Mr. Pisi", merged: ["mr.-pisi---premium-kedi-kumu", "mr.-pisi---premium-kedi-kumu (1)", "mr.-pisi---premium-kedi-kumu (2)", "MR.Pisi"], evidence: ["S060", "S061", "S062"] },
];

const relationships = [
  { from: "AI Factory OS", to: "BRKUNLUER.SITE", relation: "AI Factory Planning Stack makalesi ve AI Factory System yöntem sayfası bu sitede yayımlanıyor.", evidence: ["S005", "S040", "S041"] },
  { from: "InkOS", to: "BRKUNLUER.SITE", relation: "InkOS, mevcut sitenin proje içeriği ve ekran varlıklarıyla temsil ediliyor.", evidence: ["S005", "S033"] },
  { from: "CAU INK", to: "CAU INK x MOVEZONE REKLAM ÇALIŞMALARI", relation: "LED reklam çalışması CAU INK marka ve kampanya varlıklarını kullanıyor.", evidence: ["S014", "S191", "S220"] },
  { from: "CAU INK", to: "Atelier Dimora", relation: "Yalnız aynı tattoo-studio problem alanında tasarım çalışmalarıdır; doğrudan kod/teknik yeniden kullanım kanıtı yoktur.", evidence: ["S010", "S120"] },
  { from: "InkOS", to: "Tattoo Design Desktop App", relation: "Aynı tattoo-AI alanındadır; arşiv birleşme ihtimalini açık bırakır, bu nedenle ayrı kayıt tutulur.", evidence: ["S032", "S191"] },
  { from: "AdresModa", to: "WPForge", relation: "Her ikisi WordPress/WooCommerce teslimat alanındadır; WPForge'un AdresModa'da kullanıldığına dair doğrudan kanıt yoktur.", evidence: ["S051", "S052", "S170", "S171"] },
];

const unresolvedCandidates = [
  { name: "FLORIST FULYA", reason: "Görsel/klasör izi var; bağımsız site kimliği, kod veya proje belgesi doğrulanamadı.", path: `${workspace}\\OLD.PROJECT\\FLORIST FULYA` },
  { name: "ATEŞ TOUR", reason: "Genel proje dosyalarında referanslar var; kanonik web projesi kaydı için yeterli kaynak yok.", path: `${workspace}\\GENEL PROJE DOSYALARI\\ATEŞ TOUR` },
  { name: "Pet Grooming", reason: "Tablo/iş dokümanı izleri var; web uygulaması veya site teslimi doğrulanamadı.", path: `${workspace}` },
  { name: "Hermes Studio", reason: "Eski ikincil kayıtlarda ad geçiyor; erişilebilir birincil kaynak bulunamadı.", path: U },
  { name: "hairstyl", reason: "Klasör boş; proje kimliği ve dosya yok.", path: `${workspace}\\OLD.PROJECT\\hairstyl` },
  { name: "freelink-bio-main", reason: "README ve uzak depo Anuswar Rao'nun üçüncü taraf açık kaynak şablonunu gösteriyor; HERA BRAID kanonik kaydına proje olarak eklenmedi.", path: `${workspace}\\OLD.PROJECT\\freelink-bio-main` },
  { name: "PAYTR", reason: "Tek entegrasyon ekran görüntüsü; bağımsız proje değil, ilgili SaaS projelerinde entegrasyon kanıtı.", path: `${workspace}\\brkunluer.pro\\PAYTR` },
  { name: "AI-MODEL-CLAUDE / SES MODELİ / YAYINCI PAKETİ", reason: "Prompt veya medya paketleri; benzersiz website ürünü olarak doğrulanmadı.", path: workspace },
];

const mdValue = (value) => Array.isArray(value) ? value.join(", ") : String(value);
const cell = (value) => mdValue(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const refs = (ids) => ids.map((id) => `[${id}]`).join(" ");
const write = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${content.trim()}\n`, "utf8");
};
const sha256 = (filePath) => createHash("sha256").update(readFileSync(filePath)).digest("hex").toUpperCase();

const projectByPriority = [...projects].sort((a, b) => b.priorityScore - a.priorityScore || b.documentationScore - a.documentationScore);
const projectByDocs = [...projects].sort((a, b) => b.documentationScore - a.documentationScore || b.priorityScore - a.priorityScore);

const sourceRows = Object.entries(sources).map(([id, source]) => `| ${id} | \`${source.path}\` | ${cell(source.note)} |`).join("\n");
const indexRows = projectByPriority.map((p, index) => `| ${index + 1} | [${p.projectName}](../../content/projects/${p.slug}/index.mdx) | ${cell(p.projectType)} | ${cell(p.currentStatus)} | ${p.documentationScore} | ${p.priorityScore} | ${refs(p.sourceIds)} |`).join("\n");
const mergeRows = mergeRegister.map((m) => `| ${m.canonical} | ${cell(m.merged)} | ${refs(m.evidence)} |`).join("\n");

const indexDoc = `# Master Portfolio Proje İndeksi

Arşiv anlık görüntüsü: **${snapshotDate}**<br>
Kanonik proje sayısı: **${projects.length}**<br>
Çözümlenmemiş aday sayısı: **${unresolvedCandidates.length}**

## Kanıt standardı

Bu bilgi tabanı yalnız erişilebilir yerel dosyalar, Git yapılandırmaları ve ayrı olarak belirtilen canlı web kontrollerinden üretilmiştir. Birincil kanıt bulunmayan değerler \`Unknown\` olarak tutulur. Planlanan teknoloji ile uygulanmış teknoloji, belgeli yayın ile canlı doğrulama ve gerçek varlık ile AI destek görsel birbirine eşit sayılmaz. Kaynak dosyalarda görülen parola, anahtar, merchant kimliği ve benzeri hassas değerler bu arşive alınmamıştır.

\`content/projects/<slug>/\` altındaki klasörler kanonik veritabanından üretilir. \`lib/content.ts\` bu klasörlerdeki \`metadata.json\` kayıtlarını ayrı bir proje arşivi katmanı olarak yükler; kökteki yayımlanmış MDX vaka çalışmaları aynı slug için önceliğini korur. Arşiv detayları editoryal olarak tamamlanana kadar arama motorlarına kapalıdır. [S006]

## Öncelikli kanonik liste

Öncelik puanı; iş değeri, teknik karmaşıklık, portföy değeri ve eğitsel değerin 25'er puanlık toplamıdır. Bu puanlar arşiv değerlendirmesidir; müşteri geliri veya başarı iddiası değildir.

| # | Proje | Tür | Durum | Belge skoru | Öncelik | Kanıt |
|---:|---|---|---|---:|---:|---|
${indexRows}

## Birleştirme kaydı

| Kanonik proje | Birleştirilen ad/klasörler | Kanıt |
|---|---|---|
${mergeRows}

## Kaynak kayıt defteri

Belge içindeki her \`[Sxxx]\` işareti aşağıdaki kaynağa gider. Dizin düzeyindeki kayıtlar, o proje için dosya kökü olarak kullanılmıştır.

| Kimlik | Kaynak | Kullanım |
|---|---|---|
${sourceRows}
`;

const timelineEntries = [
  ["2022", "CAU INK canlı site içeriğinde marka başlangıcı olarak gösteriliyor.", ["S013"]],
  ["2025", "Yapay Zekâ Model Karşılaştırması sayfa başlığında 2025 sürümü olarak adlandırılıyor.", ["S202"]],
  ["2026-03", "SalonIQ deployment belgesi v2.2.90 production kaydını; AdresModa yol haritası e-ticaret teklifini kaydediyor.", ["S021", "S050"]],
  ["2026-04", "AdresModa Clotya uygulama planı ve Buse Birthday yerel dosya zamanı.", ["S052", "S200"]],
  ["2026-06", "InkOS CURRENT_STATE, Phase -1 dokümantasyonunun tamamlandığını ve çekirdek kodun henüz başlamadığını kaydediyor.", ["S030"]],
  ["2026-07-22", "AI Factory OS kanonik MVP kapsamı güncellendi.", ["S041"]],
  ["2026-08-02", "BRKUNLUER.SITE mevcut yerel Git geçmişindeki doğrulanabilir commit; bu master arşiv anlık görüntüsü.", ["S001", "S003"]],
];
const unknownTimeline = projects.filter((p) => p.timeline === U || p.timeline.includes("kesin tarih Unknown") || p.timeline.includes("Kesin tarih Unknown")).map((p) => `- **${p.projectName}:** ${p.timeline} ${refs(p.sourceIds)}`).join("\n");
const timelineDoc = `# Portföy Zaman Çizelgesi

Bu çizelge yalnız belgede veya dosya/Git kaydında açıkça görülen tarihleri kullanır. Bir klasörün son değiştirilme tarihi, tek başına proje başlangıç veya teslim tarihi sayılmamıştır.

${timelineEntries.map(([date, event, evidence]) => `## ${date}\n\n${event} ${refs(evidence)}`).join("\n\n")}

## Tarihi tamamlanması gereken projeler

${unknownTimeline || "Unknown"}
`;

const categoryMap = new Map();
for (const p of projects) {
  const categories = Array.isArray(p.categories) ? p.categories : [p.categories];
  for (const category of categories) {
    if (!categoryMap.has(category)) categoryMap.set(category, []);
    categoryMap.get(category).push(p);
  }
}
const categoriesDoc = `# Proje Kategorileri

Bir proje birden fazla kategoriye girebilir; bu bir kopya kayıt oluşturmaz.

${[...categoryMap.entries()].sort(([a], [b]) => a.localeCompare(b, "tr")).map(([category, items]) => `## ${category}\n\n${items.sort((a, b) => b.priorityScore - a.priorityScore).map((p) => `- **${p.projectName}** — ${p.projectType}; ${p.currentStatus} ${refs(p.sourceIds)}`).join("\n")}`).join("\n\n")}
`;

const stackRows = projects.map((p) => `| ${p.projectName} | ${cell(p.frameworks)} | ${cell(p.backend)} | ${cell(p.database)} | ${cell(p.hosting)} | ${cell(p.cms)} | ${cell(p.integrations)} | ${refs(p.sourceIds)} |`).join("\n");
const stacksDoc = `# Teknoloji Yığınları

\`Plan:\` ile başlayan değerler uygulama kanıtı değildir. Paket bildirimi veya kaynak kodla doğrulanmayan teknoloji Unknown tutulur.

| Proje | Framework | Backend | Veritabanı | Hosting | CMS | Entegrasyonlar | Kanıt |
|---|---|---|---|---|---|---|---|
${stackRows}
`;

const clientRows = [...projects].sort((a, b) => cell(a.client).localeCompare(cell(b.client), "tr")).map((p) => `| ${cell(p.client)} | ${p.projectName} | ${cell(p.industry)} | ${cell(p.currentStatus)} | ${refs(p.sourceIds)} |`).join("\n");
const clientsDoc = `# Müşteri İndeksi

\`Bağımsız ürün\` kayıtları müşteri işi iddiası taşımaz. Hasan Çimen kişi kaydı ayrı proje değildir; Karesi Periyodik Kontrol teklifinin müşteri/iletişim bağlamıdır.

| Müşteri / sahiplik | Proje | Sektör | Durum | Kanıt |
|---|---|---|---|---|
${clientRows}
`;

const relationshipRows = relationships.map((r) => `| ${r.from} | ${r.to} | ${cell(r.relation)} | ${refs(r.evidence)} |`).join("\n");
const relationshipDoc = `# Proje İlişki Haritası

Yalnız kaynaklarla desteklenen ilişkiler çizilir. Aynı teknoloji veya sektör, tek başına yeniden kullanım kanıtı sayılmaz.

\`\`\`mermaid
flowchart TD
  AF["AI Factory OS"] -->|"makale ve yöntem içeriği"| BRK["BRKUNLUER.SITE"]
  INK["InkOS"] -->|"proje sayfası ve ekran varlıkları"| BRK
  CAU["CAU INK"] -->|"marka/kampanya varlıkları"| LED["MoveZone LED Reklamları"]
  CAU -. "aynı alan; yeniden kullanım kanıtı yok" .-> DIM["Atelier Dimora"]
  INK -. "birleşme kararı doğrulanmadı" .-> DESK["Tattoo Design Desktop App"]
  ADR["AdresModa"] -. "aynı WordPress alanı; kullanım kanıtı yok" .-> WPF["WPForge"]
\`\`\`

| Kaynak proje | Hedef proje | İlişki | Kanıt |
|---|---|---|---|
${relationshipRows}

## Açıkça kurulmamış ilişkiler

- AI Factory OS'un InkOS, CAU INK veya diğer ürünleri doğrudan ürettiği doğrulanmadı.
- WPForge'un AdresModa uygulamasında kullanıldığı doğrulanmadı.
- Premium Listing Platform ile OFF İlan Platformu arasında ortak alan dışında kimlik veya kod sürekliliği doğrulanmadı.
`;

const scoreRows = projectByDocs.map((p, index) => `| ${index + 1} | ${p.projectName} | ${p.documentationScore} | ${p.documentationBreakdown.businessContext} | ${p.documentationBreakdown.technicalDepth} | ${p.documentationBreakdown.designDocumentation} | ${p.documentationBreakdown.screenshots} | ${p.documentationBreakdown.deployment} | ${p.documentationBreakdown.lessonsLearned} | ${p.documentationBreakdown.architecture} | ${p.documentationBreakdown.seo} | ${p.documentationBreakdown.performance} | ${p.documentationBreakdown.maintainability} |`).join("\n");
const priorityRows = projectByPriority.map((p, index) => `| ${index + 1} | ${p.projectName} | ${p.priorityScore} | ${p.priorityBreakdown.businessValue} | ${p.priorityBreakdown.technicalComplexity} | ${p.priorityBreakdown.portfolioValue} | ${p.priorityBreakdown.educationalValue} | ${p.documentationScore} |`).join("\n");
const caseStudyDoc = `# Case Study Kuyruğu

## Belge kalitesi sıralaması

Her boyut 0–10 puandır: iş bağlamı, teknik derinlik, tasarım belgesi, ekran görüntüsü, deployment, çıkarılan ders, mimari, SEO, performans ve sürdürülebilirlik. Toplam 0–100'dür. Puan, projenin başarısını değil erişilebilir kanıtın case study üretmeye yeterliliğini ölçer.

| # | Proje | Toplam | İş | Teknik | Tasarım | Görsel | Yayın | Ders | Mimari | SEO | Perf. | Bakım |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
${scoreRows}

## Portföy üretim önceliği

Her öncelik boyutu 0–25'tir. Bu değerlendirme finansal performans iddiası değildir.

| # | Proje | Toplam | İş değeri | Teknik karmaşıklık | Portföy değeri | Eğitsel değer | Belge skoru |
|---:|---|---:|---:|---:|---:|---:|---:|
${priorityRows}

## Önerilen ilk case study dalgası

1. **CAU INK:** En güçlü gerçek varlık, tasarım evrimi, SEO ve canlı site kanıtı.
2. **SalonIQ:** En derin SaaS, çok kiracılık, ödeme ve operasyon dokümantasyonu.
3. **BRKUNLUER.SITE:** Bu arşivin doğrudan yayın hedefi ve kişisel marka omurgası.
4. **InkOS:** Yüksek portföy değeri; önce plan/uygulama durum çelişkisi kapatılmalı.
5. **AdresModa:** Güçlü iş, tasarım ve e-ticaret bağlamı; önce gerçek yayın durumu kanıtlanmalı.
6. **AI Factory OS:** Mimari ve yöntem anlatısı çok güçlü; ekran/yayın kanıtı eksik.
`;

const criticalMissing = {
  inkos: ["Phase -1 belgesi ile çalışan MVP anlatısı arasındaki güncel durum", "Gerçek production URL ve dağıtım", "Planlanan ve uygulanmış yığının ayrımı"],
  saloniq: ["Canlı alan adlarının güncel erişim kanıtı", "Güncel ekran görüntüleri", "Son production sürümü"],
  "cau-ink": ["Kanonik güncel repo/commit", "Reduced-motion ve iOS Safari doğrulaması", "AI destek varlıklarla gerçek çekimlerin kesin varlık manifesti"],
  "adres-moda": ["Kurulumun tamamlanıp tamamlanmadığı", "Canlı URL", "Gerçek ödeme/kargo test kanıtı"],
  "mr-pisi": ["Üç varyanttan hangisinin kanonik olduğu", "Güncel canlı sürüm", "Form/KVKK/analytics tamamlanma kanıtı"],
  yasui: ["Birincil doküman", "Kaynak kod", "Ürün sahibi ve yığın"],
  stagekey: ["Atıf yapılan HTML mockup", "Birincil ürün spec", "Repo"],
  mezat: ["design.md ve Stitch promptları", "Repo", "Ürün durumu"],
};
const missingRows = projects.map((p) => {
  const unknownFields = Object.entries(p).filter(([, value]) => value === U).map(([key]) => key);
  const extra = criticalMissing[p.slug] ?? [];
  const combined = [...extra, ...(unknownFields.length ? [`Unknown alanlar: ${unknownFields.join(", ")}`] : [])];
  return `| ${p.projectName} | ${cell(combined.length ? combined : "Kritik Unknown yok; yine de yayın ve güncel ekranlar periyodik doğrulanmalı.")} | ${refs(p.sourceIds)} |`;
}).join("\n");
const candidateRows = unresolvedCandidates.map((c) => `| ${c.name} | ${cell(c.reason)} | \`${c.path}\` |`).join("\n");
const missingDoc = `# Eksik Bilgi ve Doğrulama Kuyruğu

## Proje bazında eksikler

| Proje | Eksik / çelişkili bilgi | Mevcut kanıt |
|---|---|---|
${missingRows}

## Kanonik projeye dönüştürülmeyen adaylar

| Aday | Neden dahil edilmedi | İz / konum |
|---|---|---|
${candidateRows}

## Güvenlik notu

AdresModa ve SalonIQ kaynaklarında operasyonel veya hassas olabilecek değerler görüldü. Bu arşiv bu değerleri bilerek kopyalamaz. Paylaşım öncesinde kaynak belgelerden sır/şifre/merchant kimliği temizlenmeli ve gerekiyorsa anahtarlar döndürülmelidir. [S021] [S051]
`;

const assetRows = projects.map((p) => `| ${p.projectName} | ${cell(p.portfolioVisibility)} | ${cell(p.coverImage)} | ${cell(p.coverProvenance)} | ${cell(p.coverSourceScreens)} | ${cell(p.screenshotsReferences)} | ${cell(p.assetLocations)} | ${refs(p.sourceIds)} |`).join("\n");
const assetDoc = `# Varlık İndeksi

Portfolyo kapakları repo içinde tutulur; büyük orijinal medya arşivleri ise çoğaltılmadan referanslanır. Gerçek ekran, kaynak marka varlığı ve belge temelli AI konsepti birbirinden \`coverProvenance\` alanıyla ayrılır.

| Proje | Portfolyo görünürlüğü | Portfolyo kapağı | Kapak kökeni | Kapak kaynak ekranı | Ekran görüntüsü referansı | Varlık kökü | Kanıt |
|---|---|---|---|---|---|---|---|
${assetRows}

## Varlık kullanım kuralları

- Case study yayımlanmadan önce her görsel için sahiplik, gerçek/AI destekli kaynak, tarih ve kullanım izni doğrulanmalıdır.
- CAU INK gerçek fotoğraf/video arşivi ile konsept/Higgsfield çıktıları ayrı etiketlenmelidir. [S010] [S014]
- InkOS ekran görüntüleri mevcut site varlıklarında bulunur; bunların hangi ürün sürümünü gösterdiği doğrulanmalıdır. [S005] [S030]
- AdresModa kurulum belgesindeki hassas bilgiler hiçbir varlık veya metadata dosyasına kopyalanmamalıdır. [S051]
`;

const database = {
  schemaVersion: 1,
  snapshotDate,
  unknownValue: U,
  methodology: "Yalnız erişilebilir yerel kaynaklar ve belirtilen web kontrolleri; plan, uygulama ve canlı doğrulama ayrı tutulur.",
  requestedFields: Object.keys(defaults),
  scoreRubric: { documentationDimensions: Object.keys(projects[0].documentationBreakdown), eachDocumentationDimensionMax: 10, priorityDimensions: Object.keys(projects[0].priorityBreakdown), eachPriorityDimensionMax: 25 },
  mergeRegister,
  relationships,
  unresolvedCandidates,
  sourceRegistry: sources,
  projects,
};

write(join("docs", "MASTER_PORTFOLIO", "01_PROJECT_INDEX.md"), indexDoc);
write(join("docs", "MASTER_PORTFOLIO", "02_TIMELINE.md"), timelineDoc);
write(join("docs", "MASTER_PORTFOLIO", "03_CATEGORIES.md"), categoriesDoc);
write(join("docs", "MASTER_PORTFOLIO", "04_TECH_STACKS.md"), stacksDoc);
write(join("docs", "MASTER_PORTFOLIO", "05_CLIENTS.md"), clientsDoc);
write(join("docs", "MASTER_PORTFOLIO", "06_RELATIONSHIP_MAP.md"), relationshipDoc);
write(join("docs", "MASTER_PORTFOLIO", "07_CASE_STUDY_QUEUE.md"), caseStudyDoc);
write(join("docs", "MASTER_PORTFOLIO", "08_MISSING_INFORMATION.md"), missingDoc);
write(join("docs", "MASTER_PORTFOLIO", "09_ASSET_INDEX.md"), assetDoc);
write(join("docs", "MASTER_PORTFOLIO", "10_MASTER_PORTFOLIO_DATABASE.json"), JSON.stringify(database, null, 2));

for (const p of projects) {
  const root = join("content", "projects", p.slug);
  const evidence = refs(p.sourceIds);
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(p.projectName)}`,
    `slug: ${JSON.stringify(p.slug)}`,
    `excerpt: ${JSON.stringify(mdValue(p.purpose))}`,
    `status: "draft"`,
    `archiveSnapshot: ${JSON.stringify(snapshotDate)}`,
    `documentationScore: ${p.documentationScore}`,
    `priorityScore: ${p.priorityScore}`,
    "---",
  ].join("\n");
  const index = `${frontmatter}

# ${p.projectName}

> Bu kayıt, master portföy veritabanının izlenebilir proje görünümüdür. Kanıt bulunmayan alanlar \`Unknown\` olarak korunur.

| Alan | Değer |
|---|---|
| Müşteri | ${cell(p.client)} |
| Sektör | ${cell(p.industry)} |
| Proje türü | ${cell(p.projectType)} |
| Durum | ${cell(p.currentStatus)} |
| Zaman | ${cell(p.timeline)} |
| Production | ${cell(p.productionUrl)} |
| Demo | ${cell(p.demoUrl)} |
| Git | ${cell(p.gitRepository)} |

## Amaç

${mdValue(p.purpose)} ${evidence}

## Çözülen problem

${mdValue(p.problemBeingSolved)} ${evidence}

## Kullanıcılar ve iş hedefleri

- Hedef kullanıcılar: ${mdValue(p.targetUsers)}
- İş hedefleri: ${mdValue(p.businessGoals)}

## Başlıca özellikler

${Array.isArray(p.majorFeatures) ? p.majorFeatures.map((item) => `- ${item}`).join("\n") : p.majorFeatures}

## Kaynaklar

${p.sourceIds.map((id) => `- **${id}:** \`${sources[id].path}\` — ${sources[id].note}`).join("\n")}

Tüm alanlar için [merkezi veritabanına](../../../docs/MASTER_PORTFOLIO/10_MASTER_PORTFOLIO_DATABASE.json) bakın.
`;
  write(join(root, "index.mdx"), index);
  write(join(root, "metadata.json"), JSON.stringify({ ...p, canonicalDatabase: "../../../docs/MASTER_PORTFOLIO/10_MASTER_PORTFOLIO_DATABASE.json" }, null, 2));
  write(join(root, "timeline.md"), `# ${p.projectName} — Zaman Çizelgesi\n\n${mdValue(p.timeline)} ${evidence}\n\n## Durum\n\n${mdValue(p.currentStatus)} ${evidence}`);
  write(join(root, "architecture.md"), `# ${p.projectName} — Mimari\n\n## Mimari özet\n\n${mdValue(p.architecture)} ${evidence}\n\n## Teknik kararlar\n\n${Array.isArray(p.interestingTechnicalDecisions) ? p.interestingTechnicalDecisions.map((item) => `- ${item}`).join("\n") : p.interestingTechnicalDecisions}\n\n## Zorluklar\n\n${Array.isArray(p.developmentChallenges) ? p.developmentChallenges.map((item) => `- ${item}`).join("\n") : p.developmentChallenges}`);
  write(join(root, "tech-stack.md"), `# ${p.projectName} — Teknoloji Yığını\n\n| Katman | Değer |\n|---|---|\n| Teknoloji yığını | ${cell(p.technologyStack)} |\n| Framework | ${cell(p.frameworks)} |\n| Backend | ${cell(p.backend)} |\n| Veritabanı | ${cell(p.database)} |\n| Hosting | ${cell(p.hosting)} |\n| CMS | ${cell(p.cms)} |\n| Entegrasyonlar | ${cell(p.integrations)} |\n\nKanıt: ${evidence}`);
  write(join(root, "lessons-learned.md"), `# ${p.projectName} — Çıkarılan Dersler\n\n${mdValue(p.lessonsLearned)} ${evidence}\n\n## Performans\n\n${mdValue(p.performanceOptimizations)}\n\n## Erişilebilirlik\n\n${mdValue(p.accessibilityNotes)}\n\n## Bakım notu\n\nBu dosya kanıt güncellendiğinde merkezi veritabanı üzerinden yeniden üretilmelidir.`);
  write(join(root, "gallery", "README.md"), `# ${p.projectName} — Galeri Referansları\n\n## Portfolyo kapağı\n\n${mdValue(p.coverImage)}\n\n## Kapak kökeni\n\n${mdValue(p.coverProvenance)}\n\n## Kapak kaynakları\n\n${mdValue(p.coverSources)}\n\n## Kapak kaynak ekranları\n\n${mdValue(p.coverSourceScreens)}\n\n## Diğer ekran referansları\n\n${mdValue(p.screenshotsReferences)} ${evidence}\n\n\`verified-source-screen\` gerçek proje ekranını, \`source-assets-and-documents\` marka varlığı ve belge desteğini, \`document-informed-concept\` ile \`owner-brief-informed-concept\` ise gerçek üretim ekranı olduğu iddia edilmeyen AI destekli editoryal mock-up'ı belirtir.`);
  write(join(root, "assets", "README.md"), `# ${p.projectName} — Varlık Referansları\n\n${mdValue(p.assetLocations)} ${evidence}\n\n## Projeye ait dosya kökleri\n\n${Array.isArray(p.filesBelonging) ? p.filesBelonging.map((item) => `- \`${item}\``).join("\n") : p.filesBelonging}`);
}

const coverManifest = {
  schemaVersion: 2,
  generatedAt: snapshotDate,
  generator: "OpenAI built-in image generation; generation and targeted edit modes",
  policy: "Yayımlanan projelerin tamamında kapak bulunur. Gerçek ekranlar, kaynak marka varlıkları ve belge temelli AI konseptleri ayrı köken etiketleriyle kaydedilir; konsept kapaklar gerçek üretim ekranı sayılmaz.",
  covers: Object.entries(coverCatalog).map(([slug, cover]) => {
    const projectItem = projects.find((item) => item.slug === slug);
    const outputPath = join(process.cwd(), "public", cover.coverImage.replace(/^\//, "").replaceAll("/", "\\"));
    return {
      slug,
      title: projectItem?.projectName ?? slug,
      portfolioVisibility: projectItem?.portfolioVisibility ?? "visible",
      output: cover.coverImage,
      outputSha256: existsSync(outputPath) ? sha256(outputPath) : U,
      provenance: cover.coverProvenance,
      sourceIds: cover.coverSources,
      sources: (cover.sourceFiles ?? []).map((sourceFile) => {
        const sourcePath = join(process.cwd(), sourceFile.replaceAll("/", "\\"));
        return { path: sourceFile, sha256: existsSync(sourcePath) ? sha256(sourcePath) : U };
      }),
      promptSummary: cover.promptSummary,
    };
  }),
};

write(join("public", "images", "projects", "covers", "manifest.json"), JSON.stringify(coverManifest, null, 2));

console.log(`Master portfolio generated: ${projects.length} projects, ${Object.keys(sources).length} sources.`);
