<template>
  <Form
    ref="create-or-update-form"
    :label-width="160"
    label-position="left"
    :model="form.model"
    :rules="form.rules"
  >
    <FormItem label="权限名称:" prop="name">
      <Input type="text" v-model="form.model.name"/>
    </FormItem>
    <FormItem label="权限编码:" prop="code">
      <Input type="text" v-model="form.model.code"/>
    </FormItem>
    <FormItem label="权限路由:" prop="route">
      <Input type="text" v-model="form.model.route"/>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="confirm()" :loading="btnLoading">保存</Button>
      <Button type="default" @click="goBack()">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
import {
  GET_PERMISSION,
  POST_PERMISSION,
  PUT_PERMISSION
} from "@/api/permission";

const PERMISSION = Object.freeze({
  name: "",
  code: "",
  route: ""
});

export default {
  data() {
    return {
      btnLoading: false,

      id: this.$route.query.id || "",

      form: {
        model: Object.assign({}, PERMISSION),
        rules: {
          name: [
            { required: true, message: "请填写权限名称", trigger: "blur" }
          ],
          code: [
            { required: true, message: "请填写权限编码", trigger: "blur" }
          ],
          route: [
            { required: true, message: "请填写权限路由", trigger: "blur" }
          ]
        }
      }
    };
  },

  created() {
    this.id && this.loadData();
  },

  methods: {
    loadData() {
      GET_PERMISSION(this.id).then(response => {
        const { name, code, route } = response.data;
        this.form.model = Object.assign({}, this.form.model, {name, code, route});
      }).catch(error => {
        this.$Message.error(error.message);
      })
    },

    confirm() {
      this.$refs["create-or-update-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const requestApi = this.id ? PUT_PERMISSION(this.id, this.form.model) : POST_PERMISSION(this.form.model);
          requestApi.then(() => {
            this.$Message.success("操作成功");
            this.goBack();
          }).catch(error => {
            this.btnLoading = false;
            this.$Message.error(error.message)
          });
        }
      });
    },

    goBack() {
      this.$router.push({ name: "permission-list" });
    }
  }
};
</script>
