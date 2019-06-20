<template>
  <Modal title="修改密码" v-model="visible" @on-visible-change="resetForm">
    <Form ref="password-update-form" :model="form.model" :rules="form.rules">
      <FormItem label="密码:" prop="password">
        <Input type="password" v-model="form.model.password"/>
      </FormItem>
      <FormItem label="确认密码" prop="passwordConfirm">
        <Input type="password" v-model="form.model.passwordConfirm"/>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="text" @click="visible = !visible">取消</Button>
      <Button type="primary" :loading="btnLoading" @click="confirm()">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { PUT_USER_PASSWORD } from "@/api/user";

export default {
  name: "PasswordUpdateModal",

  props: {
    value: [Boolean],
    userId: [String, Number]
  },

  data() {
    const PASSWORD_VALIDATOR = (rule, value, callback) => {
      if (this.form.model.passwordConfirm !== "") {
        this.$refs["password-update-form"].validateField("passwordConfirm");
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
      visible: this.value,

      btnLoading: false,

      form: {
        model: {
          password: "",
          passwordConfirm: ""
        },
        rules: {
          password: [
            { required: true, message: "请填写密码", trigger: "blur" },
            {
              pattern: /^[a-zA-Z]\w{5,17}$/,
              message:
                "密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
              trigger: "blur"
            },
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

  watch: {
    value(val) {
      this.visible = val;
    },

    visible(val) {
      this.$emit("input", val);
    }
  },

  methods: {
    confirm() {
      this.$refs["password-update-form"].validate(valid => {
        if(valid) {
          this.btnLoading = true;
          PUT_USER_PASSWORD(this.userId, this.form.model).then(response => {
            this.$Message.success("操作成功");
            this.visible = !this.visible;
            this.btnLoading = false;
          }).catch(error => {
            this.$Message.error(error.message);
            this.btnLoading = false;
          })
        }
      })
    },

    resetForm(visible) {
      if(!visible) {
        this.$refs["password-update-form"].resetFields();
      }
    }
  }
};
</script>
