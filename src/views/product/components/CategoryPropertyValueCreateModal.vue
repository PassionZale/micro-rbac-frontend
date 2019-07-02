<template>
  <Modal v-model="visible" :title="`添加${title}`" @on-visible-change="visibleChange">
    <Form
      ref="property-value-create-form"
      :model="form.model"
      :rules="form.rules"
      @submit.native.prevent
    >
      <FormItem label="属性名称" prop="name">
        <Input type="text" v-model="form.model.name" @on-enter="confirm()" />
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="text" @click="cancel()">取消</Button>
      <Button type="primary" @click="confirm()" :loading="btnLoading">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { POST_PROPERTY_VALUE } from "@/api/property-value";

export default {
  name: "CategoryPropertyValueCreateModal",

  props: {
    value: [Boolean],

    title: {
      type: [String],
      default: "属性"
    },

    propertyId: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      visible: this.value,

      btnLoading: false,

      form: {
        model: { name: "" },
        rules: {
          name: [{ required: true, message: "请填写属性名称", trigger: "blur" }]
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
      return "新建属性";
    }
  },

  methods: {
    resetForm() {
      this.$refs["property-value-create-form"].resetFields();
    },

    confirm() {
      this.$refs["property-value-create-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const params = Object.assign({}, this.form.model, {
            property_id: this.propertyId
          });
          POST_PROPERTY_VALUE(params)
            .then(response => {
              this.$Message.success("操作成功");
              this.$emit("on-success", {property_value_id: response.data, property_value_name: this.form.model.name});
              this.cancel();
              this.btnLoading = false;
            })
            .catch(error => {
              this.btnLoading = false;
              this.$Message.error(error.message);
            });
        }
      });
    },

    cancel() {
      this.visible = !this.visible;
    },

    visibleChange(visible) {
      if (visible) {
        this.resetForm();
      }
    }
  }
};
</script>