import { basicRoutes, dynamicRoutes } from "@/router"

function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some(permission => route.meta.permissions.indexOf(permission.code) > -1);
  } else {
    return true;
  }
}

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    roles: [],
    permissions: []
  },

  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = basicRoutes.concat(routes); 
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // allpermission
    InitPermissionViaUser({ commit }, user) {
      return new Promise(resolve => {
        let accessRoutes = "";
        if(user.is_superuser == 1) {
          accessRoutes = dynamicRoutes
        } else {
          accessRoutes = dynamicRoutes.filter(v => {
            if (hasPermission(user.permissions, v)) {
              if (v.children && v.children.length) {
                v.children = v.children.filter(child => {
                  if (hasPermission(user.permissions, child)) {
                    return child;
                  }
                  return false;
                });
                return v;
              } else {
                return v;
              }
            }
            return false;
          });
        }
        commit("SET_ROLES", user.roles);
        commit("SET_PERMISSIONS", user.permissions);
        commit("SET_ROUTES", accessRoutes);
        resolve()
      })
    }
  }
}

export default permission