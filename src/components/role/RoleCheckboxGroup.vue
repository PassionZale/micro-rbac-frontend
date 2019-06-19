<template>
  <div>
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
      <Checkbox :value="checkAll" @click.prevent.native="checkAllBtnClick()">全选</Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <Checkbox v-for="item in roles" :key="item.id" :label="item.id">{{ item.name }}</Checkbox>
    </CheckboxGroup>
  </div>
</template>

<script>
import { GET_ROLES_FORMAT } from "@/api/role";

export default {
  name: "RoleCheckboxGroup",

  props: {
    value: {
      type: [Array],
      default: () => []
    }
  },

  data() {
    return {
      roles: [],

      checkAll: false,

      checkAllGroup: []
    };
  },

  watch: {
    value(val) {
      this.updateCheckAllGroup();
    }
  },

  created() {
    this.loadData();
    this.updateCheckAllGroup();
  },

  methods: {
    loadData() {
      GET_ROLES_FORMAT().then(response => {
        this.roles = response.data;
        this.initCheckAllStatus();
      });
    },

    updateCheckAllGroup() {
      this.checkAllGroup = [...this.value];
      this.initCheckAllStatus();
    },

    initCheckAllStatus() {
      if(this.checkAllGroup.length > 0 && this.checkAllGroup.length === this.roles.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },

    checkAllBtnClick() {
      this.checkAll = !this.checkAll;
      this.checkAll ? this.checkAllGroup = this.roles.map(item => item.id) : this.checkAllGroup = [];
      this.checkAllGroupChange(this.checkAllGroup);
    },

    checkAllGroupChange(val) {
      this.initCheckAllStatus();
      this.$emit("input", val);
    }
  }
};
</script>

