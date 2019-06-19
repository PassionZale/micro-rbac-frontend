const router = {
  path: "user",
  name: "user",
  meta: { title: "用户设置" },
  redirect: { name: "user-list" },
  component: () => import("@/components/container/ContainerBase"),
  children: [
    { path: "/", name: "user-list", meta: { title: "用户列表" }, component: () => import("@/views/user/List") },
    { path: "detail", name: "user-detail", meta: { title: "用户详情" }, component: () => import("@/views/user/CreateOrUpdate") },
    { path: "create", name: "user-create", meta: { title: "用户新增" }, component: () => import("@/views/user/CreateOrUpdate") },
  ]
}

export default router