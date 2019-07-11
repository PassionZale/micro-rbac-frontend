const routeExist = {
  methods: {
    resolveRoute(route) {
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

      isRouteExist ? this.$router.push(route) : this.$router.push("/403");
    }
  }
}

export default routeExist;