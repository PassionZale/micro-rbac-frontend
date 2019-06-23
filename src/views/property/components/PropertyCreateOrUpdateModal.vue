<template>
  <Modal v-model="visible" :title="$title">
    <Form :model="form.model" :rules="form.rules">
      <FormItem label="属性名" prop="name">
        <Input type="text" v-model="form.model.name"/>
      </FormItem>
    </Form>
  </Modal>
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
      visible: this.value,
      
      form: {
        model: {
          name: ""
        },
        rules: {
          name: [{ required: true, message: "请填写属性名", trigger: "blur"}]
        }
      }
    };
  },

  watch: {
    visible(val) {
      this.$emit("input", val);
    },

    value(val) {
      this.visible = val;
    }
  },

  computed: {
    $title() {
      return this.propertyId ? "编辑属性" : "新建属性";
    }
  },

  methods: {
    loadData() {}
  }
};
</script>

