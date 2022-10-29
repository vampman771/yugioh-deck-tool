import "reflect-metadata";
import Vue, { createApp } from "vue";
import { bindApplicationApi } from "./api";
import App from "./App.vue";
import "./styles/main.scss";
import { ToastPlugin, VBModalPlugin, VBTogglePlugin } from "bootstrap-vue";
import store from "@/application/store/store";

import "vue-select/dist/vue-select.css";

Vue.use(ToastPlugin).use(VBModalPlugin).use(VBTogglePlugin);

createApp(App)
	.use(store)
	.mount("#deckToolApplication")
	.$nextTick(() => bindApplicationApi());
