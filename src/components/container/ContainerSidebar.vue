<template>
  <div class="ContainerSidebar">
    <Menu theme="dark" width="auto">
      <MenuItem name="welcome" to="/welcome">
        <Icon type="md-document"/>欢迎
      </MenuItem>

      <Submenu name="system">
        <template slot="title">
          <Icon type="md-people"/>
          系统管理
        </template>
        <MenuItem name="permission" to="/system/permission">权限设置</MenuItem>
        <MenuItem name="role" to="/system/role">角色设置</MenuItem>
        <MenuItem name="user" to="/system/user">用户设置</MenuItem>
      </Submenu>

      <MenuItem name="brand" to="/brand">
        <Icon type="md-briefcase" />
        品牌管理
      </MenuItem>
      <MenuItem name="category" to="/category">
        <Icon type="ios-paper"/>
        分类管理
      </MenuItem>
      <MenuItem name="property" to="/property">
        <Icon type="ios-paper"/>
        属性管理
      </MenuItem>
      <MenuItem name="product" to="/product">
        <Icon type="ios-paper"/>
        商品管理
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  name: "ContainerSidebar"
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

