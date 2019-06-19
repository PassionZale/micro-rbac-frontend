<template>
  <layout-list>
    <template slot="form">
      <Form inline :label-width="80">
        <FormItem label="角色名称">
          <Input type="text" v-model="form.name"/>
        </FormItem>
        <FormItem label="角色编码">
          <Input type="text" v-model="form.code"/>
        </FormItem>
        <Button type="primary" @click="loadData(true)">查询</Button>
      </Form>
    </template>

    <template slot="tool-left">
      <Button type="primary" @click="$router.push({ name: 'role-create' })">新增</Button>
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
import { GET_ROLES, DELETE_ROLE } from "@/api/role";

export default {
  components: { LayoutList, Pagination },

  data() {
    return {
      form: {
        name: "",
        code: "",
        route: ""
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
            title: "角色名称"
          },
          {
            key: "code",
            title: "角色编码"
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
                    this.$router.push({ name: "role-detail", query: { id: params.row.id }})
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
                    DELETE_ROLE(params.row.id).then(() => {
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

      GET_ROLES(params)
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
    }
  }
};
</script>


