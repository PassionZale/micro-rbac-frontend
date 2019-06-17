const router = {
  path: "user",
  name: "user",
  meta: { title: "用户设置" },
  redirect: { name: "user-list" },
  component: () => import("@/components/container/ContainerBase"),
  children: [
    { path: "/", name: "user-list", meta: { title: "用户列表" }, component: () => import("@/views/example") },
    { path: "detail", name: "user-detail", meta: { title: "用户详情" }, component: () => import("@/views/example") },
    { path: "create", name: "user-update", meta: { title: "用户新增" }, component: () => import("@/views/example") },
  ]
}

export default router