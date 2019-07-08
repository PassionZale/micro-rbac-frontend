const router = {
  path: "permission",
  name: "permission",
  meta: { title: "权限设置", permissions: ["can select permission"] },
  redirect: { name: "permission-list" },
  component: () => import("@/components/container/ContainerBase"),
  children: [
    { path: "/", name: "permission-list", meta: { title: "权限列表", permissions: ["can select permission"] }, component: () => import("@/views/permission/List") },
    { path: "detail", name: "permission-detail", meta: { title: "权限详情", permissions: ["can select permission", "can update permission"] }, component: () => import("@/views/permission/CreateOrUpdate") },
    { path: "create", name: "permission-create", meta: { title: "权限新增", permissions: ["can create permission"] }, component: () => import("@/views/permission/CreateOrUpdate") },
  ]
}

export default router