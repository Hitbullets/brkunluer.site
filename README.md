This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## E-posta yayınları

Footer kayıt formu, Resend üzerindeki bir Contact kaydını oluşturur ve belirlenen segmente ekler. Var olan bir adres yeniden kayıt olursa, açık onayla abonelik durumu güncellenir. Form yalnızca aşağıdaki değişkenler ayarlı olduğunda açılır:

- `RESEND_API_KEY`: Resend API anahtarı. Bunu yerel geliştirmede `.env.local` dosyasına, canlı ortamda Vercel Project Settings > Environment Variables bölümüne ekleyin.
- `RESEND_NEWSLETTER_SEGMENT_ID`: Resend panelinde oluşturulan yayın segmentinin kimliği.

Vercel'de Production ortamına iki değişkeni ekledikten sonra yeni bir deployment oluşturun. Değişkenler eksikse form kapalı durumunu gösterir; API de kayıt varmış gibi başarı dönmez. Formdan kayıt almak e-posta göndermez veya yayınları takvime bağlamaz; yayınlar ayrıca Resend üzerinden oluşturulup gönderilir.
