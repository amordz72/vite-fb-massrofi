import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Posts from "../views/posts/Index.vue";
import Post_create from "../views/posts/Create.vue";


const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  ,
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/post/create",
    name: "post_create",
    component: Post_create,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;