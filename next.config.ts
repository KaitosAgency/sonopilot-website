import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Qualités autorisées pour `next/image` — inclure toute valeur utilisée dans le code */
    qualities: [75, 80, 85, 90, 92, 95, 100],
    /** Largeurs plus hautes pour écrans retina sur captures pleine largeur */
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1920, 2048, 2560, 3840],
  },
};

export default nextConfig;
