<template>
    <div id="box" >
  
    </div>
  </template>
  <script>
  export default {
    name: "testFile",
    data() {
      return {
        childValue: "子组件数据",
        tableData: [1, 2, 3],
      };
    },
    mounted() {
      this.sendToParent();
    },
    computed: {
  
    },
    created() {},
    methods: {
      sendToParent() {
        this.$emit("childByValue", this.childValue);
      },
    },
  };
  </script>
  