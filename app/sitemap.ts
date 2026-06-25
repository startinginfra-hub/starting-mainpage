import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://starting.kr/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://starting.kr/jdlist", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://starting.kr/project", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://starting.kr/project/kosme-2025", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]
}
