import { createApp } from "vue";
import App from "./App.vue";
import "./index.scss";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
app.mount("#app");
