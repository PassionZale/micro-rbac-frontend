<template>
  <div>
    <category-property-value 
      v-for="item in properties" 
      :key="item.property_id" 
      :property="item"></category-property-value>
  </div>
</template>

<script>
import { GET_CATEGORIES_PROPERTIES } from "@/api/category";
import CategoryPropertyValue from "./CategoryPropertyValue";
import { findComponentsDownward, descartes } from "@/utils/helper";

export default {
  name: "CategoryProperty",

  components: { CategoryPropertyValue },

  data() {
    return {
      properties: []
    };
  },

  created() {
    this.$bus.on("on-category-change", this.categoryChangeWatcher);

    this.$once("hook:beforeDestory", () => {
      this.$bus.off("on-category-change", this.categoryChangeWatcher);
    });
  },

  methods: {
    categoryChangeWatcher(categoryId) {
      if (categoryId) {
        GET_CATEGORIES_PROPERTIES(categoryId)
          .then(response => {
            this.properties = response.data;
          })
          .catch(() => {
            this.properties = [];
          });
      } else {
        this.properties = [];
      }
    },

    getSkuData() {
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

