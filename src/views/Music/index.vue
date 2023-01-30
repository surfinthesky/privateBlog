<template>
  <div>
    <div>Music</div>
    <!-- 切换语言 -->
    <!-- tabs标签页 -->
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "MusicPage",
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
<style lang="scss" scoped>
@import "@/styles/minxin.scss";
  ul>li{
    $list-bg:red,orange,blue,skyblue,#ccc,#fff;
    @include ele_for($list-bg)
  }
</style>
