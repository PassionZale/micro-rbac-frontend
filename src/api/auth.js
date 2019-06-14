import http from "@/utils/http"

export const POST_LOGIN = data => {
  return http({
    method: "post",
    url: "/auth/login",
    data
  })
}

export const GET_USER_INFO = () => {
  return http({
    method: "get",
    url: "/auth/user",
  })
}