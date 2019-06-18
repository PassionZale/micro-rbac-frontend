<template>
  <Form :label-width="160" label-position="left" :model="form.model" :rules="form.rules">
    <FormItem label="权限名称:" prop="name">
      <Input type="text" v-model="form.model.name"/>
    </FormItem>
    <FormItem label="权限编码:" prop="name">
      <Input type="text" v-model="form.model.name"/>
    </FormItem>
    <FormItem label="权限路由:" prop="name">
      <Input type="text" v-model="form.model.name"/>
    </FormItem>
    <FormItem>
      <Button type="primary">保存</Button>
      <Button type="default">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        model: {
          name: "",
          code: "",
          route: ""
        },
        rules: {
          name: [{ required: true, message: "请填写权限名称", trigger: "blur" }],
          code: [{ required: true, message: "请填写权限编码", trigger: "blur" }],
          route: [{ required: true, message: "请填写权限路由", trigger: "blur" }],
        }
      }
    }
  }
}
</script>
