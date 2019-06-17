const router = {
  name: "product",
  path: "/product",
  meta: { title: "商品管理" },
  redirect: { name: "product-list" },
  component: () => import("@/components/container"),
  children: [
    { path: "/", name: "product-list", meta: { title: "商品列表" }, component: () => import("@/views/example")},
    { path: "detail", name: "product-detail", meta: { title: "商品详情" }, component: () => import("@/views/example") },
    { path: "create", name: "product-update", meta: { title: "商品新增" }, component: () => import("@/views/example") },
  ]
}

export default router