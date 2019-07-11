<template>
  <layout-list>
    <template slot="form">
      <Form inline :label-width="80">
        <FormItem label="品牌名称">
          <Input type="text" v-model="form.name"/>
        </FormItem>
        <Button type="primary" @click="loadData(true)">查询</Button>
      </Form>
    </template>

    <template slot="tool-left">
      <Button type="primary" @click="createBtn()" :disabled="!resolvePermission('brand-create')">新增</Button>
    </template>

    <template slot="table">
      <Table border :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
    </template>

    <template slot="page">
      <pagination ref="page" @on-page-size-change="loadData(true)" @on-page-change="loadData()"></pagination>
    </template>

    <create-or-update-modal v-model="modalVisible" :brand-id="selectedBrandId" @on-success="loadData"></create-or-update-modal>
  </layout-list>
</template>

<script>
import LayoutList from "@/components/layout";
import Pagination from "@/components/pagination";
import CreateOrUpdateModal from "./CreateOrUpdateModal"
import { GET_BRANDS, DELETE_BRAND } from "@/api/brand";
import { permissionExist } from "@/mixins";

export default {
  components: { LayoutList, Pagination, CreateOrUpdateModal },

  mixins: [permissionExist],

  data() {
    return {
      modalVisible: false,

      selectedBrandId: "",

      form: {
        name: "",
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
            title: "权限名称"
          },
          {
            key: "sort",
            title: "排序"
          },
          {
            key: "created_at",
            title: "创建时间",
            render: (h, params) => {
              return h("div", this.$options.filters.unixFormater(params.row.created_at));
            }
          },
          {
            key: "updated_at",
            title: "更新时间",
            render: (h, params) => {
              return h("div", this.$options.filters.unixFormater(params.row.updated_at));
            }
          },
          {
            title: "操作",
            render: (h, params) => {
              const editBtn = h("Button", {
                props: {
                  type: "text"
                },
                on: {
                  click: () => {
                    this.selectedBrandId = params.row.id;
                    this.$nextTick(() => {
                      this.modalVisible = !this.modalVisible;
                    })
                  }
                }
              }, "编辑");

              const removeBtn = h("Button", {
                props: {
                  type: "text"
                },
              }, "删除");

              const removePoptip = h("Poptip", {
                props: {
                  transfer: true,
                  confirm: true,
                  title: "确定删除此条数据?"
                },
                on: {
                  "on-ok": () => {
                    DELETE_BRAND(params.row.id).then(() => {
                      this.loadData();
                    }).catch(error => {
                      this.$Message.error(error.message);
                    })
                  }
                }
              }, [removeBtn]);

              return h("div", [editBtn, removePoptip]);
            }
          }
        ]
      }
    };
  },

  mounted() {
    this.loadData(true);
  },

  methods: {
    loadData(reload = false) {
      this.table.loading = true;

      reload && this.$refs["page"].resetPage();

      const params = Object.assign({}, this.form, this.$refs["page"].getQuery());

      GET_BRANDS(params)
        .then(response => {
          this.table.data = response.data.list;
          this.$refs["page"].initTotal(response.data.total);
          this.$nextTick(() => {
            this.table.loading = false;
          });
        })
        .catch(error => {
          this.$Message.error(error.message);
          this.table.loading = false;
        });
    },

    createBtn() {
      this.selectedBrandId = "";
      this.$nextTick(() => {
        this.modalVisible = !this.modalVisible;
      })
    }
  }
};
</script>
