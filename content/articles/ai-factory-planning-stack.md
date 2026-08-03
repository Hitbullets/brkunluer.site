---
title: "Minimum Maliyetle Uzman Seviyesinde AI Proje Geliştirme Akışı"
excerpt: "AI Factory Planning Stack ile doğru modeli keşif, mimari, kodlama, kalite güvencesi ve yayınlama aşamalarında kullanarak maliyeti düşürün."
coverImage: "/images/covers/ai-factory-system.png"
publishedAt: "2026-08-02T10:00:00+03:00"
updatedAt: "2026-08-02T10:00:00+03:00"
tags: ["AI Factory", "AI proje geliştirme", "yazılım mimarisi"]
status: "published"
relatedArticles: ["ai-is-akislari-neden", "prompt-muhendisligi-rehberi"]
relatedMethods: ["ai-factory-system", "ai-workflow-templates"]
---

Bugün birçok geliştirici ChatGPT, Claude veya Gemini gibi yapay zekâ modellerini doğrudan kod üretmek için kullanıyor.

Ancak büyük projelerde asıl problem model seçimi değildir. Problem, AI'ın yeterli bağlam (context) ve planlama (planning) olmadan geliştirme sürecine başlamasıdır.

Bu rehberde, güçlü modelleri düşünme ve mimari tasarım; ekonomik modelleri ise uygulama için kullanarak daha düşük maliyetle profesyonel seviyeye yakın sonuçlar elde etmenizi amaçlayan **AI Factory Planning Stack** metodolojisini inceleyeceğiz.

> **Not:** Bu rehber, AI'ın önce düşünmesini, sonra kod üretmesini amaçlayan rol tabanlı bir geliştirme metodolojisidir.

## AI'ı Kod Yazmadan Önce Projeyi Düşünmeye Zorlayın

Çoğu geliştirici AI'a doğrudan:

> “Bunu kodla.”

diyerek başlar.

Sorun model değildir; **bağlam (context)** ve **planlama (planning)** eksikliğidir. Bu metodolojide her model yalnızca en iyi olduğu görevi üstlenir.

```text
IDEA
 ↓
STEP 1  Project Discovery (Proje Keşfi)
 ↓
ALPHA-PLAN.md
 ↓
STEP 2  Architecture Review (Mimari İnceleme)
 ↓
MASTER-PLAN.md
 ↓
STEP 3  Implementation (Uygulama / Kodlama)
 ↓
Production Code
 ↓
STEP 4  Quality Assurance (Kalite Güvencesi)
 ↓
STEP 5  Release (Yayınlama)
```

## STEP 1 — Project Discovery (Proje Keşfi)

> ### AI Factory Workflow Card
>
> **🌐 Kullanılacak Platform**
> Claude.ai (Free) / Claude Desktop
>
> **🧠 Kullanılacak Model**
> Claude Sonnet 5
>
> **🎯 Görevi**
>
> - Proje fikrini analiz etmek
> - Gereksinimleri (requirements) çıkarmak
> - Eksikleri belirlemek
> - Doğru soruları sormak
> - MVP kapsamını oluşturmak
>
> **📄 Beklenen Çıktı**
> `ALPHA-PLAN.md`
>
> **⚠️ Kritik Kural**
> Kesinlikle kod yazdırmayın.

Fikrinizi tek seferde, mümkün olduğunca ayrıntılı anlatın. Parça parça anlatım yerine kapsamlı bir açıklama yapın.

> ### AI Factory Golden Rule
>
> Bu aşamada **her mesajın sonunda** şu hatırlatmayı ekleyin:
>
> ```text
> Henüz kod yazma.
> Bu aşamada yalnızca proje analizi yap.
> Eksik gereksinimleri belirle.
> Bana sorular sor.
> Sadece ALPHA-PLAN.md oluştur.
> ```

## STEP 2 — Architecture Review (Mimari İnceleme)

> ### AI Factory Workflow Card
>
> **🌐 Kullanılacak Platform**
> Emergent
>
> **🧠 Kullanılacak Model**
> Claude Opus 5
>
> **🎯 Görevi**
>
> - `ALPHA-PLAN.md` dosyasını eleştirel biçimde incelemek
> - Yazılım mimarisini (software architecture) güçlendirmek
> - Veritabanı (database) tasarımını geliştirmek
> - API tasarımını iyileştirmek
> - Ölçeklenebilirliği (scalability) artırmak
> - Üretime hazır `MASTER-PLAN.md` dosyasını hazırlamak
>
> **📄 Beklenen Çıktı**
> `MASTER-PLAN.md`
>
> **⚠️ Kritik Kural**
> Yeni bir proje tasarlamasını değil, mevcut planı olgunlaştırmasını isteyin.

> ### AI Factory Golden Rule
>
> Her mesajın sonunda şu hatırlatmayı ekleyin:
>
> ```text
> Henüz kod yazma.
> Sadece ALPHA-PLAN.md dosyasını incele.
> Eksikleri belirle.
> MASTER-PLAN.md oluştur.
> ```

### Örnek Prompt

```text
You are the Chief Software Architect responsible for preparing this project for production.

You will receive an ALPHA-PLAN.md document.

Review it critically, identify missing requirements, strengthen the architecture, improve database and API design, preserve the product vision and transform it into a production-ready MASTER-PLAN.md.

Return ONLY the final MASTER-PLAN.md.
Do not include explanations or markdown fences.
```

## Neden Planlama Koddan Daha Önemlidir?

Kod yazan modeller, kendilerine sağlanan bağlam kadar iyi sonuç üretir. Proje analiz edilmeden kodlamaya başlanırsa:

- Mimari sürekli değişir.
- Gereksinimler unutulur.
- Kod tekrarları oluşur.
- Teknik borç (technical debt) hızla artar.
- Bağlam penceresi doldukça çıktı kalitesi düşer.

Bu nedenle AI Factory yaklaşımı önce düşünmeyi, ardından uygulamayı hedefler.

## STEP 3 — Implementation (Uygulama / Kodlama)

> ### AI Factory Workflow Card
>
> **🌐 Kullanılacak Platform**
> Tercih ettiğiniz coding agent
>
> **🧠 Kullanılacak Model**
> DeepSeek V4 Flash
>
> **🎯 Görevi**
> `MASTER-PLAN.md` dosyasını eksiksiz uygulamak
>
> **📄 Beklenen Çıktı**
> Production-ready source code (üretime hazır kaynak kod)
>
> **⚠️ Kritik Kural**
> Planı değiştirmesine izin vermeyin.

DeepSeek V4 Flash, uzun uygulama süreçlerinde güçlü bir fiyat-performans dengesi sunar.

> ### AI Factory Golden Rule
>
> ```text
> MASTER-PLAN.md dışına çıkma.
> Yeni mimari önerme.
> Alternatif üretme.
> Sadece bu planı uygula.
> ```

## STEP 4 — Quality Assurance (Kalite Güvencesi)

> ### AI Factory Workflow Card
>
> **🌐 Kullanılacak Platform**
> Tercih ettiğiniz QA agent
>
> **🧠 Kullanılacak Model**
> Güçlü bir reasoning (akıl yürütme) modeli
>
> **🎯 Görevi**
>
> - Functional testing (fonksiyonel test)
> - Security review (güvenlik incelemesi)
> - Performance analysis (performans analizi)
> - Accessibility review (erişilebilirlik incelemesi)
>
> **📄 Beklenen Çıktı**
> QA raporu

## STEP 5 — Release (Yayınlama)

Bu aşama deploy (canlıya alma), CI/CD, sürüm doğrulama ve üretim ortamına geçiş adımlarını kapsar. Yayınlama tamamlanmadan önce QA raporundaki kritik bulgular kapatılmalı ve üretim sürümü gerçek ortamda doğrulanmalıdır.

## Sonuç

Tek bir AI modeliyle tüm geliştirme sürecini yürütmeye çalışmak çoğu zaman hem daha pahalı hem de daha düşük kaliteli sonuçlar üretir.

AI Factory Planning Stack ise her modeli güçlü olduğu aşamada kullanarak maliyeti düşürmeyi ve daha tutarlı projeler geliştirmeyi amaçlar. Metodolojinin temel prensipleri şunlardır:

- **Güçlü modeller düşünür.**
- **Uzman modeller planlar.**
- **Ekonomik modeller uygular.**
- **QA araçları doğrular.**

| Rol | Model |
|---|---|
| Product Discovery (Ürün Keşfi) | Claude Sonnet 5 |
| Chief Software Architect (Baş Yazılım Mimarı) | Claude Opus 5 |
| Coding Agent (Kodlama Ajanı) | DeepSeek V4 Flash |
| QA (Kalite Güvencesi) | QA Agent |

Başarının anahtarı tek bir modeli her işte kullanmak değil, doğru modeli doğru aşamada kullanmaktır. Doğru rol dağılımı, daha sürdürülebilir ve doğrulanabilir bir geliştirme süreci sağlar.
