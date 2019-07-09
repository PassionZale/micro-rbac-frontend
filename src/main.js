import App from "./App"
import Auth from "@/utils/auth"
import Bus from "@/utils/bus"
import Vue from "vue"
import * as filters from "./filters"
import iView from "iview"
import router from "./router"
import store from "@/vuex/store";

Vue.use(Bus)
Vue.use(iView)
Vue.use(store)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.devtools = true

const accessPath = ["/login", "/403", "/404"]

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  if (Auth.getToken()) {
    if (to.path === "/login") {
      next({ path: "/" })
      iView.LoadingBar.finish()
    } else {
      if (store.getters.user.id === "") {
        store.dispatch("InitUser").then(user => {

          store.dispatch("InitPermissionViaUser", user)
            .then(() => {
              router.addRoutes(store.getters.permission.addRoutes);
              next({ ...to, replace: true });
            }).catch(error => {
              console.log(error);
              Auth.removeToken()
              iView.Message.error("无法解析用户权限菜单")
              next({ path: "/login" })
              iView.LoadingBar.finish()
            })

        }).catch(error => {
          Auth.removeToken()
          if (error && error.action === "custom") {
            iView.Message.error(error.msg)
          }
          next({ path: "/login" })
          iView.LoadingBar.finish()
        })
      } else {
        next()
      }
    }
  } else {
    if (accessPath.indexOf(to.path) > -1) {
      next()
    } else {
      next({ path: "/login" });
      iView.LoadingBar.finish();
    }
  }
})

router.afterEach(router => {
  document.title = router.meta.title;
  iView.LoadingBar.finish()
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
})










