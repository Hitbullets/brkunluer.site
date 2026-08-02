# Rotalar

Next.js 16 App Router kullanilir. Tum sayfalar `app/layout.tsx` icindeki Header ve Footer kabugunu kullanir.

| URL | Sayfa | Yerlesim |
| --- | --- | --- |
| `/ai-factory/[slug]` | `app/ai-factory/[slug]/page.tsx` | `app/layout.tsx` |
| `/ai-factory` | `app/ai-factory/page.tsx` | `app/layout.tsx` |
| `/gizlilik` | `app/gizlilik/page.tsx` | `app/layout.tsx` |
| `/hakkinda` | `app/hakkinda/page.tsx` | `app/layout.tsx` |
| `/iletisim` | `app/iletisim/page.tsx` | `app/layout.tsx` |
| `/kullanim-kosullari` | `app/kullanim-kosullari/page.tsx` | `app/layout.tsx` |
| `/metotlar/[slug]` | `app/metotlar/[slug]/page.tsx` | `app/layout.tsx` |
| `/metotlar` | `app/metotlar/page.tsx` | `app/layout.tsx` |
| `/` | `app/page.tsx` | `app/layout.tsx` |
| `/portfolyo/[slug]` | `app/portfolyo/[slug]/page.tsx` | `app/layout.tsx` |
| `/portfolyo` | `app/portfolyo/page.tsx` | `app/layout.tsx` |
| `/tesekkurler` | `app/tesekkurler/page.tsx` | `app/layout.tsx` |
| `/yazilar/[slug]` | `app/yazilar/[slug]/page.tsx` | `app/layout.tsx` |
| `/yazilar/etiket/[slug]` | `app/yazilar/etiket/[slug]/page.tsx` | `app/layout.tsx` |
| `/yazilar` | `app/yazilar/page.tsx` | `app/layout.tsx` |

Ana rota portfoy, AI Factory, yazilar, hakkinda ve bulten bolumlerini tek uzun anlatida birlestirir. Portfoy, yazilar, AI Factory ve metotlar hem liste hem dinamik detay rotalarina sahiptir.