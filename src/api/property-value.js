import http from "@/utils/http"

export const GET_PROPERTY_VALUES = params => {
  return http({
    method: "get",
    url: `/property/values`,
    params
  })
}

export const GET_PROPERTY_VALUE = id => {
  return http({
    method: "get",
    url: `/property/values/${id}`
  })
}

export const POST_PROPERTY_VALUE = data => {
  return http({
    method: "post",
    url: "/property/value",
    data
  })
}

export const PUT_PROPERTY_VALUE = (id, data) => {
  return http({
    method: "put",
    url: `/property/values/${id}`,
    data
  })
}

export const DELETE_PROPERTY_VALUE = id => {
  return http({
    method: "delete",
    url: `/property/values/${id}`
  })
}

