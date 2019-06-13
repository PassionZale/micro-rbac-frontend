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

  if (JWT_ERRORS_CODE.indexOf(code) > -1) {
    return Promise.reject({ action: "custom", msg: "登录过期,请重新登录!" })
  }

  if (code !== 200) {
    return Promise.reject(response.data);
  }

  return response.data;
}, error => {
  if(error.code === "ECONNABORTED") {
    return Promise.reject({ action: "custom", msg: "请求超时" })
  } else {
    return Promise.reject(error.response.data);
  }
});

export default http