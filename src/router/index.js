import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/_HomeView.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/:file(.*)",
    name: "_Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
