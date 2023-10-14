/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "@/App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

//Import Global Components
import LangSwitch from "@/components/LangSwitcher.vue";
import UserMenu from "@/components/UserMenu.vue";


import http from "@/service/api";

const app = createApp(App);
app.config.globalProperties.$http = http; // Allow axios in all componenets this.$http

registerPlugins(app);

//Global Components
app.component("lang-switch", LangSwitch);
app.component("user-menu", UserMenu);

app.mount("#app");
