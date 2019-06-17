const router = {
  name: "brand",
  path: "/brand",
  meta: { title: "品牌管理" },
  redirect: { name: "brand-list" },
  component: () => import("@/components/container"),
  children: [
    { path: "/", name: "brand-list", meta: { title: "品牌列表" }, component: () => import("@/views/example")},
    { path: "detail", name: "brand-detail", meta: { title: "品牌详情" }, component: () => import("@/views/example") },
    { path: "create", name: "brand-update", meta: { title: "品牌新增" }, component: () => import("@/views/example") },
  ]
}

export default router