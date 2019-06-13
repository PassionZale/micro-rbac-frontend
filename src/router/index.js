import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

export const routes = [
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    hidden: true,
    component: () => import("@/views/auth/Login")
  },

  {
    path: "/404",
    name: "404",
    meta: { title: "PAGE NOT FOUND" },
    hidden: true,
    component: () => import("@/views/errors/404")
  },

  {
    path: "*",
    hidden: true,
    redirect: { name: "404" }
  }
]