const router = {
  path: "permission",
  name: "permission",
  meta: { title: "权限设置" },
  redirect: { name: "permission-list" },
  component: () => import("@/components/container/ContainerBase"),
  children: [
    { path: "/", name: "permission-list", meta: { title: "权限列表" }, component: () => import("@/views/permission/List") },
    { path: "detail", name: "permission-detail", meta: { title: "权限详情" }, component: () => import("@/views/example") },
    { path: "create", name: "permission-create", meta: { title: "权限新增" }, component: () => import("@/views/example") },
  ]
}

export default router