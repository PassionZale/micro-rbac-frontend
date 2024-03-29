<template>
  <layout-list>
    <template slot="form">
      <Form inline :label-width="80">
        <FormItem label="商品名称">
          <Input type="text" v-model="form.name"/>
        </FormItem>
        <FormItem label="商品品牌">
          <brand-select v-model="form.brandId"></brand-select>
        </FormItem>
        <FormItem label="商品分类">
          <category-cascader v-model="form.categoryId"></category-cascader>
        </FormItem>
        <Button type="primary" @click="loadData(true)">查询</Button>
      </Form>
    </template>

    <template slot="tool-left">
      <Button type="primary" @click="resolveRoute({name: 'product-create'}, 'can create product')">新增</Button>
    </template>

    <template slot="table">
      <Table border :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
    </template>

    <template slot="page">
      <pagination ref="page" @on-page-size-change="loadData(true)" @on-page-change="loadData()"></pagination>
    </template>
  </layout-list>
</template>

<script>
import LayoutList from "@/components/layout";
import Pagination from "@/components/pagination";
import BrandSelect from "@/components/brand";
import { CategoryCascader } from "@/components/category";
import { GET_PRODUCTS, DELETE_PRODUCT } from "@/api/product";
import { permissionValidator } from "@/mixins";

export default {
  components: { LayoutList, Pagination, BrandSelect, CategoryCascader },

  mixins: [permissionValidator],

  data() {
    return {
      form: {
        name: "",
        brandId: "",
        categoryId: []
      },

      table: {
        loading: false,
        data: [],
        columns: [
          {
            type: "index",
            align: "center",
            width: 60
          },
          {
            key: "name",
            title: "商品名称"
          },
          {
            key: "brand_name",
            title: "品牌名称"
          },
          {
            key: "category_name",
            title: "分类名称"
          },
          {
            key: "created_at",
            title: "创建时间",
            render: (h, params) => {
              return h(
                "div",
                this.$options.filters.unixFormater(params.row.created_at)
              );
            }
          },
          {
            key: "updated_at",
            title: "更新时间",
            render: (h, params) => {
              return h(
                "div",
                this.$options.filters.unixFormater(params.row.updated_at)
              );
            }
          },
          {
            title: "操作",
            render: (h, params) => {
              const editBtn = h(
                "Button",
                {
                  props: {
                    type: "text"
                  },
                  on: {
                    click: () => {
                      this.resolveRoute({name: "product-detail",query: { id: params.row.id }}, "can update product")
                    }
                  }
                },
                "编辑"
              );

              const removeBtn = h(
                "Button",
                {
                  props: {
                    type: "text",
                    disabled: !this.resolvePermission("can delete product")
                  }
                },
                "删除"
              );

              const removePoptip = h(
                "Poptip",
                {
                  props: {
                    transfer: true,
                    confirm: true,
                    title: "确定删除此条数据?"
                  },
                  on: {
                    "on-ok": () => {
                      DELETE_PRODUCT(params.row.id)
                        .then(() => {
                          this.loadData();
                        })
                        .catch(error => {
                          this.$Message.error(error.message);
                        });
                    }
                  }
                },
                [removeBtn]
              );

              return h("div", [editBtn, removePoptip]);
            }
          }
        ]
      }
    };
  },

  computed: {
    $categoryId() {
      if(this.form.categoryId.length) {
        return this.form.categoryId[1];
      } else {
        return ""
      }
    }
  },

  mounted() {
    this.loadData(true);
  },

  methods: {
    loadData(reload = false) {
      this.table.loading = true;

      reload && this.$refs["page"].resetPage();

      const params = Object.assign(
        {},
        this.form,
        { categoryId: this.$categoryId },
        this.$refs["page"].getQuery()
      );

      GET_PRODUCTS(params)
        .then(response => {
          this.table.data = response.data.list;
          this.$refs["page"].initTotal(response.data.total);
          this.$nextTick(() => {
            this.table.loading = false;
          });
        })
        .catch(error => {
          this.table.loading = false;
          this.$Message.error(error.message);
        });
    }
  }
};
</script>

