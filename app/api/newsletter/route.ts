import { NextResponse } from "next/server"
import { newsletterSchema } from "@/lib/validations"
import { subscribeToNewsletter } from "@/lib/newsletter"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  let data: unknown

  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 })
  }

  const validation = newsletterSchema.safeParse(data)

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0]?.message || "Geçersiz e-posta" },
      { status: 400 },
    )
  }

  try {
    const result = await subscribeToNewsletter(validation.data.email.trim().toLowerCase())

    if (result === "not_configured") {
      return NextResponse.json(
        { error: "Yayınlara e-posta ile kayıt şu anda kapalı." },
        { status: 503 },
      )
    }

    if (result === "failed") {
      return NextResponse.json(
        { error: "Kaydınız şu anda tamamlanamadı. Biraz sonra yeniden deneyin." },
        { status: 502 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Yayın duyuruları için kaydınız tamamlandı.",
    })
  } catch {
    return NextResponse.json(
      { error: "Kaydınız şu anda tamamlanamadı. Biraz sonra yeniden deneyin." },
      { status: 502 },
    )
  }
}
