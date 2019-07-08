import permission from "./permission"
import role from "./role"
import user from "./user"

const router = {
  path: "/system",
  name: "system",
  meta: { title: "系统管理", permissions: ["can select permission", "can select role", "can select user"] },
  component: () => import("@/components/container"),
  children: [ permission, role, user ]
}

export default router