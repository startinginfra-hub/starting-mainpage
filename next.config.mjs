import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Keep Turbopack scoped to this app (avoids broad parent-root memory pressure).
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.in" },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/intro", destination: "/", permanent: true },
      { source: "/intro/:path*", destination: "/", permanent: true },
      { source: "/jdlist/list", destination: "/jdlist", permanent: true },
      { source: "/jdlist/list/:path*", destination: "/jdlist", permanent: true },
      {
        source: "/(.*)",
        has: [{ type: "host", value: "blog.start-ing.kr" }],
        destination: "https://blog.starting.kr/",
        permanent: true,
      },
      { source: "/recruiting-partner", destination: "/", permanent: true },
      { source: "/faq", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig
