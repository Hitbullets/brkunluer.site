"use client"

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { components } from "./mdx-components"

interface MdxRendererClientProps {
  source: MDXRemoteSerializeResult | null
  fallback?: string
}

export function MdxRendererClient({ source, fallback }: MdxRendererClientProps) {
  if (!source) {
    return fallback ? (
      <div className="prose prose-neutral dark:prose-invert whitespace-pre-wrap">{fallback}</div>
    ) : null
  }
  return <MDXRemote {...source} components={components} />
}
