import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],

  // 媒体资源短缓存 + 显式 MIME，避免 Hostinger CDN 长缓存错乱和 MIME 缺失
  // HTML 走 Next.js 默认的 no-cache；_next/static 走默认的 immutable
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        source: "/:path*\\.(mp4|webm)",
        headers: [
          { key: "Content-Type", value: "video/mp4" },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
          { key: "Accept-Ranges", value: "bytes" },
        ],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|gif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        source: "/:path*\\.(woff2|woff|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // next/image 自动输出 AVIF/WebP，控制 CDN 缓存时间与默认格式
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },

  async redirects() {
    return [
      { source: "/nutrition/:path*", destination: "/products", permanent: true },
      {
        source: "/aesthetic-technology/:path*",
        destination: "/products",
        permanent: true,
      },
      { source: "/science", destination: "/insights", permanent: true },
      { source: "/learn", destination: "/insights", permanent: true },
      { source: "/professional", destination: "/oem-odm", permanent: true },
      { source: "/support", destination: "/contact", permanent: true },
      { source: "/cart", destination: "/contact", permanent: true },
      { source: "/checkout", destination: "/contact", permanent: true },
      { source: "/account", destination: "/contact", permanent: true },
      { source: "/search", destination: "/insights", permanent: true },
    ];
  },
};

export default nextConfig;
