<template>
  <div>
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
      <Checkbox :value="checkAll" @click.prevent.native="checkAllBtnClick()">全选</Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <Row>
        <Col v-for="item in permissions" :key="item.id" span="6">
          <Checkbox :label="item.id">{{ item.name }}</Checkbox>
        </Col>
      </Row>
    </CheckboxGroup>
  </div>
</template>

<script>
import { GET_PERMISSIONS_FORMAT } from "@/api/permission";

export default {
  name: "PermissionCheckboxGroup",

  props: {
    value: {
      type: [Array],
      default: () => []
    }
  },

  data() {
    return {
      permissions: [],

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
      GET_PERMISSIONS_FORMAT().then(response => {
        this.permissions = response.data;
        this.initCheckAllStatus();
      });
    },

    updateCheckAllGroup() {
      this.checkAllGroup = [...this.value];
      this.initCheckAllStatus();
    },

    initCheckAllStatus() {
      if(this.checkAllGroup.length > 0 && this.checkAllGroup.length === this.permissions.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },

    checkAllBtnClick() {
      this.checkAll = !this.checkAll;
      this.checkAll ? this.checkAllGroup = this.permissions.map(item => item.id) : this.checkAllGroup = [];
      this.checkAllGroupChange(this.checkAllGroup);
    },

    checkAllGroupChange(val) {
      this.initCheckAllStatus();
      this.$emit("input", val);
    }
  }
};
</script>

