import Vue from "vue"
import VueRouter from "vue-router"

import system from "./system"
import brand from "./brand"
import category from "./category"
import property from "./property"
import product from "./product"

Vue.use(VueRouter)

export const basicRoutes = [
  {
    path: "/",
    name: "root",
    redirect: { name: "welcome" },
    component: () => import("@/components/container"),
    hidden: true,
    children: [
      { path: "welcome", name: "welcome", meta: { title: "欢迎" }, component: () => import("@/views/example") },
      { path: "profile", name: "profile", meta: { title: "个人中心" }, component: () => import("@/views/example") },
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
    path: "/403",
    name: "403",
    meta: { title: "Forbidden" },
    hidden: true,
    props: {
      code: 403,
      desc: "Forbidden",
      remark: "Access to this resource on the server is denied!" 
    },
    component: () => import("@/views/errors/ErrorView")
  },

  {
    path: "/404",
    name: "404",
    meta: { title: "Not found" },
    hidden: true,
    props: {
      code: 404,
      desc: "Not Found",
      remark: "This is not the web page you are looking for" 
    },
    component: () => import("@/views/errors/ErrorView")
  },
]

export default new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes: basicRoutes
});

export const dynamicRoutes = [
  system,

  brand,

  category,

  property,

  product,

  {
    path: "*",
    hidden: true,
    redirect: { name: "404" }
  }
]

// export const routes = [
//   {
//     path: "/",
//     name: "root",
//     redirect: { name: "welcome" },
//     component: () => import("@/components/container"),
//     hidden: true,
//     children: [
//       { path: "welcome", name: "welcome", meta: { title: "欢迎" }, component: () => import("@/views/example") },
//       { path: "profile", name: "profile", meta: { title: "个人中心" }, component: () => import("@/views/example") },
//     ]
//   },

//   {
//     path: "/login",
//     name: "login",
//     meta: { title: "登录" },
//     hidden: true,
//     component: () => import("@/views/auth/Login")
//   },

//   {
//     path: "/404",
//     name: "404",
//     meta: { title: "PAGE NOT FOUND" },
//     hidden: true,
//     component: () => import("@/views/errors/404")
//   },

//   system,

//   brand,

//   category,

//   property,

//   product,

//   {
//     path: "*",
//     hidden: true,
//     redirect: { name: "404" }
//   }
// ]

// export default new VueRouter({
//   mode: "hash",
//   scrollBehavior: () => ({ y: 0 }),
//   routes
// })