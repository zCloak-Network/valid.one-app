import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    nodePolyfills(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "pwa-maskable-192x192.png",
        "pwa-maskable-512x512.png",
      ],
      manifest: {
        name: "Valid One PWA",
        short_name: "Valid.One",
        description: "An easy-onboard, secure identity management solution",
        theme_color: "#ffffff",
        start_url: "./?utm_source=web_app_manifest",
        id: "./?utm_source=web_app_manifest",
        display: "standalone",
        scope: "/",
        icons: [
          {
            src: "/images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/images/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/images/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/images/narrow.png",
            type: "image/png",
            sizes: "540x720",
            form_factor: "narrow",
          },
          {
            src: "/images/wide.png",
            type: "image/png",
            sizes: "720x500",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
  build: {
    outDir: "./dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: { global: "window" },
});
