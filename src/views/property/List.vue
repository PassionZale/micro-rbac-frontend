<template>
  <layout-tree>
    <template slot="tree-tool">
      <Button type="primary" @click="createBtn()" :disabled="!resolvePermission('can create property')">新建</Button>
      <Button type="primary" :disabled="$disActionBtn || !resolvePermission('can update property')" @click="updateBtn('tree')">编辑</Button>
      <Button type="primary" :disabled="$disActionBtn || !resolvePermission('can delete property')" @click="removeBtn('click')">删除</Button>
    </template>

    <template slot="tree">
      <Tree :data="properties" @on-select-change="treeSelectChange"></Tree>
    </template>

    <template slot="form">
      <Form :label-width="80" inline @submit.native.prevent>
        <FormItem label="属性名称:">
          <Input type="text" v-model="form.name" @on-enter="loadData(true)"/>
        </FormItem>
        <Button type="primary" @click="loadData(true)">查询</Button>
      </Form>
    </template>

    <template slot="tool-left">
      <Button type="primary" @click="createBtn('table')" :disabled="$disActionBtn || !resolvePermission('can create property')">新建属性</Button>
    </template>

    <template slot="table">
      <Table border :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
    </template>

    <template slot="page">
      <pagination ref="page" @on-page-size-change="loadData(true)" @on-page-change="loadData()"></pagination>
    </template>

    <property-create-or-update-modal
      v-model="treePropertyModal"
      :property-id="treeSelectPropertyId"
      @on-success="loadTree()"
    ></property-create-or-update-modal>

    <property-value-create-or-update-modal
      v-model="tablePropertyModal"
      :property-id="treeSelectPropertyId"
      :property-value-id="tableSelectPropertyValueId"
      @on-success="loadData()"
    ></property-value-create-or-update-modal>
  </layout-tree>
</template>

<script>
import { LayoutTree } from "@/components/layout";
import Pagination from "@/components/pagination";
import PropertyCreateOrUpdateModal from "./components/PropertyCreateOrUpdateModal";
import PropertyValueCreateOrUpdateModal from "./components/PropertyValueCreateOrUpdateModal";
import { GET_PROPERTIES_FORMAT, DELETE_PROPERTY } from "@/api/property";
import {
  GET_PROPERTY_VALUES,
  DELETE_PROPERTY_VALUE
} from "@/api/property-value";
import { permissionValidator } from "@/mixins";

export default {
  components: {
    LayoutTree,
    Pagination,
    PropertyCreateOrUpdateModal,
    PropertyValueCreateOrUpdateModal
  },

  mixins: [permissionValidator],

  data() {
    return {
      treePropertyModal: false,
      treeSelectPropertyId: "",

      tablePropertyModal: false,
      tableSelectPropertyValueId: "",

      form: {
        name: ""
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
            key: "property_name",
            title: "从属属性组"
          },
          {
            key: "name",
            title: "属性名称"
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
                    type: "text",
                    disabled: !this.resolvePermission("can update property")
                  },
                  on: {
                    click: () => {
                      this.tableSelectPropertyValueId = params.row.id;
                      this.tablePropertyModal = !this.tablePropertyModal;
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
                    disabled: !this.resolvePermission("can delete property")
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
                      DELETE_PROPERTY_VALUE(params.row.id)
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
      },

      properties: [{ id: "", title: "全部属性组", expand: true, children: [] }]
    };
  },

  computed: {
    $disActionBtn() {
      return this.treeSelectPropertyId === "";
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
      this.treeSelectPropertyId = "";
      GET_PROPERTIES_FORMAT()
        .then(response => {
          this.properties[0]["children"] = response.data;
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
    },

    treeSelectChange(selections, selection) {
      this.treeSelectPropertyId = selections.length ? selection.id : "";
      this.$nextTick(() => {
        this.loadData(true);
      })
    },

    createBtn(type = "tree") {
      if (type === "tree") {
        this.treeSelectPropertyId = "";
        this.treePropertyModal = !this.treePropertyModal;
      } else {
        this.tableSelectPropertyValueId = "";
        this.tablePropertyModal = !this.tablePropertyModal;
      }
    },

    updateBtn() {
      this.treePropertyModal = !this.treePropertyModal;
    },

    removeBtn() {
      this.$Modal.confirm({
        title: "您确认删除这条内容吗？",
        loading: true,
        onOk: () => {
          DELETE_PROPERTY(this.treeSelectPropertyId)
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
        { property_id: this.treeSelectPropertyId },
        this.$refs["page"].getQuery()
      );

      GET_PROPERTY_VALUES(params)
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

