import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Posts from "../views/posts/Index.vue";
import PostCreate from "../views/posts/Create.vue";
import Users from "../views/Users/Index.vue";
import Tasks from "../views/Tasks/Index.vue";


const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
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
    name: "PostCreate",
    component: PostCreate,
  }
  ,
  {
    path: "/users",
    name: "users",
    component: Users,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;