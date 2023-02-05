import { createWebHistory, createRouter } from "vue-router";
import Meals from "../components/Meals.vue";
import mealView from "../components/mealView.vue";
import About from "../components/About.vue";

const routes = [
  {
    path: "/",
    name: "Meals",
    component: Meals,
  },
  {
    path: "/Meals/:id",
    name: "meal",
    component: mealView,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
