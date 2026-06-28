// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  fonts: [{
    provider: fontProviders.bunny(),
    name: "Space Grotesk",
    cssVariable: "--font-space-grotesk",
  }]
});
