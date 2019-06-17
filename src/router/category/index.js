const router = {
  name: "category",
  path: "/category",
  meta: { title: "分类管理" },
  redirect: { name: "category-list" },
  component: () => import("@/components/container"),
  children: [
    { path: "/", name: "category-list", meta: { title: "分类列表" }, component: () => import("@/views/example")},
    { path: "detail", name: "category-detail", meta: { title: "分类详情" }, component: () => import("@/views/example") },
    { path: "create", name: "category-update", meta: { title: "分类新增" }, component: () => import("@/views/example") },
  ]
}

export default router