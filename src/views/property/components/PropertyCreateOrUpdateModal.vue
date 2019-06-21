<template>
  <Modal v-model="visible"></Modal>
</template>

<script>
import { POST_PROPERTY, PUT_PROPERTY } from "@/api/property";
export default {
  props: {
    value: [Boolean],

    propertyId: [String, Number]
  },

  data() {
    return {
      visible: this.value
    };
  },

  methods: {
    loadData() {}
  }
};
</script>

