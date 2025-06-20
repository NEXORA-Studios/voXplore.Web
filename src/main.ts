import "@/assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "@/App.vue";
import router from "@/modules/router";
import i18n from "@/modules/i18n";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(i18n);

// Load MockJS | Dev Only
if (import.meta.env.DEV || import.meta.env["VITE_USE_MOCK"]) {
    await import("@/modules/mocks");
    console.debug("🚧 MockJS is enabled, all requests will not be passed to backend.");
}

app.mount("#app");
