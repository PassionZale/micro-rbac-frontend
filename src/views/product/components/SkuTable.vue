<template>
  <div>
    <Button type="primary" size="small" @click="generateSkuTable()">生成组合</Button>
    <Button type="primary" size="small" :disabled="!table.data.length" @click="modalShow = !modalShow">批量录入</Button>
    <span style="color: #ed4014;">{{errorMsg}}</span>
    <br>
    <slot></slot>
    <Table :height="300" :loading="table.loading" :data="table.data" :columns="table.columns"></Table>

    <sku-table-batch-modal v-model="modalShow" @on-batch="batchInputData"></sku-table-batch-modal>
  </div>
</template>

<script>
import { findComponentUpward } from "@/utils/helper";
import SkuTableBatchModal from "./SkuTableBatchModal"
import { CREATE_SKU_UNIQUE_ID } from "../utils";

const SKU_ITEM = Object.freeze({
  name: "",
  price: 0,
  stock: 0,
  properties: []
});

export default {
  name: "SkuTable",

  components: { SkuTableBatchModal },

  props: {
    initSkus: {
      type: [Array],
      default: () => []
    }
  },

  data() {
    return {
      errorMsg: "",

      modalShow: false,

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
        this._table_columns(this.initSkus);
        this._table_data(this.initSkus);    
      }    
    },

    generateSkuTable() {
      this.errorMsg = "";

      const component = findComponentUpward(this, "ProductCreateOrUpdate");
      const name = component.form.model.name;
      if(!name) {
        this.errorMsg = "商品名称暂未填写";
        return;
      }

      const propertySelection = component.$refs["category-property"].propertySelection();
      if(!propertySelection.length) {
        this.errorMsg = "商品规格暂未勾选";
        return;
      }
      const skus = [];

      propertySelection.forEach(properties => {
        const skuItem = Object.assign({}, SKU_ITEM, { name: name, properties });
        skus.push(skuItem)
      });

      this._table_columns(skus);
      this._table_data(skus);
    },

    _table_columns(skus) {
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
      const tmp = skus.length ? (skus[0]["properties"] || []) : [];
      tmp.map(item => {
        dynamicColumns.push({
          title: item.property_name,
          key: `property_id_${item.property_id}`
        });
      });

      this.table.columns = defaultColumns.concat(dynamicColumns);
    },

    _table_data(skus) {
      const data = [];
      skus.map(sku => {
        sku.properties.map(property => {
          sku[`property_id_${property.property_id}`] = property.property_value_name;
        });
        sku["__unique__"] = CREATE_SKU_UNIQUE_ID(sku);
        sku["__found__"] = this.table.data.find(item => item["__unique__"] === sku["__unique__"]) ? true: false;
        data.push(sku);
      });

      if(this.table.data.length) {
        const uniqueData = [];
        const notUniqueData = data.filter(item => item["__found__"] === false);

        data.map(item => {
          if(item["__found__"]) {
            const found = this.table.data.find(v => v["__unique__"] === item["__unique__"]);
            uniqueData.push(Object.assign({}, found, { name: item.name } ));
          }
        });

        this.table.data = Array.from(new Set([...uniqueData, ...notUniqueData]));
      } else {
        this.table.data = data;
      }

    },

    batchInputData(stockAndPrice) {
      const { stock, price } = stockAndPrice;

      this.table.data = this.table.data.map(item => {
        return Object.assign({}, item, {stock, price})
      });
    }
  }
};
</script>

