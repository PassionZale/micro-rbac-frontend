<template>
  <layout-list>
    <template slot="form">
      <Form inline :label-width="80">
        <FormItem label="用户名" @submit.native.prevent>
          <Input type="text" v-model="form.username"/>
        </FormItem>
        <Button type="primary" @click="loadData(true)">查询</Button>
      </Form>
    </template>

    <template slot="tool-left">
      <Button type="primary" @click="resolveRoute({ name: 'user-create' }, 'can create user')">新增</Button>
    </template>

    <template slot="table">
      <Table border :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
    </template>

    <template slot="page">
      <pagination ref="page" @on-page-size-change="loadData(true)" @on-page-change="loadData()"></pagination>
    </template>

    <password-update-modal v-model="passwordUpdateModalVisible" :user-id="selectedUserId"></password-update-modal>
  </layout-list>
</template>

<script>
import LayoutList from "@/components/layout";
import Pagination from "@/components/pagination";
import PasswordUpdateModal from "./components/PasswordUpdateModal";
import { GET_USERS, DELETE_USER } from "@/api/user";
import { permissionValidator } from "@/mixins";

export default {
  components: { LayoutList, Pagination, PasswordUpdateModal },

  mixins: [permissionValidator],

  data() {
    return {
      form: {
        username: ""
      },

      passwordUpdateModalVisible: false,

      selectedUserId: "",

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
            key: "username",
            title: "用户名"
          },
          {
            key: "is_superuser",
            title: "超级用户",
            render: (h, params) => {
              const text =
                params.row.is_superuser == 1 ? "超级用户" : "普通用户";
              const color =
                params.row.is_superuser == 1 ? "primary" : "default";
              return h(
                "Tag",
                {
                  props: { color }
                },
                text
              );
            }
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
                      this.resolveRoute({name: "user-detail",query: { id: params.row.id }}, "can update user");
                    }
                  }
                },
                "编辑"
              );

              const pwdBtn = h(
                "Button",
                {
                  props: {
                    type: "text",
                    disabled: !this.resolvePermission("can update user")
                  },
                  on: {
                    click: () => {
                      this.selectedUserId = params.row.id;
                      this.passwordUpdateModalVisible = !this.passwordUpdateModalVisible;
                    }
                  }
                },
                "编辑密码"
              );

              const removeBtn = h(
                "Button",
                {
                  props: {
                    type: "text",
                    disabled: !this.resolvePermission("can delete user")
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
                      DELETE_USER(params.row.id)
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

              return h("div", [editBtn, pwdBtn, removePoptip]);
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

      const params = Object.assign(
        {},
        this.form,
        this.$refs["page"].getQuery()
      );

      GET_USERS(params)
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


