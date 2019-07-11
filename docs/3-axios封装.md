axios 一些封装取决于服务端的约定，需要至少与服务端约定以下事宜：

- 调用 API 时令牌放在哪，如：headers

- 令牌对应的 key 是什么，如：Authorization

- 在 HTTP STATUS CODE 为 200 时，通过什么标识码去判断 API 此时返回的是错误信息

- 在 HTTP STATUS CODE 非 200 时，令牌不合法对应的标识码是什么

- 客户端要显示服务端返回的错误信息时，从哪个 key 中去取，如：message

```javascript
import axios from "axios"
import Auth from "@/utils/auth"
import { JWT_ERRORS_CODE } from "@/utils/constants"
import { TIMEOUT, BASE_URL } from "@/utils/env"

const http = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});

http.interceptors.request.use(config => {
  const jwt = Auth.getToken();
  // 调用 API 时令牌放在哪，如：headers
  // 令牌对应的 key 是什么，如：Authorization
  jwt && (config.headers["Authorization"] = jwt);
  return config;
}, error => {
  Promise.reject(error);
});

http.interceptors.response.use(response => {
  const code = response.data.code;

  // 在 HTTP STATUS CODE 为 200 时，通过什么标识码去判断 API 此时返回的是错误信息
  if (code !== 200) {
    return Promise.reject(response.data);
  }

  return response.data;
}, error => {
  if(error.code === "ECONNABORTED") {
    return Promise.reject({ action: "custom", message: "请求超时" })
  } else if(error.response.data.code && JWT_ERRORS_CODE.indexOf(error.response.data.code) > -1) {
    // 在 HTTP STATUS CODE 非 200 时，令牌不合法对应的标识码是什么
    return Promise.reject({ action: "custom", message: "登录异常,请重新登录!" })
  } else {
    return Promise.reject(error.response.data);
  }
});

http
  .get("/auth/user")
  .then()
  .catch(error => {
    // 客户端要显示服务端返回的错误信息时，从哪个 key 中去取，如：message
    alert(error.message);
  });
```
