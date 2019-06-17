const permission = {
  state: {
    menus: [],
    roles: [],
    permissions: []
  },

  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    InitPermissionViaUser({ commit }, user) {
      return new Promise(resolve => {
        commit("SET_ROLES", user.roles)
        commit("SET_PERMISSIONS", user.permissions)
        resolve()
      })
    }
  }
}

export default permission