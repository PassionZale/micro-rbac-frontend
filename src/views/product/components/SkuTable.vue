<template>
  <div>
    <Button type="primary" size="small" @click="generateSkuTable()">确认生成</Button>
    <br>
    <Table :height="300" :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
  </div>
</template>

<script>
import { findComponentUpward } from "@/utils/helper";

export default {
  name: "SkuTable",

  props: {
    initSkus: {
      type: [Array],
      default: () => []
    }
  },

  data() {
    return {
      table: {
        loading: false,
        data: [],
        columns: []
      }
    };
  },

  watch: {
    initSkus: {
      handler() {
        this.updateTableDataAndColumns();
      },
      immediate: true
    }
  },

  methods: {
    updateTableDataAndColumns(){
      if(this.initSkus.length) {
        console.log(this.initSkus);
        // this._table_columns(this.initSkus);
        // this._table_data(this.initSkus);    
      }    
    },

    generateSkuTable() {
      const component = findComponentUpward(this, "ProductCreateOrUpdate");
      const productName = component.form.model.name;
      const skuData = component.$refs["category-property"].getSkuData();

      this._table_columns(skuData);
      this._table_data(skuData, productName);
    },

    _table_columns(skuData) {
      const defaultColumns = [
        {
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "商品名称",
          key: "name",
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

    _table_data(skuData, productName) {
      const defaultDataItem = {
        name: productName,
        stock: 0,
        price: 0
      };

      const data = [];

      skuData.map(sku => {
        let obj = Object.assign({}, defaultDataItem);
        obj.properties = [];
        sku.map(item => {
          item.name && (obj.name = item.name)
          item.stock && (obj.stock = item.stock)
          item.price && (obj.price = item.price)

          obj[`property_id_${item.property_id}`] = item.property_value_name;
          obj.properties.push(item)
        });
        data.push(obj);
      });

      this.table.data = data;
    }
  }
};
</script>

