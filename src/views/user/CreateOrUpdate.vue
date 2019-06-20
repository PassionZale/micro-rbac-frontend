<template>
  <Form
    ref="create-or-update-form"
    :label-width="160"
    label-position="left"
    :model="form.model"
    :rules="form.rules"
  >
    <FormItem label="用户名:" prop="username">
      <Input type="text" v-model="form.model.username"/>
    </FormItem>
    <FormItem label="密码:" prop="password" v-if="disPassword">
      <Input type="password" v-model="form.model.password"/>
    </FormItem>
    <FormItem label="确认密码" prop="passwordConfirm" v-if="disPassword">
      <Input type="password" v-model="form.model.passwordConfirm"/>
    </FormItem>
    <FormItem label="状态">
      <RadioGroup v-model="form.model.is_active" type="button">
        <Radio label="1">启用</Radio>
        <Radio label="0">禁用</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="超级用户">
      <RadioGroup v-model="form.model.is_superuser" type="button">
        <Radio label="1">是</Radio>
        <Radio label="0">否</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="关联角色" prop="roleIds">
      <role-checkbox-group v-model="form.model.roleIds"></role-checkbox-group>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="confirm()" :loading="btnLoading">保存</Button>
      <Button type="default" @click="goBack()">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
import { GET_USER, POST_USER, PUT_USER } from "@/api/user";
import RoleCheckboxGroup from "@/components/role";

const USER = Object.freeze({
  username: "",
  password: "",
  passwordConfirm: "",
  is_superuser: "0",
  is_active: "1",
  roleIds: []
});

export default {
  components: { RoleCheckboxGroup },

  props: {
    disPassword: [Boolean]
  },

  data() {
    const PASSWORD_VALIDATOR = (rule, value, callback) => {
      if (this.form.model.passwordConfirm !== "") {
        this.$refs["create-or-update-form"].validateField("passwordConfirm");
      }
      callback();
    };

    const PASSWORD_CONFIRM_VALIDATOR = (rule, value, callback) => {
      if (value !== this.form.model.password) {
        callback(new Error("两次填写的密码必须相同"));
      } else {
        callback();
      }
    };

    return {
      btnLoading: false,

      id: this.$route.query.id || "",

      form: {
        model: Object.assign({}, USER),
        rules: {
          username: [
            { required: true, message: "请填写用户名", trigger: "blur" },
            { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, message: "用户名必须以字母开头，长度在5~16之间，只能包含字母、数字和下划线", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请填写密码", trigger: "blur" },
            { pattern: /^[a-zA-Z]\w{5,17}$/, message: "密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线", trigger: "blur"},
            { validator: PASSWORD_VALIDATOR, trigger: "blur" }
          ],
          passwordConfirm: [
            { required: true, message: "请再次填写密码", trigger: "blur" },
            { validator: PASSWORD_CONFIRM_VALIDATOR, trigger: "blur" }
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
      GET_USER(this.id)
        .then(response => {
          const { username, is_active, is_superuser, roleIds } = response.data
          this.form.model = Object.assign({}, this.form.model, { username, is_active, is_superuser, roleIds });
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
            ? PUT_USER(this.id, this.form.model)
            : POST_USER(this.form.model);
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
      this.$router.push({ name: "user-list" });
    }
  }
};
</script>
