<template>
  <div class="international">
    <!-- 切换语言 -->
    <!-- tabs标签页 -->
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="180px" arrow="never">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="homePageBox">
      <!-- 内容左侧 -->
      <div class="content_left">
        <div
          class="infinite-list"
          :style="{ overflow: overFlow == true ? 'auto' : 'hidden' }"
        >
          <ul
            class="content_left_ul"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
          >
            <!-- 骨架层 -->
            <el-skeleton style="" :loading="loadingSk" animated :count="10">
              <!-- 初始骨架显示 -->
              <template slot="template">
                <div
                  style="
                    padding: 10px 15px;
                    margin-bottom: 15px;
                    min-height: 110px;
                  "
                >
                  <div style="display: flex; flex-direction: column">
                    <el-skeleton-item variant="h2" style="width: 50%" />
                    <el-skeleton-item
                      variant="h3"
                      style="width: 50%; margin-top: 10px; min-height: 30px"
                    />
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-items: space-between;
                      margin-top: 16px;
                      height: 16px;
                    "
                  >
                    <el-skeleton-item
                      variant="text"
                      style="margin-right: 16px"
                    />
                    <el-skeleton-item variant="text" style="width: 30%" />
                  </div>
                </div>
              </template>
              <!-- 最终数据渲染 -->
              <template>
                <li v-for="(item, index) in tableList" :key="index">
                  <div class="text_left">
                    <h2>
                      <!-- 没有天赋的努力是否毫无意义？以你现在的努力程度还轮不到拼天赋 -->
                      {{ item.articleTitle }}
                    </h2>
                    <div class="acticle_dscibe">
                      <!-- 组件使用后时出现报错，解决方案 -->
                      {{ item.articleDscibe }}
                    </div>
                    <div class="article_info">
                      <span class="p_author" title="作者"
                        ><i class="el-icon-user"
                          >&nbsp;<span>Author cong</span></i
                        ></span
                      >
                      <span
                        ><i class="el-icon-folder" title="分类"
                          >&nbsp; <span> {{ item.articleDiff }}</span></i
                        ></span
                      >
                      <span class="p_time"
                        ><i class="el-icon-date" title="时间"
                          >&nbsp;<span>{{ item.articleDate }}</span></i
                        ></span
                      >
                      <span class="p_time"
                        ><i class="el-icon-collection-tag" title="时间"
                          >&nbsp;<span>标签</span></i
                        ></span
                      >
                    </div>
                    <span class="p_read"
                      ><el-button type="text" @click="drawerMe(item)"
                        >阅读全文</el-button
                      ></span
                    >
                  </div>
                </li>
              </template>
            </el-skeleton>
            <p v-if="loading" style="color: #409eff">加载中......</p>
            <p v-if="noMore" style="color: #409eff">没有更多了......</p>
          </ul>
        </div>
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[currentPagesize]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="currentPagetotal"
        >
        </el-pagination> -->
      </div>
      <!-- 内容右侧 -->
      <div class="content_right">
        <div class="aside">
          <div class="introduction">
            <img
              class="introduction_img"
              src="https://gd-hbimg.huaban.com/c4ab80a0b7289bd71784e7a2d7f7d40ecf28563981a3b-6Uowp5_fw658"
              alt=""
            />
            <h3>博客简介</h3>
            <p>
              在日常开发中遇到的问题总结出来，分享大家。
              有不足之处希望大家多多指出，相互提升。在平常工作或学习的过程中学会新的知识，
              如果没有马上用得上，基本上就会很快忘掉，这个相信大家都会深有体会。那么
              最有效也是最笨的方法：那就是重复重复再重复。然后
              学完一定要总结，这个总结的过程就是在加深你的记忆！
              每天进步一点点，终会厚积薄发。 借用一句话：冰冻三尺 非一日之寒。
            </p>
          </div>
          <div class="categories">
            <h3>文章分类</h3>
            <ul>
              <li><span>Vue</span><span>121</span></li>
              <li><span>React</span><span>3</span></li>
              <li><span>Java</span><span>44</span></li>
              <li><span>Mysql</span><span>11</span></li>
              <li><span>Javascript</span><span>0</span></li>
              <li><span>Little knowledge</span><span>3</span></li>
              <li><span>更多...</span></li>
            </ul>
          </div>
          <div class="hot_acticle">
            <h3>热门文章</h3>
            <ul>
              <li><span>No1</span><span> 第一个前端博客</span></li>
              <li><span>No2</span><span> 第一个前端博客</span></li>
              <li><span>No3</span><span> 第一个前端博客</span></li>
              <li><span>No4</span><span> 第一个前端博客</span></li>
              <li><span>No5</span><span> 第一个前端博客</span></li>
            </ul>
          </div>
          <!-- <div class="alllabels">
            <h3>全部标签</h3>
            <el-tag>标签一</el-tag>
            <el-tag type="success">yarn</el-tag>
            <el-tag type="info">npm</el-tag>
            <el-tag type="warning">v-if</el-tag>
            <el-tag type="warning">v-else</el-tag>
            <el-tag type="warning">v-bind</el-tag>
            <el-tag type="danger">v-show</el-tag>
            <el-tag type="success">yarn</el-tag>
            <el-tag type="info">npm</el-tag>
            <el-tag type="warning">v-if</el-tag>
            <el-tag type="warning">v-else</el-tag>
            <el-tag type="warning">v-if</el-tag>
            <el-tag type="warning">v-else</el-tag>
            <el-tag type="warning">v-bind</el-tag>
            <el-tag type="danger">v-show</el-tag>
            <el-tag type="success">babel</el-tag>
            <el-tag type="info">v-model</el-tag>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-drawer title="没有天赋" size="95%">
      <span>我来啦!</span>
    </el-drawer>
    <el-dialog :visible.sync="drawer" width="1112px">
      <h1 style="height: 50px; color: #343a40; font-size: 28px">
        {{ drawerarticleTitle }}
      </h1>
      <div v-html="value" class="markdown-body"></div>
      <messagebox></messagebox>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import infiniteScroll from "vue-infinite-scroll";
import { Base64 } from "js-base64";
import Marked from "marked";
import highlight from "highlight.js";
// import "highlight.js/styles/github.css";
import { mapMutations } from "vuex";
import { preventOverHidden, preventOverauto } from "@/utils/utils";
import { getDateFormatComplete } from "@/utils/formDate";
import messagebox from "@/components/messageCom.vue";
import { getarticlelist, getIpdetails } from "@/api/user";
Vue.use(infiniteScroll);
Vue.use(Base64);
export default {
  name: "vueInternationalI18n",
  components: {
    messagebox,
  },
  data() {
    return {
      value: "",
      date: new Date().toDateString(),
      drawer: false,
      direction: "rtl",
      currentPage: 0,
      currentPagesize: 10,
      currentPagetotal: 1,
      tableList: [], //列表数据
      drawerarticleTitle: "",
      loading: false,
      noMore: false,
      overFlow: true,
      loadingSk: true, //骨架的显示隐藏
    };
  },
  mounted() {
    this.date = getDateFormatComplete(new Date());
    this.getPagelist();
    getIpdetails().then((res) => {
      console.log(res.data);
    });
    // .then((err)=>{console.log(err);})
  },
  created() {},
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  watch: {
    drawer(newval) {
      if (newval == true) {
        preventOverHidden();
      } else {
        preventOverauto();
      }
    },
  },
  methods: {
    setLoading() {
      setTimeout(() => {
        this.loadingSk = false;
      }, 1500);
    },
    returnLoading() {
      return this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)",
      });
    },
    load() {
      this.returnLoading();
      this.overFlow = false;
      preventOverHidden();
      this.getPagelist();
    },
    //获取首页文章
    getPagelist() {
      if (this.tableList.length !== this.currentPagetotal) {
        this.currentPage += 1;
      } else {
        setTimeout(() => {
          this.returnLoading().close();
          this.overFlow = true;
          preventOverauto();
        }, 600);
        this.noMore = true;
        return;
      }
      if (this.currentPage == 1) {
        this.setLoading();
      }
      //文章接口api
      getarticlelist({
        pagenum: this.currentPage,
        pagesize: this.currentPagesize,
      }).then((res) => {
        res.data.result.map((item) => {
          item.articleDate = getDateFormatComplete(item.articleDate);
        });
        this.tableList = [...this.tableList, ...res.data.result];
        console.log(this.tableList);
        setTimeout(() => {
          this.returnLoading().close();
          console.log(this.currentPage, "this.currentPage");
          this.overFlow = true;
          preventOverauto();
        }, 600);
        this.currentPagetotal = res.data.count;
      });
    },
    // 国际化
    ...mapMutations({
      set_i18n: "SET_i18n",
    }),
    initMaven(content) {
      const rendererMD = new Marked.Renderer();
      rendererMD.image = function (href, title, text) {
        return `<img onclick="showMarkedImage(event, '${href}')" src="${href}" alt="${text}" title="${
          title ? title : ""
        }">`;
      };
      Marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        },
      });

      this.value = Marked(content).replace(
        /<pre>/g,
        "<pre class='language-html'>"
      );
    },
    open() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    //阅读详情
    drawerMe(payload) {
      this.drawer = true;
      this.drawerarticleTitle = payload.articleTitle;
      this.initMaven(Base64.decode(payload.articleHtmlText));
      console.log(payload);
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(() => {
    //       done();
    //     })
    //     .catch(() => {});
    // },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   this.getPagelist();
    //   console.log(`当前页: ${this.currentPage}`);
    // },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/minxin.scss";
@import "@/styles/github-markdown.css";
@import "@/styles/variables.scss";
$background_color: #fff;
.infinite-list {
  height: 1250px;
  width: 100%;
}
.infinite-list::-webkit-scrollbar {
  width: 0 !important;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #e8f3fe;
  margin: 10px;
  color: #7dbcfc;
}
.international {
  margin-bottom: 25px;
  // @include ele_text(left,50px);
  // @include ele_border(2px,#fff)
  // @include ele_border_ra(50%)
  // @include ele_text_padd(1px,0px,3px,1px)
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.carousel {
  background-color: $background_color;
  margin-top: 20px;
}

.homePageBox {
  margin-top: 15px;
  display: flex;

  // box-sizing: content-box;
  .content_left {
    // background-color: $background_color;
    position: relative;
    display: flex;
    width: 71%;

    .el-pagination {
      position: absolute;
      bottom: 20px;
      display: flex;
      // flex: 1;
      width: 100%;
      justify-content: center;
      // border-top: 1px solid #ccc;
      box-sizing: border-box;
    }
  }

  .content_right {
    // margin-left: 10px;
    // background-color: $background_color;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 15px;
  }

  .content_left_ul {
    width: 100%;
  }

  .content_left_ul > div > li {
    display: flex;
    // background-color: $background_color;
    @include background_color("main-left_licolor");
    margin-bottom: 15px;
    padding: 10px 15px;
    min-height: 110px;
    border-radius: 5px;
  }

  .content_left_ul > div > li:hover {
    box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.1);
  }

  .text_left {
    position: relative;
    width: 100%;
    padding: 5px;

    h2 {
      // color: #343a40;
      @include font_color("main-left_h2");
      font-size: 18px;
    }

    h3 {
      color: #666666;
      margin-top: 10px;
      display: -webkit-box;
      height: 48px;
      overflow: hidden;
      line-height: 24px;
      -webkit-box-orient: vertical;
      box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  .acticle_dscibe {
    margin-top: 10px;
    min-height: 30px;
    // color: rgba(0, 0, 0, 0.43);
    @include font_color("main-left_dscibe");
    font-size: 12px;
  }

  .article_info {
    position: absolute;
    left: 5px;
    bottom: 5px;
    // color: #999;
    @include font_color("main-left_info");
    span {
      padding-right: 10px;
      // text-indent:5px
    }
  }

  .p_read {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #777;

    .el-button--text {
      padding: 0px;
    }
  }

  span {
    // font-size: 13px;
  }

  //右侧aside
  .aside {
    padding: 0px 5px 5px 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;

    // background-color: $background_color;
    h3 {
      // display: inline-block;
      padding: 4px 15px;
      margin: -1px 0 0 0;
      font-size: 15px;
      font-size: 14px;
      color: $background_color;
      // background: #1890ff;
      @include background_color("main-right_title");
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    p {
      // color: #666666;
      @include font_color("main-right_aside_p");
      // margin: 10px 0 0;
      line-height: 24px;
      text-align: justify;
      text-align-last: left;
      text-indent: 2rem;
      letter-spacing: 2px;
      padding: 10px 10px;
      // background-color: $background_color;
      @include background_color("main-left_licolor");
    }

    .introduction {
      // background-color: $background_color;
      margin-bottom: 25px;
      border-radius: 5px;
      flex: 1;
      display: flex;
      flex-direction: column;

      &_img {
        flex: 1;
        width: 100%;
        height: 100px;
        margin-bottom: 25px;
        border-radius: 5px;
      }
    }

    .hot_acticle {
      margin-bottom: 25px;

      ul {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      ul > li {
        // background-color: $background_color;
        @include background_color("main-left_licolor");
        @include font_color("main-right_aside_p");
        padding: 10px 8px;
        cursor: pointer;
      }

      ul > li > span:nth-child(odd) {
        font-size: 16px;
      }

      ul > li:nth-child(1) > span:nth-child(1) {
        color: rgb(244, 78, 3);
      }

      ul > li:nth-child(2) > span:nth-child(1) {
        color: rgb(212, 24, 0);
      }

      ul > li:nth-child(3) > span:nth-child(1) {
        color: rgb(243, 126, 33);
      }

      ul > li:nth-child(4) > span:nth-child(1) {
        color: rgb(243, 33, 45);
      }

      ul > li:nth-child(5) > span:nth-child(1) {
        color: rgb(33, 45, 243);
      }
    }

    .categories {
      border-radius: 5px;
      margin-bottom: 25px;

      ul > li > span:nth-child(even) {
        // background-color: #ccc;
        @include background_color("main-right_aside_catespan");
        border-radius: 50%;
        min-width: 25px;
        min-height: 25px;
        text-align: center;
        line-height: 25px;
        padding: 1px;
        // color:#fff;
      }

      ul > li {
        padding: 16px 8px;
        font-size: 14px;
        @include displayEleBetween;
        @include background_color("main-left_licolor");
        @include font_color("main-right_aside_p");
        // background-color: $background_color;
      }

      ul > li:hover {
        color: #11a8cd;
        background: #f8f8f8;
        border-left: 1px solid #11a8cd;
      }
    }

    .alllabels {
      border-radius: 5px;
      margin-bottom: 15px;
      background-color: $background_color;

      span {
        margin: 4px 6px;
      }
    }
  }
}
</style>
