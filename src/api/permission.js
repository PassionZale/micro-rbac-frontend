import http from "@/utils/http"

export const GET_PERMISSIONS = params => {
  return http({
    method: "get",
    url: "/permissions",
    params
  })
}

export const GET_PERMISSIONS_FORMAT = (format = "checkbox") => {
  return http({
    method: "get",
    url: `/permissions/format/${format}`
  })
}

export const GET_PERMISSION = id => {
  return http({
    method: "get",
    url: `/permissions/${id}`
  })
}

export const POST_PERMISSION = data => {
  return http({
    method: "post",
    url: "/permission",
    data
  })
}

export const PUT_PERMISSION = (id, data) => {
  return http({
    method: "put",
    url: `/permissions/${id}`,
    data
  })
}

export const DELETE_PERMISSION = id => {
  return http({
    method: "delete",
    url: `/permissions/${id}`
  })
}