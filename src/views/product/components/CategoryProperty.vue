<template>
  <div>
    <Spin v-show="spinShow" style="text-align: left;">
      <Icon type="ios-loading" size="14" class="spin-icon-load"></Icon>正在加载商品规格...
    </Spin>

    <div v-show="!spinShow">
      <category-property-value
        v-for="(item, index) in properties"
        :key="item.property_id"
        @on-create-btn-click="properyValueCreateClick(item, index)"
        :property="item"
        :property-checked="initProperties.filter(p => p.property_id === item.property_id)"
      ></category-property-value>
    </div>

    <category-property-value-create-modal
      v-model="modal.show" 
      :title="modal.title"
      :property-id="modal.propertyId" 
      @on-success="propertyValueCreateSuccess"
    ></category-property-value-create-modal>
  </div>
</template>

<script>
import { GET_CATEGORIES_PROPERTIES } from "@/api/category";
import CategoryPropertyValue from "./CategoryPropertyValue";
import CategoryPropertyValueCreateModal from "./CategoryPropertyValueCreateModal";
import { findComponentsDownward, descartes } from "@/utils/helper";

export default {
  name: "CategoryProperty",

  components: { CategoryPropertyValue, CategoryPropertyValueCreateModal },

  props: {
    initProperties: {
      type: [Array],
      default: () => []
    }
  },

  data() {
    return {
      spinShow: false,

      properties: [],

      modal: {
        // 模态框显示状态
        show: false,
        // 模态框标题
        title: "",
        // 当前 CategoryProperValue 索引
        index: "",
        // Property Id
        propertyId: ""
      },
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
    },

    properyValueCreateClick(property, index) {
      this.modal.title = property.property_name;
      this.modal.propertyId = property.property_id;
      this.modal.index = index;
      this.$nextTick(() => {
        this.modal.show = !this.modal.show;
      });
    },

    propertyValueCreateSuccess(property_value) {
      this.properties[this.modal.index]["property_values"].push(property_value);
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
