<template>
  <div class="ContainerHeader">
    <img src="/static/images/lovchun.jpg">

    <div style="float:right;height: 100%;line-height: 65px;margin-right: 20px;">
      <Dropdown trigger="click" style="float: right;">
        <Button type="primary">
          {{ user.username }}
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="profile()">个人中心</DropdownItem>
          <DropdownItem @click.native="LogOut()">注销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ContainerHeader",

  computed: {
    ...mapGetters(["user"])
  },

  methods: {
    ...mapActions(["LogOut"]),

    profile() {
      this.$router.push({ name: "profile" });
    }
  }
};
</script>

<style lang="less">
.ContainerHeader {
  background-color: #ffffff;
  height: 65px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
}
</style>

