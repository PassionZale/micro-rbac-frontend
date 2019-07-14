import { mapGetters } from "vuex"

const permissionValidator = {
  computed: {
    ...mapGetters(["user", "permission"])
  },

  methods: {
    resolvePermission(permissionCode) {
      if(this.user.is_superuser) return true;
      return this.permission.permissions.find(item => item.code === permissionCode) ? true : false;
    },

    resolveRoute(route, permissionCode = false) {
      const resolve = this.$router.resolve(route);

      let isRouteExist = false;

      try {
        const length = resolve.resolved.matched.length;
        if (length > 0) {
          isRouteExist = true;
        }
      } catch (error) {
        console.warning(error.message);
      }

      if(permissionCode !== false) isRouteExist = this.resolvePermission(permissionCode);

      isRouteExist ? this.$router.push(route) : this.$router.push("/403");
    }
  }
}

export default permissionValidator;