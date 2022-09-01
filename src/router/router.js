import desktop from "@/page/desktop.vue";
import preview from "@/page/preview.vue";
import { createRouter, createWebHistory } from "vue-router";
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "desktop",
      meta: {
        keepAlive: true //设置页面是否需要使用缓存
    },
      component: desktop,
    },
    {
      path: "/preview",
      name: "preview",
      component: preview,
    },
  ],
});
