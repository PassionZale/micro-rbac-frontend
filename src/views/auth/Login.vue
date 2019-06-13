<template>
  <Row type="flex" justify="center">
    <Col span="24">
      <Card style="width: 400px;margin: 50px auto;" dis-hover :borderd="false">
        <div slot="title">
          <img style="display:block;margin: 10px auto;" src="/static/images/default.png">
        </div>
        <Form class="login-form" :model="form.data" :rules="form.rules" ref="login-form">
          <FormItem label="用户名" prop="username">
            <Input size="large" type="text" v-model="form.data.username" autofocus>
              <Icon type="md-contact" slot="prefix"/>
            </Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input size="large" :type="passwordVisible ? 'text' : 'password'" v-model="form.data.password" @on-enter="submit()">
              <Icon type="md-lock" slot="prefix"/>
              <Icon :type="passwordVisible ? 'md-eye-off' : 'md-eye'" slot="suffix" @click="passwordVisible = !passwordVisible"/>
            </Input>
          </FormItem>
          <FormItem>
            <Button :loading="btnLoading" type="success" size="large" long style="margin-top:20px;" @click="submit()">登陆</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script>
import { LOGIN } from "@/api/auth"
import Auth from "@/utils/auth"

export default {
  name: "Login",

  data() {
    return {
      passwordVisible: false,

      btnLoading: false,

      form: {
        data: {
          username: "",
          password: ""
        },
        rules: {
            username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
            password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
        }
      }
    };
  },

  methods: {
      submit() {
         this.btnLoading = true
         this.$refs["login-form"].validate(valid => {
           if(valid) {
             LOGIN(this.form.data).then(response => {
               Auth.setToken(response.data.token)
               this.$Message.success(`欢迎，${this.form.data.username} !`)
               this.$router.push("/")
             }).catch(error => {
               this.$Message.error(error.msg)
               this.btnLoading = false
             })
           } else {
             this.btnLoading = false
           }
         }) 
      }
  }
};
</script>

<style lang="less">
.login-form {
  .ivu-input {
    width: 100% !important;
  }
}
</style>