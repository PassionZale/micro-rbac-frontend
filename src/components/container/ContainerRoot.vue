<template>
  <div class="ContainerRoot">

    <container-sidebar></container-sidebar>

    <div style="margin-left: 220px;">
      <container-header></container-header>
      <container-content></container-content>
    </div>

  </div>
</template>

<script>
import ContainerHeader from "./ContainerHeader";
import ContainerContent from "./ContainerContent";
import ContainerSidebar from "./ContainerSidebar";

export default {
  name: "ContainerRoot",

  components: { ContainerHeader, ContainerContent, ContainerSidebar }
};
</script>

