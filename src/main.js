import { createApp } from "vue";
import router from "./router";
import store from "./store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.js";

// import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.vue";

createApp(App).use(store).use(router).mount("#app");
