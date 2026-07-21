import { NextResponse } from "next/server"
import { newsletterSchema } from "@/lib/validations"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const validation = newsletterSchema.safeParse(data)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Geçersiz e-posta" },
        { status: 400 },
      )
    }

    console.log("[newsletter] subscribe:", validation.data.email)

    return NextResponse.json({ success: true, message: "Başarıyla kayıt oldunuz!" })
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
