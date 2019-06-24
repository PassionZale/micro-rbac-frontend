const router = {
  name: "product",
  path: "/product",
  meta: { title: "商品管理" },
  redirect: { name: "product-list" },
  component: () => import("@/components/container"),
  children: [
    { path: "/", name: "product-list", meta: { title: "商品列表" }, component: () => import("@/views/product/List")},
    { path: "detail", name: "product-detail", meta: { title: "商品详情" }, component: () => import("@/views/product/CreateOrUpdate") },
    { path: "create", name: "product-create", meta: { title: "商品新增" }, component: () => import("@/views/product/CreateOrUpdate") },
  ]
}

export default router