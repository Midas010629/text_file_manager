import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Home from "../views/_HomeView.vue";

const routes = [
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
