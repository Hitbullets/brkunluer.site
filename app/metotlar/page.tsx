import { Metadata } from "next"
import { Container, Grid } from "@/components/layout/container"
import { MethodCard } from "@/components/cards/method-card"
import { PageHeader } from "@/components/ui/section-header"
import { getAllMethods } from "@/lib/content"

export const metadata: Metadata = {
  alternates: { canonical: '/metotlar' },
  title: "AI Metotları ve İş Akışı Şablonları",
  description: "AI iş akışları, otomasyon ve sistem tasarımı için uygulanabilir metotları, şablonları ve dijital ürünleri keşfedin.",
}

export default async function MethodsPage() {
  const methods = await getAllMethods()

  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <PageHeader
        title="AI Metotları ve Şablonları"
        description="Üretkenliği artıran hazır sistemleri, iş akışı şablonlarını ve dijital ürünleri inceleyin."
        badge="Dijital Ürünler"
      />

      {methods.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-6">Yakında yeni metotlar eklenecek.</p>
        </div>
      ) : (
        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap={6}>
          {methods.map((method) => (
            <MethodCard key={method.slug} method={method} />
          ))}
        </Grid>
      )}
    </Container>
  )
}
