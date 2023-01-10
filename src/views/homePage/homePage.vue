<template>
  <div class="international">
    <!-- 切换语言 -->
    <!-- tabs标签页 -->
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px" arrow="never">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="homePageBox">
      <!-- 内容左侧 -->
      <div class="content_left">
        <ul class="content_left_ul">
          <li v-for="item in 10" :key="item">
            <div class="text_left">
              <h2>
                没有天赋的努力是否毫无意义？以你现在的努力程度还轮不到拼天赋
              </h2>
              <div class="article_info">
                <span class="p_author" title="作者"
                  ><i class="el-icon-user">&nbsp;Author</i></span
                >
                <span
                  ><i class="el-icon-folder" title="分类">&nbsp;Vue</i></span
                >
                <span class="p_time"
                  ><i class="el-icon-date" title="时间"
                    >&nbsp;{{ date }}</i
                  ></span
                >
                <span class="p_time"
                  ><i class="el-icon-collection-tag" title="时间"
                    >&nbsp;v-for</i
                  ></span
                >
              </div>
              <span class="p_read"
                ><el-button type="text" @click="drawerMe"
                  >阅读全部</el-button
                ></span
              >
            </div>
          </li>
        </ul>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
      <!-- 内容右侧 -->
      <div class="content_right">
        <div class="aside">
          <div class="introduction">
            <h3>博客简介</h3>
            <p>
              关注Web前端开发，坚持分享实践教程的个人博客。梦想一旦付诸行动就会变得神圣，再小的努力乘以365天都会变得伟大，每多学点知识就可少写一行代码。
            </p>
          </div>
          <div class="categories">
            <h3>文章分类</h3>
            <ul>
              <li><span>Vue</span><span>12</span></li>
              <li><span>React</span><span>3</span></li>
              <li><span>Java</span><span>44</span></li>
              <li><span>Mysql</span><span>11</span></li>
              <li><span>Javascript</span><span>0</span></li>
              <li><span>Little knowledge</span><span>3</span></li>
              <li><span>更多...</span></li>
            </ul>
          </div>
          <div class="alllabels">
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
          </div>
        </div>
      </div>
    </div>

    <el-drawer title="没有天赋" :visible.sync="drawer">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { preventOverHidden, preventOverauto } from "@/utils/utils";
import { getDateFormatComplete } from "@/utils/formDate";
export default {
  name: "vueInternationalI18n",
  data() {
    return {
      date: new Date().toDateString(),
      drawer: false,
      direction: "rtl",
      currentPage: 4,
    };
  },
  mounted() {
    this.date = getDateFormatComplete(new Date());
  },
  created() {},
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
    ...mapMutations({
      set_i18n: "SET_i18n",
    }),
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
    drawerMe() {
      this.drawer = true;
      console.log(this.drawer )
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/minxin.scss";
$background_color: #fff;
.international {
  margin-bottom: 25px;
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
      bottom: 0px;
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
  .content_left_ul > li {
    display: flex;
    background-color: $background_color;
    margin-bottom: 15px;
    padding: 10px 15px;
    min-height: 85px;
  }
  .content_left_ul > li:hover {
    box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.1);
  }
  .text_left {
    position: relative;
    width: 100%;
    padding: 5px;
    h2 {
      color: #343a40;
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
  .article_info {
    position: absolute;
    left: 5px;
    bottom: 5px;
    color: #999;
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
    padding: 5px;
    border-radius: 5px;
    // background-color: $background_color;
    h3 {
      // display: inline-block;
      padding: 4px 15px;
      margin: -1px 0 0 0;
      font-size: 15px;
      font-size: 14px;
      color: $background_color;
      background: #1890ff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    p {
      color: #666666;
      margin: 10px 0 0;
      line-height: 24px;
      text-align: justify;
      text-align-last: left;
      text-indent: 2rem;
      letter-spacing: 2px;
      padding-bottom: 5px;
      padding: 0 5px;
    }
    .introduction {
      background-color: $background_color;
      margin-bottom: 15px;
      border-radius: 5px;
    }
    .categories {
      border-radius: 5px;
      margin-bottom: 15px;
      ul > li > span:nth-child(even) {
        background-color: #ccc;
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
        background-color: $background_color;
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
      span{
        margin: 4px 6px;
      }
    }
  }
}
</style>
