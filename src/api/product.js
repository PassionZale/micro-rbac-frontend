import http from "@/utils/http"

export const GET_PRODUCTS = params => {
  return http({
    method: "get",
    url: "/products",
    params
  })
}

export const GET_PRODUCT = id => {
  return http({
    method: "get",
    url: `/products/${id}`
  })
}

export const POST_PRODUCT = data => {
  return http({
    method: "post",
    url: "/product",
    data
  })
}

export const PUT_PRODUCT = (id, data) => {
  return http({
    method: "put",
    url: `/products/${id}`,
    data
  })
}

export const DELETE_PRODUCT = id => {
  return http({
    method: "delete",
    url: `/products/${id}`
  })
}