const router = {
  name: "brand",
  path: "/brand",
  meta: { title: "品牌管理" },
  redirect: { name: "brand-list" },
  component: () => import("@/components/container"),
  children: [
    { path: "/", name: "brand-list", meta: { title: "品牌列表", permissions: ["can select brand"] }, component: () => import("@/views/brand/List")},
  ]
}

export default router