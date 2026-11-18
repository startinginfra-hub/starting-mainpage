import type { JsonLd } from "@/lib/seo/json-ld"

type JsonLdScriptProps = {
  data: JsonLd | JsonLd[]
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
