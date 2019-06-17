import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

export const routes = [
  {
    path: "/",
    name: "root",
    redirect: { name: "welcome" },
    component: () => import("@/components/container"),
    hidden: true,
    children: [
      { path: "welcome", name: "welcome", meta: { title: "欢迎" }, component: () => import("@/views/example") }
    ]
  },


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

export default new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes
})