import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow the placeholder SVG portrait to be served via next/image.
    // Replace public/avatar.svg with a real JPG/PNG when you have one.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
