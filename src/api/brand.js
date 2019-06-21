import http from "@/utils/http"

export const GET_BRANDS = params => {
  return http({
    method: "get",
    url: "/brands",
    params
  })
}

export const GET_BRANDS_FORMAT = (format = "select") => {
  return http({
    method: "get",
    url: `/brands/format/${format}`
  })
}

export const GET_BRAND = id => {
  return http({
    method: "get",
    url: `/brands/${id}`
  })
}

export const POST_BRAND = data => {
  return http({
    method: "post",
    url: "/brand",
    data
  })
}

export const PUT_BRAND = (id, data) => {
  return http({
    method: "put",
    url: `/brands/${id}`,
    data
  })
}

export const DELETE_BRAND = id => {
  return http({
    method: "delete",
    url: `/brands/${id}`
  })
}
