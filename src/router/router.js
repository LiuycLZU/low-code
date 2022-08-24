import desktop from "@/page/desktop.vue";
import preview from "@/page/preview.vue";
import { createRouter, createWebHistory } from "vue-router";
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "desktop",
      component: desktop,
    },
    {
      path: "/preview",
      name: "preview",
      component: preview,
    },
  ],
});
