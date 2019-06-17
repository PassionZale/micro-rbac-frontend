<template>
  <div class="ContainerContent">
    <div class="main">
      <router-view :key="$route.name"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContainerContent"
};
</script>

<style lang="less">
.ContainerContent {
  margin-top: 65px;
  padding: 10px;
  .main {
    background-color: #ffffff;
    min-height: 300px;
  }
}
</style>

