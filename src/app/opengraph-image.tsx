import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1000px 500px at 20% -10%, #12203c 0%, #070b16 55%)",
          padding: "72px",
          color: "#e9edf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#05070d",
            }}
          >
            KM
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 960,
            }}
          >
            Software Engineer building secure, scalable web apps, FinTech &amp;
            enterprise software.
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["FinTech", "Full-Stack", "TypeScript", "Next.js"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 24,
                  color: "#93b4ff",
                  border: "1px solid #1c2740",
                  background: "#0d1424",
                  padding: "8px 18px",
                  borderRadius: 999,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#97a2b5" }}>{siteConfig.domain}</div>
      </div>
    ),
    { ...size }
  );
}
