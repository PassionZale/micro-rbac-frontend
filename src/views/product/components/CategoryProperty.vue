<template>
  <div>
    <Spin v-show="spinShow" style="text-align: left;">
      <Icon type="ios-loading" size="14" class="spin-icon-load"></Icon>正在加载商品规格...
    </Spin>

    <div v-show="!spinShow">
      <category-property-value
        v-for="item in properties"
        :key="item.property_id"
        :property="item"
        :property-checked="initProperties.filter(p => p.property_id === item.property_id)"
      ></category-property-value>
    </div>
  </div>
</template>

<script>
import { GET_CATEGORIES_PROPERTIES } from "@/api/category";
import CategoryPropertyValue from "./CategoryPropertyValue";
import { findComponentsDownward, descartes } from "@/utils/helper";

export default {
  name: "CategoryProperty",

  components: { CategoryPropertyValue },

  props: {
    initProperties: {
      type: [Array],
      default: () => []
    }
  },

  data() {
    return {
      properties: [],

      spinShow: false
    };
  },

  created() {
    this.$bus.on("on-category-change", this.categoryChangeWatcher);

    // 若不 off 掉句柄函数, 则每次 CategoryProperty created 时, 会数次执行 categoryChangeWatcher()
    this.$once("hook:beforeDestroy", () => {
      this.$bus.off("on-category-change", this.categoryChangeWatcher);
    });
  },

  methods: {
    categoryChangeWatcher(categoryId) {
      console.log(categoryId);
      if (categoryId) {
        this.spinShow = true;
        GET_CATEGORIES_PROPERTIES(categoryId)
          .then(response => {
            this.properties = response.data;
            this.$nextTick(() => {
              this.spinShow = false;
            });
          })
          .catch(() => {
            this.properties = [];
            this.$nextTick(() => {
              this.spinShow = false;
            });
          });
      } else {
        this.properties = [];
      }
    },

    propertySelection() {
      const components = findComponentsDownward(this, "CategoryPropertyValue");
      let selection = [];
      components.map(component => {
        const componentSelection = component.selection();
        if (componentSelection.length) {
          selection.push(componentSelection);
        }
      });

      if (selection.length) {
        selection = descartes(selection);
      }

      console.log(selection);

      return selection;
    }
  }
};
</script>

<style lang="less">
.spin-icon-load {
  animation: animate-spin 1s linear infinite;
}

@keyframes animate-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
