<template>
  <div>
    <Checkbox :value="checkAll" @click.prevent.native="checkAllBtnClick()">
      <strong>{{ property.property_name }}</strong>
    </Checkbox>
    <Button type="primary" size="small" @click="btnClick()">{{ "添加" + property.property_name }}</Button>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <Checkbox
        v-for="item in property.property_values"
        :key="item.property_value_id"
        :label="item.property_value_id"
      >{{ item.property_value_name }}</Checkbox>
    </CheckboxGroup>
    <div style="border-bottom: 1px dashed #e8eaec;margin: 10px 0;"></div>
  </div>
</template>

<script>
export default {
  name: "CategoryPropertyValue",

  props: {
    property: {
      type: [Object],
      default: () => ({})
    },

    propertyChecked: {
      type: [Array],
      default: () => []
    }
  },

  watch: {
    propertyChecked: {
      handler() {
        this.updateCheckAllGroup();
      },
      immediate: true
    }
  },

  data() {
    return {
      checkAll: false,
      checkAllGroup: []
    };
  },

  methods: {
    updateCheckAllGroup() {
      if(this.propertyChecked.length) {
        const propertyValueIds = this.propertyChecked.map(item => item.property_value_id);
        this.checkAllGroup = Array.from(new Set(propertyValueIds))
        this.initCheckAllStatus();
      }
    },

    selection() {
      if (!this.checkAllGroup.length) return [];

      const propertyValues = this.property.property_values.filter(item => {
        return this.checkAllGroup.indexOf(item.property_value_id) > -1;
      });

      const { property_id, property_name } = this.property;

      const selections = propertyValues.map(item => {
        return Object.assign({}, item, { property_id, property_name })
      })

      return selections;
    },

    checkAllBtnClick() {
      this.checkAll = !this.checkAll;
      this.checkAll
        ? (this.checkAllGroup = this.property.property_values.map(
            item => item.property_value_id
          ))
        : (this.checkAllGroup = []);
      this.checkAllGroupChange(this.checkAllGroup);
    },

    initCheckAllStatus() {
      if (
        this.checkAllGroup.length > 0 &&
        this.checkAllGroup.length === this.property.property_values.length
      ) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },

    checkAllGroupChange() {
      this.initCheckAllStatus();
    },

    btnClick() {
      this.$emit("on-create-btn-click");
    }
  }
};
</script>

