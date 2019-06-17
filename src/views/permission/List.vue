<template>
  <layout-list>
    <template slot="form">
      <Form inline :label-width="80">
        <FormItem label="权限名称">
          <Input type="text" v-model="form.name"/>
        </FormItem>
        <FormItem label="权限编码">
          <Input type="text" v-model="form.code"/>
        </FormItem>
        <FormItem label="权限路由">
          <Input type="text" v-model="form.route"/>
        </FormItem>
        <Button type="primary" @click="loadData(true)">查询</Button>
      </Form>
    </template>

    <template slot="tool-left">
      <Button type="primary" @click="$router.push({ name: 'permission-create' })">新增</Button>
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
import { GET_PERMISSIONS, PUT_PERMISSION } from "@/api/permission";

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
        columns: []
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

      const params = Object.assign({}, this.form, this.$refs["page"].query());

      GET_PERMISSIONS(params)
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
