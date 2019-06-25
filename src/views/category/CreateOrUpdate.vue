<template>
  <Form
    ref="create-or-update-form"
    :label-width="160"
    label-position="left"
    :model="form.model"
    :rules="form.rules"
  >
    <FormItem label="父分类" prop="pid">
      <category-select v-model="form.model.pid"></category-select>
    </FormItem>
    <FormItem label="分类名称" prop="name">
      <Input type="text" v-model="form.model.name"/>
    </FormItem>
    <FormItem label="属性组" prop="propertyIds">
      <property-checkbox-group v-model="form.model.propertyIds"></property-checkbox-group>
    </FormItem>

    <FormItem>
      <Button type="primary" :loading="btnLoading" @click="confirm()">保存</Button>
      <Button type="default" @click="goBack()">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
import CategorySelect from "@/components/category";
import PropertyCheckboxGroup from "@/components/property";
import { GET_CATEGORY, POST_CATEGORY, PUT_CATEGORY } from "@/api/category";

const CATEGORY_CHILD = Object.freeze({
  pid: 0,
  name: "",
  propertyIds: []
});

export default {
  components: { CategorySelect, PropertyCheckboxGroup },

  data() {
    const PROPERTY_IDS_VALIDATOR = (rule, value, callback) => {
      if (!value || !value.length) {
        callback(new Error("请选择属性组"));
      } else {
        callback();
      }
    };

    return {
      btnLoading: false,

      id: this.$route.query.id || "",

      parentId: this.$route.query.parentId || "",

      form: {
        model: Object.assign({}, CATEGORY_CHILD),
        rules: {
          name: [{ required: true, message: "请填写分类名称", trigger: "blur" }],
          pid: [{ required: true, message: "请选择父分类", trigger: "blur" }],
          propertyIds: [{ required: true, validator: PROPERTY_IDS_VALIDATOR }]
        }
      }
    };
  },

  created() {
    this.parentId && (this.form.model.pid = this.parentId);

    this.id && this.loadData();
  },

  methods: {
    loadData() {
      GET_CATEGORY(this.id).then(response => {
        const { name, pid, propertyIds } = response.data;
        this.form.model = Object.assign({}, this.form.model, { name, pid, propertyIds });
      }).catch(error => {
        this.$Message.error(error.message);
      })
    },

    confirm() {
      this.$refs["create-or-update-form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const requestApi = this.id ? PUT_CATEGORY(this.id, this.form.model) : POST_CATEGORY(this.form.model);
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
      this.$router.push({ name: "category-list" });
    }
  }
};
</script>

