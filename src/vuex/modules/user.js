import { GET_USER_INFO } from "@/api/auth"
import Auth from "@/utils/auth"

const user = {
  state: {
    id: "",
    username: "",
    is_superuser: false,
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_IS_SUPERUSER: (state) => {
      state.is_superuser = true
    },
    LOGOUT_USER: (state) => {
      state.id = "";
      state.username = "";
      state.is_superuser = false;
      Auth.logOut();
    }
  },

  actions: {
    InitUser({ commit }) {
      return new Promise((resolve, reject) => {
        GET_USER_INFO().then(response => {
          const user = response.data
          commit("SET_ID", user.id)
          commit("SET_USERNAME", user.username)
          user.is_superuser > 0 && commit("SET_IS_SUPERUSER")
          resolve(user)
        }).catch(error => {
          reject({action: "custom", msg: error.msg || "无法获取用户信息,请重新登陆"})
        })
      })
    },

    LogOut({ commit }) {
      commit("LOGOUT_USER")
    }
  }
}

export default user