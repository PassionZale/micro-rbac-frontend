<template>
  <Modal v-model="visible" title="批量录入库存和价格">
    <Form ref="sku-batch-form" :model="form.model" :rules="form.rules">
      <FormItem label="商品库存" prop="stock">
        <Input type="text" v-model="form.model.stock" />
      </FormItem>
      <FormItem label="商品价格" prop="price">
        <Input type="text" v-model="form.model.price" />
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="text" @click="visible = !visible">取消</Button>
      <Button type="primary" @click="confirm()">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { PATTERN_STOCK, PATTERN_PRICE } from "../utils";

export default {
  name: "SkuTableBatchModal",

  props: {
    value: [Boolean]
  },

  data() {
    const stockValidator = (rule, value, callback) => {
      if (!PATTERN_STOCK.test(value)) {
        callback(new Error("商品库存必须为大于或等于 0 的整数"));
      } else {
        callback();
      }
    };

    const priceValidator = (rule, value, callback) => {
      if (!PATTERN_PRICE.test(value)) {
        callback(
          new Error("商品价格必须为大于或等于 0 的数字, 且至多保留两位小数点")
        );
      } else {
        callback();
      }
    };

    return {
      visible: this.value,

      form: {
        model: {
          stock: 0,
          price: 0.0
        },
        rules: {
          stock: [
            { required: true, validator: stockValidator, trigger: "blur" }
          ],
          price: [
            { required: true, validator: priceValidator, trigger: "blur" }
          ]
        }
      }
    };
  },

  watch: {
    visible(val) {
      this.$emit("input", val);
    },

    value(val) {
      this.visible = val;
    }
  },

  methods: {
    confirm() {
      this.$refs["sku-batch-form"].validate(valid => {
        if (valid) {
          this.$emit("on-batch", this.form.model);
          this.$nextTick(() => {
            this.visible = !this.visible;
          })
        }
      });
    }
  }
};
</script>

