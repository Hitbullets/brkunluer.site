import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function slugify(text: string): string {
  const map: Record<string, string> = {
    ğ: "g",
    G: "g",
    ü: "u",
    Ü: "u",
    ş: "s",
    Ş: "s",
    İ: "i",
    ı: "i",
    ö: "o",
    Ö: "o",
    ç: "c",
    Ç: "c",
  }
  return text
    .replace(/[ğGüÜşŞİıöÖçÇ]/g, (char) => map[char] ?? char)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
