<template>
  <Cascader style="width: 16em" v-model="selections" :data="categories" @on-change="change"></Cascader>
</template>

<script>
import { GET_CATEGORIES_FORMAT } from "@/api/category";

export default {
  name: "CategoryCascader",

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      selections: [],
      categories: []
    }
  },

  watch: {
    value: {
      handler() {
        this.updateSelections();
      },
      immediate: true
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    updateSelections() {
      this.selections = this.value.map(item => item);
    },

    loadData() {
      GET_CATEGORIES_FORMAT("cascader").then(response => {
        this.categories = response.data;
      })
    },

    change(value) {
      this.$emit("input", value);
    }
  }
}
</script>

