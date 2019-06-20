import http from "@/utils/http"

export const GET_USERS = params => {
  return http({
    method: "get",
    url: "/users",
    params
  })
}

export const GET_USER = id => {
  return http({
    method: "get",
    url: `/users/${id}`
  })
}

export const POST_USER = data => {
  return http({
    method: "post",
    url: "/user",
    data
  })
}

export const PUT_USER = (id, data) => {
  return http({
    method: "put",
    url: `/users/${id}`,
    data
  })
}

export const PUT_USER_PASSWORD = (id, data) => {
  return http({
    method: "put",
    url: `/users/${id}/password`,
    data
  })
}

export const DELETE_USER = id => {
  return http({
    method: "delete",
    url: `/users/${id}`
  })
}