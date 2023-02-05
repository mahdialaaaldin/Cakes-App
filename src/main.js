import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/store.js";
import "./assets/main.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret);

// createApp(App).mount("#app");
createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
