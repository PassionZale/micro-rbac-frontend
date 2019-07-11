import { mapGetters } from "vuex"

const permissionExist = {
  computed: {
    ...mapGetters(["permission"])
  },

  methods: {
    resolvePermission(permissionCode) {
      return this.permission.permissions.find(item => item.code === permissionCode) ? true : false;
    }
  }
}

export default permissionExist;