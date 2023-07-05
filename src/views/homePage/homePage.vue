<template>
  <div class="international">
    <!-- 轮播 -->
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="180px" arrow="never">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="homePageBox">
      <el-row>
        <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
          <!-- 内容左侧 -->
          <div class="content_left">
            <div
              class="infinite-list"
              ref="infinitelist"
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
                        display: flex;
                        justify-content: space-between;
                      "
                    >
                      <!-- 骨架图片 -->
                      <el-skeleton-item
                        variant="image"
                        style="width: 190px; height: 120px; margin-right: 10px"
                      />
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                          flex: 1;
                        "
                        class="skeletonBox"
                      >
                        <div>
                          <el-skeleton-item variant="h2" style="" />
                          <el-skeleton-item
                            variant="h3"
                            style="margin-top: 10px; min-height: 30px"
                          />
                        </div>
                        <div
                          style="margin-top: 16px; height: 16px; display: flex"
                        >
                          <div
                            style="
                              width: 80%;
                              margin-right: 16px;
                              display: flex;
                            "
                          >
                            <el-skeleton-item
                              variant="text"
                              style="flex: 1; margin-right: 10px"
                            />
                            <el-skeleton-item
                              variant="text"
                              style="flex: 1; margin-right: 10px"
                            />
                            <el-skeleton-item variant="text" style="flex: 1" />
                          </div>
                          <el-skeleton-item variant="text" style="width: 20%" />
                        </div>
                      </div>
                    </div>
                  </template>
                  <!-- 最终数据渲染 -->
                  <template>
                    <li v-for="(item, index) in tableList" :key="index">
                      <div class="text_left">
                        <img
                          class="text_left_img"
                          :src="item.articlePic"
                          alt=""
                        />
                        <div class="text_left_contentRight">
                          <div>
                            <h2>
                              <!-- 没有天赋的努力是否毫无意义？以你现在的努力程度还轮不到拼天赋 -->
                              {{ item.articleTitle }}
                            </h2>
                            <div class="acticle_dscibe">
                              <!-- 组件使用后时出现报错，解决方案 -->
                              {{ item.articleDscibe }}
                            </div>
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
                            <!-- <span class="p_time"
                        ><i class="el-icon-collection-tag" title="时间"
                          >&nbsp;<span>标签</span></i
                        ></span
                      > -->
                          </div>
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
        </el-col>
        <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
          <!-- 内容右侧 -->
          <div class="content_right">
            <div class="aside">
              <div class="introduction">
                <div class="introduction_imgbox">
                  <img
                    class="introduction_img"
                    src="https://gd-hbimg.huaban.com/c4ab80a0b7289bd71784e7a2d7f7d40ecf28563981a3b-6Uowp5_fw658"
                    alt=""
                  />
                </div>
                <!-- <h3>博客简介</h3>
                <p>
                  在日常开发中遇到的问题总结出来，分享大家。
                  有不足之处希望大家多多指出，相互提升。在平常工作或学习的过程中学会新的知识，
                  如果没有马上用得上，基本上就会很快忘掉，这个相信大家都会深有体会。那么
                  最有效也是最笨的方法：那就是重复重复再重复。然后
                  学完一定要总结，这个总结的过程就是在加深你的记忆！
                  每天进步一点点，终会厚积薄发。 借用一句话：冰冻三尺
                  非一日之寒。
                </p> -->
              </div>
              <!-- 文章分类  -->
              <div class="categories">
                <h3>文章分类</h3>
                <ul>
                  <li
                    v-for="(item, index) in sortlist"
                    :key="index"
                    @click="sortFn(item.articleDiff, index)"
                    :class="[index === sortIndex ? 'activeli' : '']"
                  >
                    <span>{{ item.articleDiff }}</span
                    ><span>{{ item.count }}</span>
                  </li>
                  <!-- <li><span>更多...</span></li> -->
                </ul>
              </div>
              <!-- 热门文章 -->
              <div class="hot_acticle">
                <h3>热门文章</h3>
                <ul>
                  <li
                    v-for="(item, index) in hotList"
                    :key="index"
                    @click="hotFn(item.id)"
                  >
                    <span>No{{ index + 1 }}</span
                    ><span> {{ item.articleTitle }}</span>
                  </li>
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
        </el-col>
      </el-row>
    </div>
    <!-- 弹窗 -->
    <!-- <el-dialog :visible.sync="drawer" width="1180px">
      <h1
        style="height: 50px; color: #343a40; font-size: 28px"
        class="dialog_h1"
      >
        {{ drawerarticleTitle }}
      </h1>
      <div
        v-html="value"
        :class="
          themeValue == 'dark' ? 'markdown-body-dark' : 'markdown-body-light'
        "
      ></div>
      <messagebox></messagebox>
    </el-dialog> -->
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import infiniteScroll from "vue-infinite-scroll";
// import { Base64 } from "js-base64";
// import Marked from "marked";
// import highlight from "highlight.js";
// import "highlight.js/styles/github.css";
import { preventOverHidden, preventOverauto } from "@/utils/utils";
import { getDateFormatComplete } from "@/utils/formDate";
// import messagebox from "@/components/messageCom.vue";
Vue.use(infiniteScroll);
// Vue.use(Base64);
import * as Fn from "@/api/user";
export default {
  name: "vueInternationalI18n",
  components: {},
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
      sortlist: [],
      sortValue: "", //默认不分类
      sortBoolean: false,
      sortIndex: "",
      hotList: [], //热门文章
      hotId: "",
      hotDetail: {},
    };
  },
  mounted() {
    this.date = getDateFormatComplete(new Date());
    this.getPagelist();
    // Fn.getIpdetails().then((res) => {
    //   console.log(res.data);
    // });
    Fn.articlesort().then((res) => {
      this.sortlist = res.data.result;
    });
    Fn.articleHotList().then((res) => {
      this.hotList = res.data.result;
    });
  },
  beforeDestory() {
    this.returnLoading().close();
  },
  created() {},
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
    ...mapState(["themeValue"]),
  },
  watch: {
    drawer(newval) {
      if (newval == true) {
        preventOverHidden();
      } else {
        preventOverauto();
      }
    },
    // "$store.state.themeValue"(newval) {
    //   if (newval == "light") {
    //   }
    // },
  },
  methods: {
    ...mapMutations(["SET_articleList"]),
    //热门文章事件
    hotFn(hotID) {
      if (hotID == this.hotId) {
        this.drawerMe(this.hotDetail);
        return;
      }
      this.hotId = hotID;
      Fn.getArticledetail({ id: hotID }).then((res) => {
        if (res.data.result) {
          this.hotDetail = res.data.result[0];
          this.drawerMe(res.data.result[0]);
        }
      });
    },
    //分类请求
    sortFn(sortValue, sortIndex) {
      this.sortIndex = sortIndex;
      //点击相同分类不做请求
      if (sortValue == this.sortValue) {
        return;
      }
      this.$refs.infinitelist.scrollTop = 0;
      this.tableList = [];
      this.loadingSk = true;
      this.noMore = false;
      this.sortValue = sortValue;
      this.currentPage = 0;
      this.currentPagetotal = 1;
      this.getPagelist();
    },
    //当前时间+12小时 毫秒数
    accessTimeInHour() {
      let date = new Date();
      let date1 = new Date().getTime(); // 获取当前时间戳
      // 当前时间戳+3600s（一小时，其他时间通过计算时间戳进行相应加减），重新设置 Date 对象
      return date.setTime(date1 + 3600000 * 12);
    },
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
    // 无限加载初始化方法
    load() {
      this.overFlow = false;
      preventOverHidden();
      this.getPagelist();
    },
    //获取首页文章
    getPagelist() {
      if (this.tableList.length != this.currentPagetotal) {
        this.currentPage += 1;
        this.returnLoading();
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
      Fn.getarticlelist({
        pagenum: this.currentPage,
        pagesize: this.currentPagesize,
        sortvalue: this.sortValue,
      }).then((res) => {
        res.data.result.map((item) => {
          item.articleDate = getDateFormatComplete(item.articleDate);
        });
        if (!this.sortValue) {
          this.tableList = [...this.tableList, ...res.data.result];
        } else if (this.sortValue && this.sortBoolean) {
          this.tableList = [...this.tableList, ...res.data.result];
        } else {
          this.sortBoolean = true;
          this.tableList = res.data.result;
        }
        this.SET_articleList(this.tableList);
        // console.log(this.tableList);
        if (this.tableList.length < 10) {
          this.noMore = true;
        }
        setTimeout(() => {
          this.returnLoading().close();
          console.log(this.currentPage, "this.currentPage");
          this.overFlow = true;
          preventOverauto();
        }, 600);
        this.currentPagetotal = res.data.count;
      });
    },
    //阅读详情
    drawerMe(payload) {
      console.log(payload.id);
      if (!localStorage.getItem("readNumList")) {
        this.initRead(payload.id, "");
      } else if (localStorage.getItem("readNumList")) {
        let list = JSON.parse(localStorage.getItem("readNumList"));
        let timeobj = list.find((item) => item.readid == payload.id);
        //未添加过的id文章
        if (!timeobj) {
          this.initRead(payload.id, timeobj);
          return;
        }
        // 有添加过的文章 比较上次增加阅读量的时间
        if (new Date().getTime() > timeobj.time) {
          this.initRead(payload.id, "");
        } else {
          this.initRead(payload.id, timeobj);
        }
        console.log(timeobj);
      }

      console.log(payload);
    },
    initRead(readId, status) {
      if (status) {
        this.$router.push({
          path: "article",
          query: { id: readId },
        });
        return;
      } else {
        Fn.readnum(readId).then((res) => {
          console.log(res, "res");
          let list = JSON.parse(localStorage.getItem("readNumList"));
          let objStatus = list.find((item) => item.readid == readId);
          let objIndex = list.findIndex((item) => item.readid == readId);
          if (res) {
            // 是否存储过文章阅读id 存储过在原基础time属性重新赋值
            if (objStatus) {
              list[objIndex].time = this.accessTimeInHour();
              localStorage.setItem("readNumList", JSON.stringify(list));
              this.$router.push({
                path: "article",
                query: { id: readId },
              });
              return;
            }
            const obj = new Object();
            obj.time = this.accessTimeInHour();
            obj.readid = readId;
            let arr = [];
            arr.push(obj);
            let localarr = JSON.parse(localStorage.getItem("readNumList"));
            if (localarr) {
              localStorage.setItem(
                "readNumList",
                JSON.stringify([...arr, ...localarr])
              );
            } else {
              localStorage.setItem("readNumList", JSON.stringify(arr));
            }
            this.$router.push({
              path: "article",
              query: { id: readId },
            });
          }
        });
      }
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
@import "@/styles/variables.scss";
@import "@/styles/github-markdown-dark.css";
@import "@/styles/github-markdown-light.css";
$background_color: #fff;
@keyframes el-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
.el-row {
  width: 100%;
  padding: 0px !important;
  margin: 0px !important;
}
.infinite-list {
  height: 1250px;
  // width: 100%;
  flex: 1;
  .el-skeleton.is-animated .el-skeleton__item {
    background-image: linear-gradient(
      90deg,
      #d3d3d3 25%,
      #a9a9a9 37%,
      #d3d3d3 63%
    ) !important;
    background-size: 400% 100% !important;
    animation: 1.4s ease infinite el-skeleton-loading !important;
  }
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
  ::v-deep .el-dialog {
    @include background_color("dialog_bgcolor");
  }
  .dialog_h1 {
    @include font_color("main-left_h2");
  }
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
  // margin-top: 20px;
}

.homePageBox {
  display: flex;

  // box-sizing: content-box;
  .content_left {
    // background-color: $background_color;
    position: relative;
    display: flex;
    // width: 71%;

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
  .content_left_ul > div > li:nth-child(1) {
    margin-top: 15px;
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
    // box-shadow: 0 1px 15px 0 rgba(255, 255, 255, 0.3);
    @include box_shadow("main-left_shadow");
  }

  .text_left {
    position: relative;
    width: 100%;
    padding: 5px;
    @include displayflex();
    .text_left_contentRight {
      @include displayEleColumn2();
    }
    &_img {
      width: 190px;
      height: 120px;
      margin-right: 10px;
      border-radius: 4px;
      // float: left;
    }
    &_img:hover {
      transform: scale(1.02);
    }
    h2 {
      // color: #343a40;
      // display: inline-block;
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
    // display: inline-block;
  }

  .article_info {
    // position: absolute;
    // left: 205px;
    // bottom: 5px;
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
    padding: 0px 0px 5px 5px;
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
      // margin-bottom: 25px;
      border-radius: 5px;
      flex: 1;
      display: flex;
      flex-direction: column;
      &_imgbox {
        flex: 1;
        width: 100%;
        height: 100px;
        margin-bottom: 25px;
        margin-top: 15px;
      }
      &_img {
        width: 100%;
        height: 340px;
        border-radius: 3px;
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
        padding: 16px 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      ul > li > span:nth-child(odd) {
        font-size: 16px;
      }
      ul > li > span:nth-child(even) {
        margin-left: 4px;
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
        cursor: pointer;
        // background-color: $background_color;
      }
      .activeli {
        border-left: 1px solid burlywood;
        @include background_color("main-right_aside_activeli");
      }
      ul > li:hover {
        // color: #11a8cd;
        // background: #f8f8f8;
        // border-left: 1px solid #11a8cd;
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
