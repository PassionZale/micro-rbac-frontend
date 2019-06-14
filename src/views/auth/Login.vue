<template>
  <Row type="flex" justify="center">
    <Col span="24">
      <Card style="width: 400px;margin: 50px auto;" dis-hover :borderd="false">
        <div slot="title">
          <h2 class="login-title">micro-rbac-frontend</h2>
        </div>
        <Form class="login-form" :model="form.model" :rules="form.rules" ref="login-form">
          <FormItem label="用户名" prop="username">
            <Input size="large" type="text" v-model.trim="form.model.username" autofocus>
              <Icon type="md-contact" slot="prefix"/>
            </Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input
              size="large"
              :type="passwordVisible ? 'text' : 'password'"
              v-model.trim="form.model.password"
              @on-enter="submit()"
            >
              <Icon type="md-lock" slot="prefix"/>
              <Icon
                :type="passwordVisible ? 'md-eye-off' : 'md-eye'"
                slot="suffix"
                @click="passwordVisible = !passwordVisible"
              />
            </Input>
          </FormItem>
          <FormItem>
            <Button
              :loading="btnLoading"
              type="success"
              size="large"
              long
              style="margin-top:20px;"
              @click="submit()"
            >登陆</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script>
import { POST_LOGIN } from "@/api/auth";
import Auth from "@/utils/auth";

export default {
  name: "Login",

  data() {
    return {
      passwordVisible: false,

      btnLoading: false,

      form: {
        model: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            { required: true, message: "请填写用户名", trigger: "blur" }
          ],
          password: [{ required: true, message: "请填写密码", trigger: "blur" }]
        }
      }
    };
  },

  methods: {
    submit() {
      this.$refs["login-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          POST_LOGIN(this.form.model)
            .then(response => {
              Auth.setToken(response.data);
              // this.$router.push("/");
            })
            .catch(error => {
              this.$Message.error(error.message);
              this.btnLoading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less">
.login-title {
  text-align: center;
}

.login-form {
  .ivu-input {
    width: 100% !important;
  }
}
</style>