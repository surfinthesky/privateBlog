<template>
  <div>
    <div>Music</div>
    <div id="aplayer"></div>
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
// import { songList } from "@/json/song.js";
export default {
  name: "MusicPage",
  data() {
    return {};
  },
  mounted() {
    // new aplayer({
    //   container: document.getElementById("aplayer"),
    //   mini: false,
    //   autoplay: false,
    //   theme: "#FADFA3",
    //   loop: "all",
    //   order: "random",
    //   preload: "auto",
    //   volume: 0.7,
    //   mutex: true,
    //   listFolded: false,
    //   listMaxHeight: 90,
    //   lrcType: 3,
    //   audio: songList,
    // });
  },
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
ul > li {
  $list-bg: red, orange, blue, skyblue, #ccc, #fff;
  @include ele_for($list-bg);
  width: calc(100% - 20px);
}
</style>
