# Superdesign Bilesen Adaylari

## Header
- Source: `components/layout/header.tsx`
- Category: layout
- Description: Ana marka, masaustu/mobil navigasyon ve tema anahtari.
- Extractable props: activeItem (string, default: home), homeHref (string, default: /), showThemeToggle (boolean, default: true)
- Hardcoded: marka ismi, menu etiketleri, ikonlar ve stiller

## Footer
- Source: `components/layout/footer.tsx`
- Category: layout
- Description: Bulten cagrisi, site haritasi ve sosyal baglantilar.
- Extractable props: showNewsletter (boolean, default: true), homeHref (string, default: /)
- Hardcoded: kolon etiketleri, sosyal ikonlar ve stiller

## Container
- Source: `components/layout/container.tsx`
- Category: layout
- Description: Sayfa genisligi ve bolum bosluklari.
- Extractable props: yok
- Hardcoded: genislik, bosluk ve breakpoint siniflari

## Hero
- Source: `components/layout/hero.tsx`
- Category: layout
- Description: Baslik, aciklama ve CTA iceren ortak hero.
- Extractable props: primaryHref (string, default: /ai-factory), secondaryHref (string, default: /portfolyo), showTrustSignals (boolean, default: true)
- Hardcoded: tipografi, yerlesim ve ikonlar

## Button
- Source: `components/ui/button.tsx`
- Category: basic
- Description: Birincil, ikincil, outline ve ghost eylemler.
- Extractable props: yok
- Hardcoded: varyant ve boyut siniflari

## Card
- Source: `components/ui/card.tsx`
- Category: basic
- Description: Icerik, metot ve proje yuzeyleri.
- Extractable props: isActive (boolean, default: false)
- Hardcoded: kart siniflari, golge ve kenarliklar