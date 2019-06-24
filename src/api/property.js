import http from "@/utils/http"

export const GET_PROPERTIES = params => {
  return http({
    method: "get",
    url: "/properties",
    params
  })
}

export const GET_PROPERTIES_FORMAT = (format = "tree") => {
  return http({
    method: "get",
    url: `/properties/format/${format}`
  })
}

export const GET_PROPERTY = id => {
  return http({
    method: "get",
    url: `/properties/${id}`
  })
}

export const POST_PROPERTY = data => {
  return http({
    method: "post",
    url: "/property",
    data
  })
}

export const PUT_PROPERTY = (id, data) => {
  return http({
    method: "put",
    url: `/properties/${id}`,
    data
  })
}

export const DELETE_PROPERTY = id => {
  return http({
    method: "delete",
    url: `/properties/${id}`
  })
}

export const GET_PROPERTY_VALUES = params => {
  return http({
    method: "get",
    url: `/property/values`,
    params
  })
}