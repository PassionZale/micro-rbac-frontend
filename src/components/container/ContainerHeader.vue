<template>
  <div class="ContainerHeader">
    <!-- <img src="/static/images/lovchun.jpg"> -->
    <div style="display: inline-block; width: 220px;height: 100%; background-color: #515a6e;">
      <img style="display: block; margin:10px auto auto;" src="/static/images/logo.png">
    </div>

    <div style="float:right;height: 100%;line-height: 65px;margin-right: 20px;">
      <Dropdown trigger="click" style="float: right;">
        <Button type="primary">
          {{ logouting ? "正在注销..." : user.username }}
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="profile()">个人中心</DropdownItem>
          <DropdownItem @click.native="logout()">注销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ContainerHeader",

  data() {
    return {
      logouting: false
    }
  },

  computed: {
    ...mapGetters(["user"])
  },

  methods: {
    ...mapActions(["LogOut"]),

    logout() {
      this.logouting = true;
      this.$nextTick(() => {
        this.LogOut();
      })
    },

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

