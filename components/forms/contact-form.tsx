"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { contactSchema } from "@/lib/validations"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setStatus("loading")
    setMessage("")

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      honeypot: (formData.get("honeypot") as string) || undefined,
    }

    const validation = contactSchema.safeParse(data)
    if (!validation.success) {
      setStatus("error")
      setMessage(validation.error.issues[0]?.message || "Form bilgilerini kontrol edin.")
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      })

      if (res.ok) {
        setStatus("success")
        setMessage("Mesajınız gönderildi. En kısa sürede size dönüş yapacağım.")
        formRef.current?.reset()
      } else {
        setStatus("error")
        setMessage("Bir hata oluştu. Lütfen tekrar deneyin.")
      }
    } catch {
      setStatus("error")
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.")
    }
  }

  return (
    <>
      <h2 className="text-heading-lg font-semibold tracking-tight mb-2">Mesaj Gönder</h2>
      <p className="text-body text-muted-foreground mb-8">Proje teklifleri, sorularınız veya iş birliği fikirleriniz için formu doldurun.</p>

      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" readOnly />

        <div>
          <Label htmlFor="name">Adınız</Label>
          <Input id="name" name="name" autoComplete="name" required placeholder="Adınız ve soyadınız" />
        </div>

        <div>
          <Label htmlFor="email">E-posta</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required placeholder="ornek@eposta.com" />
        </div>

        <div>
          <Label htmlFor="subject">Konu</Label>
          <Input id="subject" name="subject" required placeholder="Mesajınızın konusu" />
        </div>

        <div>
          <Label htmlFor="message">Mesaj</Label>
          <Textarea id="message" name="message" required placeholder="Mesajınızı buraya yazın." />
        </div>

        {message && (
          <p aria-live="polite" className={cn("text-sm", status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>{message}</p>
        )}

        <Button type="submit" variant="primary" size="lg" loading={status === "loading"}>{status === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}</Button>
      </form>
    </>
  )
}
