<template>
    <div>
      <div>RoastPage</div>
      <!-- 切换语言 -->
      <!-- tabs标签页 -->
    </div>
  </template>
  
  <script>
  import { mapMutations } from "vuex";
  export default {
    name: "RoastPage",
    data() {
      return {};
    },
    mounted() {},
    created() {},
    methods: {
      ...mapMutations({
        set_i18n: "SET_i18n",
      }),
    },
  };
  </script>
  <style lang="scss" scoped></style>
  