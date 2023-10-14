/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import ar from "@/plugins/i18n/ar";
import en from "@/plugins/i18n/en";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  ssr: true,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
          secondary: "#5CBBF6",
        },
      },
    },
  },
  locale: {
    locale: localStorage.getItem("locale") == "en" ? "en" : "ar",
    fallback: localStorage.getItem("locale") == "en" ? "ar" : "en",
    messages: { ar, en },
    rtl: {
      ar: true,
    },
    ltr: {
      en: false,
    },
  },
});
