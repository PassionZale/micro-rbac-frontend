import axios from "axios"
import Auth from "@/utils/auth"
import { JWT_ERRORS_CODE } from "@/utils/constants"
import { TIMEOUT, BASE_URL } from "@/utils/env"

const http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

http.interceptors.request.use(config => {
  const jwt = Auth.getToken();
  jwt && (config.headers["Authorization"] = jwt);
  return config;
}, error => {
  Promise.reject(error);
});

http.interceptors.response.use(response => {
  const code = response.data.code;

  if (code !== 200) {
    return Promise.reject(response.data);
  }

  return response.data;
}, error => {
  if(error.code === "ECONNABORTED") {
    return Promise.reject({ action: "custom", message: "请求超时" })
  } else if(error.response.data.code && JWT_ERRORS_CODE.indexOf(error.response.data.code) > -1) {
    return Promise.reject({ action: "custom", message: "登录异常,请重新登录!" })
  } else {
    return Promise.reject(error.response.data);
  }
});

export default http