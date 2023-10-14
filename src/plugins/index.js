/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "@/router";
import store from "@/vuex";
import infiniteScroll from "vue-infinite-scroll";
import SplitInput from "vue-split-input";

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(router).use(store).use(infiniteScroll).use(SplitInput);
}
