<template>
  <Form ref="product-create-or-update-form" :label-width="160" label-position="left" :model="form.model" :rules="form.rules">
    <FormItem label="商品名称" prop="name">
      <Input type="text" v-model="form.model.name"/>
    </FormItem>
    <FormItem label="商品品牌" prop="brand_id">
      <brand-select v-model="form.model.brand_id"></brand-select>
    </FormItem>
    <FormItem label="商品分类" prop="category_id">
      <category-cascader v-model="form.model.category_id"></category-cascader>
    </FormItem>
    <FormItem label="商品规格" :error="errorMsg.property">
      <category-property :init-properties="initProperties" ref="category-property" v-show="$categoryId"></category-property>
      <Alert v-show="!$categoryId" type="warning" show-icon style="width: 16em;">请选择商品分类</Alert>
    </FormItem>
    <FormItem label="SKU 组合">
      <sku-table ref="sku-table" :init-skus="initSkus">
        <span style="color:#ed4014;">{{errorMsg.sku}}</span>
      </sku-table>
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
import { PATTERN_STOCK, PATTERN_PRICE } from "./utils"

const PRODUCT = Object.freeze({
  name: "",
  brand_id: "",
  category_id: []
});

export default {
  name: "ProductCreateOrUpdate",

  components: { BrandSelect, CategoryCascader, CategoryProperty, SkuTable },

  data() {
    const brandValidator = (rule, value, callback) => {
      if(value == "") {
        callback(new Error("请选择商品品牌"));
      } else {
        callback();
      }
    }

    const categoryValidator = (rule, value, callback) => {
      if(!value || !value.length) {
        callback(new Error("请选择商品分类"));
      } else {
        callback();
      }
    }

    return {
      id: this.$route.query.id || "",

      btnLoading: false,

      initProperties: [],

      initSkus: [],

      errorMsg: {
        property: "",
        sku: ""
      },

      form: {
        model: Object.assign({}, PRODUCT),
        rules: {
          name: [{ required: true, message: "请填写商品名称", trigger: "blur" }],
          brand_id: [{ required: true, validator: brandValidator }],
          category_id: [{ required: true, validator: categoryValidator }]
        }
      }
    };
  },

  watch: {
    "form.model.category_id": {
      handler(val, old) {
        console.log(val);
        console.log(old);
        console.log("==========watch==========");
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
      this.errorMsg.property = "";
      this.errorMsg.sku = "";

      const skus = this.$refs["sku-table"].table.data;
      const params = Object.assign(
        {}, 
        this.form.model, 
        { category_id: this.$categoryId }, 
        { skus }
      );

      this.$refs["product-create-or-update-form"].validate(valid => {
        if (valid) {

          if(!skus.length) {
            this.errorMsg.property = "请勾选商品规格后点击 '生成组合' 按钮";
            return;
          }

          const skuErrors = []
          skus.some((sku, index) => {
            if(!PATTERN_STOCK.test(sku.stock)) {
              skuErrors.push(`第 ${index + 1} 行数据中的 "商品库存" 必须为大于或等于 0 的整数`);
            }
            if(!PATTERN_PRICE.test(sku.price)) {
              skuErrors.push(`第 ${index + 1} 行数据中的 "商品价格" 必须为大于或等于 0 的数字, 且至多保留两位小数点`);
            }
            return skuErrors.length > 0;
          })

          if(skuErrors.length) {
            this.errorMsg.sku = skuErrors[0];
            return;
          }

          this.btnLoading = true;
          const requestApi = this.id ? PUT_PRODUCT(this.id, params) : POST_PRODUCT(params);
          requestApi.then(() => {
            this.$Message.success("操作成功");
            this.goBack();
            this.btnLoading = false;
          }).catch(error => {
            this.btnLoading = false;
            this.$Message.error(error.message)
          });
        }
      });
    },

    goBack() {
      this.$router.push({ name: "product-list" })
    }
  }
};
</script>

