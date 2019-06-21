<template>
  <Modal v-model="visible" :title="$title" @on-visible-change="visibleChange">
    <Form ref="create-or-update-form" :model="form.model" :rules="form.rules">
      <FormItem label="品牌名称" prop="name">
        <Input type="text" v-model="form.model.name"/>
      </FormItem>
      <FormItem label="品牌排序" prop="sort">
        <Input type="text" v-model="form.model.sort"/>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="text" @click="visible = !visible">取消</Button>
      <Button type="primary" :loading="btnLoading" @click="confirm()">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { GET_BRAND, PUT_BRAND, POST_BRAND } from "@/api/brand";

export default {
  props: {
    brandId: [String, Number],

    value: [Boolean]
  },

  data() {
    return {
      visible: this.value,

      btnLoading: false,

      form: {
        model: {
          name: "",
          sort: 0
        },
        rules: {
          name: [
            { required: true, message: "请填写品牌名称", trigger: "blur" }
          ]
        }
      }
    };
  },

  watch: {
    value(val) {
      this.visible = val;
    },

    visible(val) {
      this.$emit("input", val);
    }
  },

  computed: {
    $title() {
      return this.brandId ? "编辑品牌" : "新增品牌";
    }
  },

  methods: {
    loadData() {
      GET_BRAND(this.brandId)
        .then(response => {
          const { name, sort } = response.data;
          this.form.model = Object.assign({}, this.form.model, { name, sort });
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
    },

    confirm() {
      this.$refs["create-or-update-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const requestApi = this.brandId
            ? PUT_BRAND(this.brandId, this.form.model)
            : POST_BRAND(this.form.model);
          
          const reload = this.brandId ? false : true;
          requestApi
            .then(() => {
              this.$Message.success("操作成功");
              this.$emit("on-success", reload);
              this.btnLoading = false;
              this.visible = !this.visible;
            })
            .catch(error => {
              this.btnLoading = false;
              this.$Message.error(error.message);
            });
        }
      });
    },

    resetForm() {
      console.log(1)
      this.$refs["create-or-update-form"].resetFields();
    },

    visibleChange(visible) {
      if(visible) {
        this.brandId ? this.loadData() : this.resetForm();
      }
    }
  }
};
</script>

