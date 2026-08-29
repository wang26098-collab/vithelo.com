import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
