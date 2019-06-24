<template>
  <Select v-model="categoryId">
    <Option v-for="item in categories" :key="item.id" :value="item.id">{{ item.title }}</Option>
  </Select>
</template>

<script>
import { GET_CATEGORIES_FORMAT } from "@/api/category";

export default {
  name: "CategorySelect",

  props: {
    value: [String, Number]
  },

  data() {
    return {
      categoryId: this.value,

      categories: []
    };
  },

  watch: {
    value(val) {
      this.categoryId = val;
    },

    categoryId(val) {
      this.$emit("input", val);
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    loadData() {
      GET_CATEGORIES_FORMAT()
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
    }
  }
};
</script>

