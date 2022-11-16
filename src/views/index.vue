<template>
  <div ref="Boxindex" id="Boxindex">
    <el-container>
      <!-- 头部tab -->
      <el-header>
        <el-row :gutter="0" class="headerRow">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12"
            ><div class="grid-content bg-purple">
              <img
                src="https://blog.ibireme.com/wp-content/uploads/2015/05/logo1.png"
                alt=""
                srcset=""
              /></div
          ></el-col>
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
      <el-main>
        <div class="container-lg">
          main 2 2 2 ---- {{ scrollValue }}
          <router-view></router-view>
        </div>
      </el-main>
      <div class="progress-indicator" :style="{ width: progressValue }"></div>
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
export default {
  name: "homePage",
  data() {
    return {
      clientHeightValue: 0,
      progressValue: 0, //顶部进度宽度百分比
      topTabList: [
        {
          name: "首页",
          path: "/",
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
      activeIndex: 0, //默认选中索引
      activeName: "/",
      show: false,
    };
  },
  mounted() {
    this.successValue();
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    function Product(name, price) {
      this.name = name;
      this.price = price;
    }
    function Food(name, price) {
      Product.call(this, name, price);
      this.category = "food";
    }
    var fun = new Food("robot", 40);
    console.log(fun);
  },
  computed: {
    ...mapState(["scrollValue"]),
  },
  watch: {
    scrollValue(newVal) {
      if (newVal > 300) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
  methods: {
    ...mapMutations({
      set_i18n: "SET_i18n",
      setScrollValue: "SET_scrollValue",
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
      this.$router.push({
        path: tab.name,
      });
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
    backTotop() {
      if (this.scrollValue == 0) {
        return;
      }
      window.scrollTo({ top: 0, right: 0, behavior: "smooth" });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-header,
.el-main {
  padding: 0px;
}
.el-header {
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
}
.el-header,
.el-footer {
  color: #666;
  line-height: 60px;
}

.el-main {
  //   background-color: #e9eef3;
  color: #333;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  height: 2000px;
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
</style>
