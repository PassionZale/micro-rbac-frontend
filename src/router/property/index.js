const router = {
  name: "property",
  path: "/property",
  meta: { title: "属性管理" },
  redirect: { name: "property-list" },
  component: () => import("@/components/container"),
  children: [
    { path: "/", name: "property-list", meta: { title: "属性列表" }, component: () => import("@/views/example")},
    { path: "detail", name: "property-detail", meta: { title: "属性详情" }, component: () => import("@/views/example") },
    { path: "create", name: "property-update", meta: { title: "属性新增" }, component: () => import("@/views/example") },
  ]
}

export default router