import store from "../vuex";
import vuetify from "@/plugins/vuetify";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true, title: vuetify.locale.t("$vuetify.homepage") },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Auth/Login.vue"),
    meta: { title: "Login" },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Auth/Register.vue"),
    meta: { title: "Register" },
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: () => import("@/views/Auth/VerifyEmail.vue"),
    meta: { title: "Verify your email" },
  },
  {
    path: "/request-reset-password",
    name: "forget",
    component: () => import("@/views/Auth/RequestResetPassword.vue"),
    meta: { title: "Request Reset Password" },
  },
  {
    path: "/reset-password",
    name: "Reset",
    component: () => import("@/views/Auth/ResetPassword.vue"),
    meta: { title: "Reset password" },
  },
  {
    path: "/:pathMatch(.*)*",
    component: import("@/views/ErrorPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  document.title = to.meta.title;
  if (to.meta.requiresAuth && !store.state.token) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
  const admin = to.meta.admin
  if(store.state.authUser.user_type == 3 || store.state.authUser.user_type == 4){
    if(admin){
    }else{
      return {
        //path: "/admin",
        path: "/",
      };
    }
  }else{
    if(admin){
      return {
        path: "/",
      };
    }
  }
});

export default router;
