import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const validation = contactSchema.safeParse(data)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Geçersiz form verisi" },
        { status: 400 },
      )
    }

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "brkunluer.site <noreply@brkunluer.site>",
        to: ["merhaba@brkunluer.site"],
        subject: `[brkunluer.site] ${validation.data.subject}`,
        replyTo: validation.data.email,
        text: `
Gönderen: ${validation.data.name} <${validation.data.email}>
Konu: ${validation.data.subject}

${validation.data.message}
        `.trim(),
      })
    } else {
      console.log("[contact] message:", validation.data)
    }

    return NextResponse.json({ success: true, message: "Mesaj gönderildi" })
  } catch {
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
