// webpack-dev-server host
const WEBPACK_DEV_SERVER_HOST = "localhost";

// webpack-dev-server port
const WEBPACK_DEV_SERVER_PORT = 8000;

// webpack-dev-server proxy target
const WEBPACK_DEV_SERVER_PROXY_TARGET = "http://127.0.0.1:18000";

// axios timeout
const TIMEOUT = 5000;

// axios baseURL
let baseURL;
switch (process.env.NODE_ENV) {
  // 测试环境
  case "fat":
    baseURL = "http://127.0.0.1:8000"; 
    break;
  // 生产环境
  case "production":
    baseURL = "";
    break;
  // 本地开发
  default:
    baseURL = "/api";
}

// BASE_URL module
const BASE_URL = baseURL;

// ENV module
const ENV = process.env.NODE_ENV;

module.exports = {
  BASE_URL,
  WEBPACK_DEV_SERVER_HOST,
  WEBPACK_DEV_SERVER_PORT,
  WEBPACK_DEV_SERVER_PROXY_TARGET,
  ENV,
  TIMEOUT
}
