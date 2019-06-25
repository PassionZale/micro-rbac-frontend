<template>
  <Modal v-model="visible" :title="$title" @on-visible-change="visibleChange">
    <Form ref="category-create-or-update-form" :model="form.model" :rules="form.rules" @submit.native.prevent>
      <FormItem label="分类名称" prop="name">
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
import { GET_CATEGORY, POST_CATEGORY, PUT_CATEGORY } from "@/api/category";

const CATEGORY = Object.freeze({ name: "", pid: 0 });

export default {
  props: {
    value: [Boolean],

    categoryId: [String, Number]
  },

  data() {
    return {
      visible: this.value,

      btnLoading: false,

      form: {
        model: Object.assign({}, CATEGORY),
        rules: {
          name: [{ required: true, message: "请填写分类名称", trigger: "blur" }]
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
      return this.categoryId ? "编辑父分类" : "新增父分类";
    }
  },

  methods: {
    loadData() {
      GET_CATEGORY(this.categoryId)
        .then(response => {
          const { name } = response.data;
          this.form.model = Object.assign({}, this.form.model, { name });
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
    },

    resetForm() {
      this.form.model = Object.assign({}, CATEGORY);
    },

    confirm() {
      this.$refs["category-create-or-update-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const requestApi = this.categoryId
            ? PUT_CATEGORY(this.categoryId, this.form.model)
            : POST_CATEGORY(this.form.model);
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
        if (this.categoryId) {
          this.loadData();
        } else {
          this.resetForm();
        }
      }
    }
  }
};
</script>

