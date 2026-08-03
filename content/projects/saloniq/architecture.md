# SalonIQ App | Online Rezervasyon & Akıllı İşyeri Yönetimi — Mimari

## Mimari özet

Frontend, server, landing ve araç paketlerinden oluşan monorepo; Supabase RLS ile tenant sınırı. [S020] [S021] [S022] [S023] [S220]

## Teknik kararlar

- Gerçek zamanlı değişiklikler için Supabase + polling yedeği
- PayTR ödeme katmanı
- Sürüm ve dalga bazlı kanonik dokümantasyon

## Zorluklar

- Çok kiracılı veri izolasyonu
- Ödeme güvenliği
- Stok-kasa tutarlılığı
