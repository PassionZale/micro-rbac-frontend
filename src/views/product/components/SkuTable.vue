<template>
  <div>
    <Button type="primary" size="small" @click="generateSkuTable()">确认生成</Button>
    <br>
    <Table :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
  </div>
</template>

<script>
import { findComponentUpward } from "@/utils/helper";

export default {
  name: "SkuTable",

  data() {
    return {
      table: {
        loading: false,
        data: [],
        columns: []
      }
    };
  },

  methods: {
    generateSkuTable() {
      const component = findComponentUpward(this, "ProductCreateOrUpdate");
      const productName = component.form.model.name;
      const skuData = component.$refs["category-property"].getSkuData();

      this._table_columns(productName, skuData);
      this._table_data(productName, skuData);
    },

    _table_columns(productName, skuData) {
      const defaultColumns = [
        {
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "商品名称",
          key: "name",
          width: 100,
        },
        {
          title: "商品库存",
          key: "stock",
          width: 120,
          render: (h, params) => {
            return h("Input", {
              props: {
                type: "text",
                size: "small",
                value: params.row.stock
              },
              on: {
                input: val => {
                  params.row.stock = val;
                  this.table.data[params.index] = params.row;
                }
              }
            })
          }
        },
        {
          title: "商品价格",
          key: "price",
          width: 120,
          render: (h, params) => {
            return h("Input", {
              props: {
                type: "text",
                size: "small",
                value: params.row.price
              },
              on: {
                input: val => {
                  params.row.price = val;
                  this.table.data[params.index] = params.row;
                }
              }
            })
          }
        }
      ];

      const dynamicColumns = [];
      const tmp = skuData[0] || [];
      tmp.map(item => {
        dynamicColumns.push({
          title: item.property_name,
          key: `property_id_${item.property_id}`
        });
      });

      this.table.columns = defaultColumns.concat(dynamicColumns);
    },

    _table_data(productName, skuData) {
      const defaultDataItem = {
        name: productName,
        stock: 0,
        price: 0
      };

      const data = [];

      skuData.map(sku => {
        const obj = Object.assign({}, defaultDataItem);
        sku.map(item => {
          obj[`property_id_${item.property_id}`] = item.property_value_name;
        });
        data.push(obj);
      });

      this.table.data = data;
    }
  }
};
</script>

