<template>
  <el-row>
    <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="aboutBox">
        <!-- <div class="language-js">
      <pre>
        <code>let da = 11;1111</code>
      </pre>
    </div> -->
        <div class="describe_text">
          <p class="normalP">
            Hello，这是我的第一个前端博客，使用的技术是<span class="normalSpan"
              >Vue+Node.js</span
            >作为主体开发。 后期目标：使用<span class="normalSpan">Java</span
            >编写后台，目前Java学习到collection。
            在掘金平台分享工作中遇到的小问题及初次体验：<a
              target="_blank"
              class="normalSpanA"
              href="https://juejin.cn/post/6979778875676950565"
              >Vue主题切换</a
            >
            &nbsp;
            <a
              class="normalSpanA"
              href="https://juejin.cn/post/6966031963496906765"
              target="_blank"
              >DataV border12渲染echarts适应屏幕</a
            >
          </p>
          <p class="normalP">以下是一些可以找到我的地方：</p>
          <ul>
            <li>
              <a
                class="normalSpanA"
                href="https://github.com/surfinthesky"
                target="_blank"
                >GitHub</a
              >
            </li>
            <li>
              <a
                class="normalSpanA"
                href="https://weibo.com/u/5944123856"
                target="_blank"
                >WeiBo</a
              >
            </li>
            <li>
              <a
                class="normalSpanA"
                href="https://juejin.cn/user/2400989127650712"
                target="_blank"
                >JueJin</a
              >
            </li>
          </ul>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AboutIndex",
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
@import "@/styles/variables.scss";
.el-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
//设置高亮span文字
.normalSpanA {
  color: #337ab7;
}
.normalP {
  line-height: 2;
  margin: 10px 0;
  // color: #404040;
  @include font_color("about-normalP");
}
.aboutBox {
  position: relative;
  // background-color: #fff;
  @include background_color("main-left_licolor");
  border-radius: 5px;
  padding: 5px 0;
  font-size: 16px;
  .describe_text {
    margin: 30px 10px;
  }
  ul > li {
    margin: 10px 0px 10px 20px;
  }
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
