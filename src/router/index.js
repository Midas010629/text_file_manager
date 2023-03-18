import { createRouter, createWebHistory } from "vue-router";
import Files from "../views/Files.vue";
// import Home from "../views/Home.vue";
const routes = [
  {
    path: "/:file(.*)",
    name: "file",
    component: Files,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
