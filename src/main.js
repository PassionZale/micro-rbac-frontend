import App from "./App"
import Bus from "@/utils/bus"
import Vue from "vue"
import iView from "iview"
import router from "./router"

Vue.use(Bus)
Vue.use(iView)

new Vue({
  el: "#app",
  router,
  render: h => h(App)
})










