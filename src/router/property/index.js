const router = {
  name: "property",
  path: "/property",
  meta: { title: "属性管理" },
  redirect: { name: "property-list" },
  component: () => import("@/components/container"),
  children: [
    { path: "/", name: "property-list", meta: { title: "属性列表", permissions: ["can select property"] }, component: () => import("@/views/property/List")}
  ]
}

export default router