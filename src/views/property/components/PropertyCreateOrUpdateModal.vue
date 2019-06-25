<template>
  <Modal v-model="visible" :title="$title" @on-visible-change="visibleChange">
    <Form ref="property-create-or-update-form" :model="form.model" :rules="form.rules" @submit.native.prevent>
      <FormItem label="属性名称" prop="name">
        <Input type="text" v-model="form.model.name" @on-enter="confirm()"/>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="text" @click="cancel()">取消</Button>
      <Button type="primary" @click="confirm()" :loading="btnLoading">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { GET_PROPERTY, POST_PROPERTY, PUT_PROPERTY } from "@/api/property";

const PROPERTY = Object.freeze({
  name: ""
});

export default {
  props: {
    value: [Boolean],

    propertyId: [String, Number]
  },

  data() {
    return {
      visible: this.value,

      btnLoading: false,

      form: {
        model: Object.assign({}, PROPERTY),
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
      return this.propertyId ? "编辑属性组" : "新建属性组";
    }
  },

  methods: {
    loadData() {
      GET_PROPERTY(this.propertyId)
        .then(response => {
          const { name } = response.data;
          this.form.model = Object.assign({}, this.form.model, { name });
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
    },

    resetForm() {
      this.form.model = Object.assign({}, PROPERTY);
    },

    confirm() {
      this.$refs["property-create-or-update-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const requestApi = this.propertyId ? PUT_PROERTY(this.propertyId, this.form.model) : POST_PROPERTY(this.form.model);
          requestApi.then(() => {
            this.$Message.success("操作成功");
            this.$emit("on-success");
            this.cancel();
            this.btnLoading = false;
          }).catch(error => {
            this.btnLoading = false;
            this.$Message.error(error.message)
          });
        }
      });
    },

    cancel() {
      this.visible = !this.visible;
    },

    visibleChange(visible) {
      if (visible) {
        if (this.propertyId) {
          this.loadData();
        } else {
          this.resetForm();
        }
      }
    }
  }
};
</script>

