<template>
  <layout-tree>
    <template slot="tree-tool">
      <Button type="primary" @click="createBtn()">新建</Button>
      <Button type="primary" :disabled="$disActionBtn" @click="updateBtn()">编辑</Button>
      <Button type="primary" :disabled="$disActionBtn" @click="removeBtn()">删除</Button>
    </template>

    <template slot="tree">
      <Tree :data="categories" @on-select-change="treeSelectChange"></Tree>
    </template>

    <template slot="form">
      <Form :label-width="80" inline @submit.native.prevent>
        <FormItem label="子分类名称:">
          <Input type="text" v-model="form.name" @on-enter="loadData(true)"/>
        </FormItem>
        <Button type="primary" @click="loadData(true)">查询</Button>
      </Form>
    </template>

    <template slot="tool-left">
      <Button type="primary" @click="createChildBtn()">新建子分类</Button>
    </template>

    <template slot="table">
      <Table border :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
    </template>

    <template slot="page">
      <pagination ref="page" @on-page-size-change="loadData(true)" @on-page-change="loadData()"></pagination>
    </template>

    <create-or-update-modal
      v-model="categoryModal"
      :category-id="categoryId"
      @on-success="loadTree()"
    ></create-or-update-modal>
  </layout-tree>
</template>

<script>
import { LayoutTree } from "@/components/layout";
import Pagination from "@/components/pagination";
import CreateOrUpdateModal from "./components/CreateOrUpdateModal";
import { GET_CATEGORIES_FORMAT, DELETE_CATEGORY, GET_CATEGORIES } from "@/api/category";

export default {
  components: { LayoutTree, Pagination, CreateOrUpdateModal },

  data() {
    return {
      categoryModal: false,

      categoryId: "",

      form: {
        name: ""
      },

      categories: [{ id: "", title: "全部父分类", expand: true, children: [] }],

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
            key: "pname",
            title: "父分类"
          },
          {
            key: "name",
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
                      this.$router.push({ name: "category-detail", query: { id: params.row.id } })
                    }
                  }
                },
                "编辑"
              );

              const removeBtn = h(
                "Button",
                {
                  props: {
                    type: "text"
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
                      DELETE_CATEGORY(params.row.id)
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
    $disActionBtn() {
      return this.categoryId === "";
    }
  },

  created() {
    this.loadTree();
  },

  mounted() {
    this.loadData(true);
  },

  methods: {
    loadTree() {
      this.categoryId = "";
      GET_CATEGORIES_FORMAT()
        .then(response => {
          this.categories[0]["children"] = response.data;
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
    },

    treeSelectChange(selections, selection) {
      this.categoryId = selections.length ? selection.id : "";
      this.$nextTick(() => {
        this.loadData(true);
      })
    },

    createBtn() {
      this.categoryId = "";
      this.categoryModal = !this.categoryModal;
    },

    createChildBtn() {
      const router = this.categoryId ? { name: "category-create", query: { parentId: this.categoryId} } : { name: "category-create"};
      this.$router.push(router);
    },

    updateBtn() {
      this.categoryModal = !this.categoryModal;
    },

    removeBtn() {
      this.$Modal.confirm({
        title: "您确认删除这条内容吗？",
        loading: true,
        onOk: () => {
          DELETE_CATEGORY(this.categoryId)
            .then(response => {
              this.$Message.success("操作成功");
              this.$Modal.remove();
              this.loadTree();
            })
            .catch(error => {
              this.$Message.error(error.message);
              this.$Modal.remove();
            });
        }
      });
    },


    loadData(reload = false) {
      this.table.loading = true;

      reload && this.$refs["page"].resetPage();

      const params = Object.assign(
        {},
        this.form,
        { pid: this.categoryId },
        this.$refs["page"].getQuery()
      );

      GET_CATEGORIES(params)
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

