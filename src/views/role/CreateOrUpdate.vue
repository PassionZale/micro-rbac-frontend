<template>
  <Form
    ref="create-or-update-form"
    :label-width="160"
    label-position="left"
    :model="form.model"
    :rules="form.rules"
  >
    <FormItem label="角色名称:" prop="name">
      <Input type="text" v-model="form.model.name"/>
    </FormItem>
    <FormItem label="角色编码:" prop="code">
      <Input type="text" v-model="form.model.code"/>
    </FormItem>
    <FormItem label="关联权限" prop="permissionIds">
      <permission-checkbox-group v-model="form.model.permissionIds"></permission-checkbox-group>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="confirm()" :loading="btnLoading">保存</Button>
      <Button type="default" @click="goBack()">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
import { GET_ROLE, POST_ROLE, PUT_ROLE } from "@/api/role";
import PermissionCheckboxGroup from "@/components/permission";

const ROLE = Object.freeze({
  name: "",
  code: "",
  permissionIds: []
});

export default {
  components: { PermissionCheckboxGroup },

  data() {
    return {
      btnLoading: false,

      id: this.$route.query.id || "",

      form: {
        model: Object.assign({}, ROLE),
        rules: {
          name: [
            { required: true, message: "请填写权限名称", trigger: "blur" }
          ],
          code: [
            { required: true, message: "请填写权限编码", trigger: "blur" }
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
      GET_ROLE(this.id)
        .then(response => {
          const { name, code, permissionIds } = response.data;
          this.form.model = Object.assign({}, this.form.model, {
            name,
            code,
            permissionIds
          });
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
    },

    confirm() {
      this.$refs["create-or-update-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const requestApi = this.id
            ? PUT_ROLE(this.id, this.form.model)
            : POST_ROLE(this.form.model);
          requestApi
            .then(() => {
              this.$Message.success("操作成功");
              this.goBack();
            })
            .catch(error => {
              this.btnLoading = false;
              this.$Message.error(error.message);
            });
        }
      });
    },

    goBack() {
      this.$router.push({ name: "role-list" });
    }
  }
};
</script>
