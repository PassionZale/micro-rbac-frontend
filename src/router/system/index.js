import permission from "./permission"
import role from "./role"
import user from "./user"

const router = {
  path: "/system",
  name: "system",
  meta: { title: "系统管理" },
  component: () => import("@/components/container"),
  children: [ permission, role, user ]
}

export default router