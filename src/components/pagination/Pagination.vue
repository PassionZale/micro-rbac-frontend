<template>
  <div class="Pagination">
    <Select
      class="page-size-select"
      v-model="pagination.pageSize"
      @on-change="pageSizeChange()"
    >
      <Option v-for="item in pagination.pageSizeOpts" :value="item" :key="item">{{item}} 条/页</Option>
    </Select>
    <Page
      class="page"
      :current.sync="pagination.page"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      @on-change="page-change()"
      show-elevator
      show-total
    ></Page>
  </div>
</template>

<script>
import { PAGE_PARAMS } from "@/utils/constants";

export default {
  name: "Pagination",

  data() {
    return {
      pagination: Object.assign({}, PAGE_PARAMS)
    };
  },

  methods: {
    resetPage() {
      this.pagination.page = 1;
    },

    initTotal(total = 0) {
      this.pagination.total = total;
    },

    query() {
      const { page, pageSize } = this.pagination;
      return { page, pageSize };
    },

    pageSizeChange() {
      this.$emit("on-page-size-change");
    },

    pageChange() {
      this.$emit("on-page-change");
    }
  }
};
</script>

<style lang="less">
.Pagination {
  .page-size-select {
    width: 100px;
    text-align: center;
    display: inline-block;
    line-height: 32px;
    margin-top: -25px;
  }

  .page {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>


