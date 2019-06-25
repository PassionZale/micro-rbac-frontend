import http from "@/utils/http"

export const GET_CATEGORIES = params => {
  return http({
    method: "get",
    url: "/categories",
    params
  })
}

export const GET_CATEGORIES_PROPERTIES = id => {
  return http({
    method: "get",
    url: `/categories/${id}/properties`
  })
}

export const GET_CATEGORIES_FORMAT = (format = "tree") => {
  return http({
    method: "get",
    url: `/categories/format/${format}`,
  })
}

export const GET_CATEGORY = id => {
  return http({
    method: "get",
    url: `/categories/${id}`
  })
}

export const POST_CATEGORY = data => {
  return http({
    method: "post",
    url: "/category",
    data
  })
}

export const PUT_CATEGORY = (id, data) => {
  return http({
    method: "put",
    url: `/categories/${id}`,
    data
  })
}

export const DELETE_CATEGORY = id => {
  return http({
    method: "delete",
    url: `/categories/${id}`
  })
}