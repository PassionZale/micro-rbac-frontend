<template>
  <Select v-model="brandId">
    <Option v-for="item in brands" :key="item.id" :label="item.id">{{ item.name }}</Option>
  </Select>
</template>

<script>
import { GET_BRANDS_FORMAT } from "@/api/brand"

export default {
  name: "BrandSelect",

  props: {
    value: [String, Number]
  },

  data() {
    return {
      brandId: this.value,

      brands: []
    }
  },

  watch: {
    value(val) {
      this.brandId = val;
    },

    brandId(val) {
      this.$emit("input", val);
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    loadData() {
      GET_BRANDS_FORMAT().then(response => {
        this.brands = response.data;
      });
    }
  }
}
</script>

