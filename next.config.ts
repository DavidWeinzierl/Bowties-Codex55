import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/Bowties-Codex55" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
