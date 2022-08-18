import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { createPinia } from 'pinia' ;//pinia
import "@/assets/base.css"; //全局css
import mitt from "mitt";//事件总线
const pinia = createPinia()
const app = createApp(App);
app.config.globalProperties.$mitt = mitt();
app.use(Antd).use(pinia).mount("#app");
