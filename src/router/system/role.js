const router = {
  path: "role",
  name: "role",
  meta: { title: "角色设置" },
  redirect: { name: "role-list" },
  component: () => import("@/components/container/ContainerBase"),
  children: [
    { path: "/", name: "role-list", meta: { title: "角色列表" }, component: () => import("@/views/role/List") },
    { path: "detail", name: "role-detail", meta: { title: "角色详情" }, component: () => import("@/views/role/CreateOrUpdate") },
    { path: "create", name: "role-create", meta: { title: "角色新增" }, component: () => import("@/views/role/CreateOrUpdate") },
  ]
}

export default router