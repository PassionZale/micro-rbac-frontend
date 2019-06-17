<template>
  <div class="ContainerHeader">
    <Dropdown trigger="click" style="float: right;">
      <a href="javascript:void(0)">
        click 触发
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: "ContainerHeader"
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

