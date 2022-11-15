import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css";
// import "sweetalert2/dist/sweetalert2.min.css";
import App from "./App.vue";
import router from "./router";

const vm = createApp(App).use(createPinia()).use(router).mount("#app");

export default vm;
