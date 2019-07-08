<template>
  <div class="ErrorView">
    <div class="error-content">
      <h1>{{ code }}</h1>
      <h2>{{ desc }}</h2>
      <P>{{ remark }}</P>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorView",

  props: {
    code: {
      type: [String, Number],
      required: true
    },

    desc: {
      type: [String],
      required: true
    },

    remark: {
      type: [String],
      required: true
    }
  }
}
</script>

<style lang="less">
.ErrorView {
  height: auto;
  min-height: 100%;
  .error-content {
    color: #000000;
    text-align: center;
    width: 800px;
    margin-left: -400px;
    position: absolute;
    top: 30%;
    left: 50%;
    h1 {
      margin: 0;
      font-size: 120px;
      line-height: 120px;
      font-weight: bold;
    }
    h2 {
      margin-top: 20px;
      font-size: 30px;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>
