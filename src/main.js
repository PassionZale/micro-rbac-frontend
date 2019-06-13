import App from "./App"
import Bus from "@/utils/bus"
import Vue from "vue"
import iView from "iview"
import "iview/dist/styles/iview.css"

Vue.use(Bus)
Vue.use(iView)

new Vue({
  el: "#app",
  render: h => h(App)
})










