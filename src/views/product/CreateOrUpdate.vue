<template>
  <Form :label-width="160" label-position="left" :model="form.model" :rules="form.rules">
    <FormItem label="商品名称">
      <Input type="text" v-model="form.model.name"/>
    </FormItem>
    <FormItem label="商品品牌">
      <brand-select v-model="form.model.brand_id"></brand-select>
    </FormItem>
    <FormItem label="商品分类">
      <category-cascader v-model="form.model.category_id"></category-cascader>
    </FormItem>
    <FormItem label="商品规格">
      <category-property ref="category-property" v-show="$categoryId"></category-property>
      <Alert v-show="!$categoryId" type="warning" show-icon style="width: 16em;">请选择商品分类</Alert>
    </FormItem>
    <FormItem label="SKU 组合">
      <sku-table></sku-table>
    </FormItem>
    <FormItem>
      <Button type="primary">保存</Button>
      <Button type="default">取消</Button>
    </FormItem>
  </Form>
</template>

<script>
import BrandSelect from "@/components/brand";
import { CategoryCascader } from "@/components/category";
import CategoryProperty from "./components/CategoryProperty";
import SkuTable from "./components/SkuTable";
import { GET_PRODUCT, POST_PRODUCT, PUT_PRODUCT } from "@/api/product";

const PRODUCT = Object.freeze({
  name: "",
  brand_id: "",
  category_id: [],
  skus: []
});

export default {
  name: "ProductCreateOrUpdate",

  components: { BrandSelect, CategoryCascader, CategoryProperty, SkuTable },

  data() {
    return {
      id: this.$route.query.id || "",

      form: {
        model: Object.assign({}, PRODUCT),
        rules: {}
      }
    };
  },

  watch: {
    "form.model.category_id": {
      handler(val) {
        this.$bus.emit("on-category-change", val[1] || "");
      },
      immediate: true
    }
  },

  computed: {
    $categoryId() {
      let categoryId = "";
      if (this.form.model.category_id.length) {
        categoryId = this.form.model.category_id[1];
      }
      return categoryId;
    }
  },

  methods: {}
};
</script>

