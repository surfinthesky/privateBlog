<template>
  <div class="aboutBox">
    <div class="language-js">
      <pre>
        <code>let da = 11;1111</code>
      </pre>
    </div>
    <template>
      <el-skeleton style="width: 240px" animated>
        <template slot="template">
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px"
          />
          <div style="padding: 14px">
            <el-skeleton-item variant="p" style="width: 50%" />
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
              "
            >
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </template>
    <!-- 切换语言 -->
    <!-- tabs标签页 -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AboutIndex",
  data() {
    return {};
  },
  mounted() {},
  created() {
    console.log('----')
  },
  methods: {
    ...mapMutations({
      set_i18n: "SET_i18n",
    }),
  },
};
</script>
<style lang="scss" scoped>
.aboutBox {
  position: relative;
}
.language-js {
  margin: 14px 0;
}
div[class~="language-js"]:before,
div[class~="language-javascript"]:before {
  content: "js";
  position: absolute;
  top: 2px;
  right: 4px;
  z-index: 2;
  font-size: 0.8rem;
  color: #888;
}
</style>
