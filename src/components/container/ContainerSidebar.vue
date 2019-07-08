<template>
  <div class="ContainerSidebar">
    <Menu
      ref="sidebar-menu"
      theme="dark"
      width="auto"
      :active-name="activeName"
      :open-names="openNames"
    >
      <div v-for="item in menus">
        <Submenu v-if="item.children && item.children.length && !item.hasOwnProperty('redirect')" :name="item.name">
          <template slot="title">
            <Icon v-if="item.meta.icon" :type="item.meta.icon" />
            {{ item.meta.title }}
          </template>
          <MenuItem
            v-for="child in item.children"
            :key="child.name"
            :name="child.name"
            :to="child"
          >{{ child.meta.title }}</MenuItem>
        </Submenu>

        <MenuItem v-else :name="item.name" :to="item">
          <Icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          {{ item.meta.title }}
        </MenuItem>
      </div>
    </Menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContainerSidebar",

  data() {
    return {
      menus: [],

      openNames: [],

      activeName: ""
    };
  },

  computed: {
    ...mapGetters(["permission"])
  },

  watch: {
    $route() {
      this.initActiveMenu();
    }
  },

  created() {
    this.initMenu();
    this.initActiveMenu();
  },

  methods: {
    initMenu() {
      this.menus = this.permission.routes.filter(
        route => route.hidden !== true
      );
    },

    initActiveMenu() {
      this.openNames = [];

      const routeMatched = this.$route.matched;
      
      this.openNames.push(routeMatched[0]["name"]);

      if(routeMatched[0]["redirect"]) {
        this.activeName = routeMatched[0]["name"];
      } else {
        this.activeName = routeMatched[1]["name"];
      }

      this.$nextTick(() => {
        this.$refs["sidebar-menu"].updateOpened();
        this.$refs["sidebar-menu"].updateActiveName();
      });
    }
  }
};
</script>


<style lang="less">
.ContainerSidebar {
  height: 100%;
  width: 220px;
  position: fixed;
  z-index: 1000;
  top: 65px;
  left: 0;
  background-color: #515a6e;
  user-select: none;
}
</style>

