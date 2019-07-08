const router = {
  name: "category",
  path: "/category",
  meta: { title: "分类管理", permissions: ["can select category"] },
  redirect: { name: "category-list" },
  component: () => import("@/components/container"),
  children: [
    { path: "/", name: "category-list", meta: { title: "分类列表", permissions: ["can select category"] }, component: () => import("@/views/category/List") },
    { path: "detail", name: "category-detail", meta: { title: "分类详情", permissions: ["can select category", "can update category"] }, component: () => import("@/views/category/CreateOrUpdate") },
    { path: "create", name: "category-create", meta: { title: "分类新增", permissions: ["can create category"] }, component: () => import("@/views/category/CreateOrUpdate") },
  ]
}

export default router