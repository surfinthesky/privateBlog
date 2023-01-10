<template>
  <div ref="Boxindex" id="Boxindex">
    <el-container>
      <!-- 头部tab -->
      <el-header>
        <el-row :gutter="0" class="headerRow">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
            ><div class="grid-content bg-purple">
              <!-- <img
                src=""
                alt=""
                srcset=""
              /> -->
            </div></el-col
          >
          <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12"
            ><div class="grid-content bg-purple-light">
              <ul class="topTabList">
                <!-- <li
                  v-for="(item, index) in topTabList"
                  :key="index"
                  @click="activeClick(index)"
                  :class="[activeIndex == index ? 'active' : '']"
                >
                  <router-link :to="item.path">{{ item.name }}</router-link>
                </li> -->
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane
                    v-for="(item, index) in topTabList"
                    :key="index"
                    :label="item.name"
                    :name="item.path"
                  ></el-tab-pane>
                </el-tabs>
                <!-- <li>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                      More
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>React</el-dropdown-item>
                      <el-dropdown-item>Vue</el-dropdown-item>
                      <el-dropdown-item>Java</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li> -->
              </ul>
            </div></el-col
          >
        </el-row>
      </el-header>
      <!-- 内容区 -->
      <el-main>
        <div class="container-lg">
          <router-view> </router-view>
        </div>
      </el-main>
      <!-- 底部 -->
      <el-footer>
        <el-row :gutter="0">
          <el-col :xs="12" :sm="24" :md="24" :lg="24" :xl="24">
            <ul>
              <li>
                <a target="_blank" href="https://weibo.com/u/5944123856"
                  ><img src="../assets/weibo.png" alt=""
                /></a>
              </li>
              <li class="hover_li" @click="dialogVisible = true">
                <img src="../assets/weixin.png" alt="" />
              </li>
              <li>
                <a target="_blank" href="https://github.com/surfinthesky"
                  ><img src="../assets/github.png" alt=""
                /></a>
              </li>
            </ul>
            <p class="copyright">Copyright © WangCong's Blog 2023</p>
          </el-col>
        </el-row>
      </el-footer>
      <testFile @childByValue="childByValue"></testFile>

      <!-- 微信图片弹窗 -->
      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="true">
        <img
          src="../assets/weixinPersonal.svg"
          alt=""
          style="width: 376px; height: 481px"
        />
      </el-dialog>

      <!-- 顶部进度条 -->
      <div class="progress-indicator" :style="{ width: progressValue }"></div>
      <!-- 右侧返回顶部按钮 -->
      <transition name="el-fade-in-linear">
        <div v-show="show" @click="backTotop()" class="backTotop">
          <img src="@/assets/backTotop.png" alt="" />
        </div>
      </transition>
    </el-container>
  </div>
</template>
<script>
import $ from "jquery";
import { mapState, mapMutations } from "vuex";
import { preventOverHidden, preventOverauto, _debounce } from "@/utils/utils";
import testFile from "./testFile/testFile.vue";
export default {
  name: "homePage",
  components: { testFile },
  data() {
    return {
      clientHeightValue: 0,
      progressValue: 0, //顶部进度宽度百分比
      topTabList: [
        {
          name: "首页",
          path: "/homepage",
        },
        {
          name: "About",
          path: "/about",
        },
        {
          name: "Archive",
          path: "/archive",
        },
        {
          name: "Music",
          path: "/music",
        },
        {
          name: "其他",
          path: "/others",
        },
        {
          name: "吐槽",
          path: "/roast",
        },
        {
          name: "Notes",
          path: "/notes",
        },
      ],
      activeIndex: "", //默认选中索引
      show: false,
      dialogVisible: false,
    };
  },
  mounted() {
    this.successValue();
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    // function Product(name, price) {
    //   this.name = name;
    //   this.price = price;
    // }
    // function Food(name, price) {
    //   Product.call(this, name, price);
    //   this.category = "food";
    // }
    // var fun = new Food("robot", 40);
    // console.log(fun);
  },
  computed: {
    ...mapState(["scrollValue", "activeName"]),
    // activeName: {
    //   get() {
    //     return this.activeName;
    //   },
    //   set() {},
    // },
  },
  watch: {
    scrollValue(newVal) {
      if (newVal > 300) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    dialogVisible(newVal) {
      if (newVal == true) {
        preventOverHidden();
      } else {
        preventOverauto();
      }
    },
  },
  methods: {
    childByValue(payload) {
      console.log("接受子组件value:" + payload);
    },
    ...mapMutations({
      set_i18n: "SET_i18n",
      setScrollValue: "SET_scrollValue",
      setActiveName: "SET_activeName",
    }),
    //计算步骤条宽度根据滚动条滚动距离
    successValue() {
      let _that = this;
      let $w = $(window);
      let wh = $w.height();
      let h = $("body").height();
      let sHeight = h - wh;
      $w.on("scroll", function () {
        window.requestAnimationFrame(function () {
          let perc = Math.max(0, Math.min(1, $w.scrollTop() / sHeight));
          _that.progressValue = perc * 100 + "%";
        });
      });
    },
    handleClick(tab) {
      console.log(tab);
      this.$router.push({
        path: tab.name,
      });
      this.setActiveName(tab.name);
    },
    //tab的切换
    activeClick(index) {
      this.activeIndex = index;
    },
    //监听右侧滚动条滚动事件
    handleScroll() {
      //滚动的高度
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.setScrollValue(scrollTop);
    },
    //回到顶部
    backTotop: _debounce(function () {
      if (this.scrollValue == 0) {
        return;
      }
      window.scrollTo({ top: 0, right: 0, behavior: "smooth" });
    }, 150),
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/minxin.scss";
::v-deep .el-dialog__body {
  @include displayEle;
}
#Boxindex {
  position: relative;
}
.el-footer {
  margin: 45px 0;
  // position: absolute;
  // bottom: 0px;
  .el-row {
    .el-col {
      .copyright {
        font-size: 14px;
        text-align: center;
        margin-bottom: 0;
        color: #777;
        margin: 15px 0;
      }
      ul {
        @include displayEle;
        img {
          margin: 0px 10px;
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
.el-header,
.el-main {
  padding: 0px;
}
.el-header {
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1033;
  background-color: #fff;
}

.el-header {
  color: #666;
  line-height: 60px;
}

.el-main {
  margin-top: 70px;
  //   background-color: #e9eef3;
  color: #333;
  min-height: 700px;
  margin-bottom: 20px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  display: flex;
  align-items: center;
  transition: all 0.4s ease-in-out;
  height: 60px;
  img {
    max-width: 120px;
    max-height: 100%;
    vertical-align: middle;
  }
}
.topTabList {
  min-width: 410px;
  @include displayEleBetween;
  font-size: 14px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  box-sizing: border-box;
  li {
    padding: 0 10px;
    box-sizing: border-box;
    position: relative;
  }
  .active {
    border-bottom: 1px solid #409eff;
    // position: absolute;
    bottom: 0px;
  }
  //  使用 less 对 css 做出预处理的话，使用 /deep/ 就可以完成样式穿透的行为；
  //  使用 scss 对 css 做出的预处理，所以不能够使用 /deep/ 而应该使用 ::v-deep 才对，于是我便用 ::v-deep 替换了 /deep/
  ::v-deep .el-tabs__header {
    margin: 0px !important;
  }
  // li:hover {
  //   color: #409eff;
  // }
}

.container-lg {
  max-width: 1112px;
  margin-right: auto;
  margin-left: auto;
  // height: 2000px;
}
.headerRow {
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
}
// 下拉菜单
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-link:hover {
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
a:hover,
a:active {
  // color: #409eff;
  // text-decoration: none;
}
.progress-indicator {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background-color: #409eff;
  z-index: 9999;
  // width: 10%;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0; /*初始状态 透明度为0*/
  }
  20% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1; /*结尾状态 透明度为1*/
  }
}
.backTotop {
  position: fixed;
  bottom: 45px;
  right: 45px;
}

::v-deep .el-tabs__nav-wrap::after {
  display: none;
}
</style>
