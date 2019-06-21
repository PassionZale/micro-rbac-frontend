<template>
  <layout-tree>
    <template slot="tree-tool">
      <Button type="primary">新建</Button>
      <Button type="primary" :disabled="$disTreeActionBtn">编辑</Button>
      <Button type="primary" :disabled="$disTreeActionBtn">删除</Button>
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
      <Button type="primary">新建属性</Button>
    </template>

    <template slot="table">
      <Table border :loading="table.loading" :data="table.data" :columns="table.columns"></Table>
    </template>

    <template slot="page">
      <pagination ref="page" @on-page-size-change="loadData(true)" @on-page-change="loadData()"></pagination>
    </template>
  </layout-tree>
</template>

<script>
import { LayoutTree } from "@/components/layout";
import Pagination from "@/components/pagination";
import { GET_PROPERTIES_FORMAT, DELETE_PROPERTY } from "@/api/property";

export default {
  components: { LayoutTree, Pagination },

  data() {
    return {
      treeSelectPropertyId: "",

      form: {
        name: ""
      },

      table: {
        loading: false,
        data: [],
        columns: []
      },

      properties: [{ id: "", title: "全部属性", expand: true, children: [] }]
    };
  },

  computed: {
    $disTreeActionBtn() {
      return this.treeSelectPropertyId === "";
    }
  },

  created() {
    this.loadTree();
  },

  methods: {
    loadTree() {
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
    },

    loadData(reload = false) {}
  }
};
</script>

