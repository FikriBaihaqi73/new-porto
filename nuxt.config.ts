import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "src/",
  serverDir: "src/server",
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@700&family=Roboto+Mono:wght@400&display=swap',
        },
      ],
    },
  },
  plugins: [
    '~/plugins/gsap.client.js',
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@prisma/client'],
    },
    resolve: {
      alias: {
        '.prisma/client/runtime/index-browser.js': '~/client-prisma-mock.js',
        '@prisma/client/runtime/index-browser': '~/client-prisma-mock.js',
      },
    },
    plugins: [
      tailwindcss(),
    ],
  },
});
