const router = {
  path: "role",
  name: "role",
  meta: { title: "角色设置", permissions: ["can select role"] },
  redirect: { name: "role-list" },
  component: () => import("@/components/container/ContainerBase"),
  children: [
    { path: "/", name: "role-list", meta: { title: "角色列表", permissions: ["can select role"] }, component: () => import("@/views/role/List") },
    { path: "detail", name: "role-detail", meta: { title: "角色详情", permissions: ["can update role"] }, component: () => import("@/views/role/CreateOrUpdate") },
    { path: "create", name: "role-create", meta: { title: "角色新增", permissions: ["can create role"] }, component: () => import("@/views/role/CreateOrUpdate") },
  ]
}

export default router