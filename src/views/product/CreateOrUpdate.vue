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
      <category-property :init-properties="initProperties" ref="category-property" v-show="$categoryId"></category-property>
      <Alert v-show="!$categoryId" type="warning" show-icon style="width: 16em;">请选择商品分类</Alert>
    </FormItem>
    <FormItem label="SKU 组合">
      <sku-table ref="sku-table" :init-skus="initSkus"></sku-table>
    </FormItem>
    <FormItem>
      <Button type="primary" :loading="btnLoading" @click="confirm()">保存</Button>
      <Button type="default" @click="goBack()">取消</Button>
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
  category_id: []
});

export default {
  name: "ProductCreateOrUpdate",

  components: { BrandSelect, CategoryCascader, CategoryProperty, SkuTable },

  data() {
    return {
      id: this.$route.query.id || "",

      btnLoading: false,

      initProperties: [],

      initSkus: [],

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

  created() {
    this.id && this.loadData();
  },

  methods: {
    loadData() {
      GET_PRODUCT(this.id).then(response => {
        const category_id = [response.data.category_parent_id, response.data.category_child_id];
        const {id, brand_id, name} = response.data;
        this.form.model = Object.assign({}, this.form.model, {id, brand_id, name, category_id});

        this._product_properties(response.data.skus);
        this._product_skus(response.data.skus);

      }).catch(error => {
        this.$Message.error(error);
      })
    },

    _product_properties(skus) {
      const properties = [];
      skus.map(sku => {
        sku.properties.map(property => {
          properties.push(property) 
        })
      });
      this.initProperties = properties;
    },

    _product_skus(skus) {
      this.initSkus = skus;
    },

    confirm() {
      const skus = this.$refs["sku-table"].table.data;
      const params = Object.assign({}, this.form.model, { category_id: this.$categoryId }, { skus });
      // TODO 表单验证
      this.btnLoading = true;
      POST_PRODUCT(params).then(response => {
        this.$Message.success("操作成功");
        this.goBack();
      }).catch(error => {
        this.btnLoading = false;
        this.$Message.error(error.message);
      })
    },

    goBack() {
      this.$router.push({ name: "product-list" })
    }
  }
};
</script>

