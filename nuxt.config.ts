// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  runtimeConfig: {
    public: { wsUrl: "wss://data.elektron.art" },
  },
});
