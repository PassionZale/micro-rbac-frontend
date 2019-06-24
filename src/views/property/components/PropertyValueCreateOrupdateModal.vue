<template>
  <Modal v-model="visible" :title="$title" @on-visible-change="visibleChange">
    <Form ref="property-value-create-or-update-form" :model="form.model" :rules="form.rules">
      <FormItem label="属性名称" prop="name">
        <Input type="text" v-model="form.model.name"/>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="text" @click="cancel()">取消</Button>
      <Button type="primary" @click="confirm()" :loading="btnLoading">确定</Button>
    </div>
  </Modal>
</template>

<script>
import {
  GET_PROPERTY_VALUE,
  POST_PROPERTY_VALUE,
  PUT_PROPERTY_VALUE
} from "@/api/property-value";

const PROPERTY_VALUE = Object.freeze({
  name: "",
  property_id: ""
});

export default {
  props: {
    value: [Boolean],

    propertyId: [String, Number],

    propertyValueId: [String, Number]
  },

  data() {
    return {
      visible: this.value,

      btnLoading: false,

      form: {
        model: Object.assign({}, PROPERTY_VALUE),
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
      return this.propertyValueId ? "编辑属性" : "新建属性";
    }
  },

  methods: {
    loadData() {
      GET_PROPERTY_VALUE(this.propertyValueId)
        .then(response => {
          const { name, property_id } = response.data;
          this.form.model = Object.assign({}, this.form.model, {
            name,
            property_id
          });
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
    },

    resetForm() {
      this.form.model = Object.assign({}, PROPERTY_VALUE);
    },

    confirm() {
      this.$refs["property-value-create-or-update-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const requestApi = this.propertyValueId
            ? PUT_PROPERTY_VALUE(this.propertyValueId, this.form.model)
            : POST_PROPERTY_VALUE(
                Object.assign({}, this.form.model, {
                  property_id: this.propertyId
                })
              );
          requestApi
            .then(() => {
              this.$Message.success("操作成功");
              this.$emit("on-success");
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
        if (this.propertyValueId) {
          this.loadData();
        } else {
          this.resetForm();
        }
      }
    }
  }
};
</script>