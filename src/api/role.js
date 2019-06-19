import http from "@/utils/http"

export const GET_ROLES = params => {
  return http({
    method: "get",
    url: "/roles",
    params
  })
}

export const GET_ROLE = id => {
  return http({
    method: "get",
    url: `/roles/${id}`
  })
}

export const POST_ROLE = data => {
  return http({
    method: "post",
    url: "/role",
    data
  })
}

export const PUT_ROLE = (id, data) => {
  return http({
    method: "put",
    url: `/roles/${id}`,
    data
  })
}

export const DELETE_ROLE = id => {
  return http({
    method: "delete",
    url: `/roles/${id}`
  })
}