import { createApp } from "vue";
import type { ApplicationApi } from "./api";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./styles/main.scss";
import { ToastPlugin, VBModalPlugin, VBTogglePlugin } from "bootstrap-vue";
import { useBridge } from "@/application/bridge";

declare global {
	interface Window {
		yugiohDeckToolApplication?: ApplicationApi;
	}
}

const app = createApp(App);

app.use(createPinia());
app.use(ToastPlugin);
app.use(VBModalPlugin);
app.use(VBTogglePlugin);

app.mount("#deckToolApplication").$nextTick(() => {
	window.yugiohDeckToolApplication = useBridge();
});
