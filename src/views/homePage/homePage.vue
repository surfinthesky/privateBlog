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
              <div class="acticle_dscibe">组件使用后时出现报错，解决方案</div>
              <div class="article_info">
                <span class="p_author" title="作者"><i class="el-icon-user">&nbsp;Author</i></span>
                <span><i class="el-icon-folder" title="分类">&nbsp;Vue</i></span>
                <span class="p_time"><i class="el-icon-date" title="时间">&nbsp;{{ date }}</i></span>
                <span class="p_time"><i class="el-icon-collection-tag" title="时间">&nbsp;v-for</i></span>
              </div>
              <span class="p_read"><el-button type="text" @click="drawerMe">阅读全文</el-button></span>
            </div>
          </li>
        </ul>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[10]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
      <!-- 内容右侧 -->
      <div class="content_right">
        <div class="aside">
          <div class="introduction">
            <img class="introduction_img"
              src="https://gd-hbimg.huaban.com/c4ab80a0b7289bd71784e7a2d7f7d40ecf28563981a3b-6Uowp5_fw658" alt="" />
            <h3>博客简介</h3>
            <p>
              关注于自身代码提升，坚持分享实践教程的个人博客。在日常开发中遇到的问题总结出来，分享大家，相互借鉴。
              也希望大家多多指出不足之处，相互提升。每天进步一点点，终会厚积薄发。借用一句话：冰冻三尺
              非一日之寒。
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
            <el-tag type="success">babel</el-tag>
            <el-tag type="info">v-model</el-tag>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-drawer title="没有天赋" size="95%">
      <span>我来啦!</span>
    </el-drawer>
    <el-dialog :visible.sync="drawer" width="1112px">
      <div v-html="value" class="markdown-body"></div>
      <messagebox></messagebox>
    </el-dialog>
  </div>
</template>

<script>
import Marked from "marked";
import highlight from "highlight.js";
// import "highlight.js/styles/github.css";
import { mapMutations } from "vuex";
import { preventOverHidden, preventOverauto } from "@/utils/utils";
import { getDateFormatComplete } from "@/utils/formDate";
import messagebox from "@/components/messageCom.vue";
import { getarticlelist,getUserlist } from "@/api/user";
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
      currentPage: 4,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
   mounted() {
    getUserlist().then((res) => {
      console.log(res);
    });
    this.date = getDateFormatComplete(new Date());
    this.initMaven(
      '## 一：elementUI下拉框错位\n下图为错位实例\n\n![](https://pic3.zhimg.com/80/v2-78c94b5dd35c8f6e3cd85dcc1b2390c6_720w.webp)\n\n使用如下方式，可以解决错位问题\n```\n// 在模板文件中，配置不让组件插入body中\n<el-select:popper-append-to-body="false"> \n\n// 使用决定定位，强制下拉选项放在下拉框下方且对齐。可一劳永逸\n<style lang="scss" scoped>\n::v-deep .popper-select {\n position: absolute !important;  // 下拉选项的父元素，element原生设置了position:relative\n top: 35px !important;\n left: 0px !important;\n}\n</style>\n```\n## 二：修改elementUI样式？\n修改第三方组件的某个样式，很多样式往往被嵌在很多层样式里。我们才不想关注那么多，只想修改当前class\n\n这时可以使用/deep/样式穿透，无论要修改的样式藏得有多深，只需要使用/deep/.classname就可以搞定。\n\n需要注意，/deep/必须写在设置了scoped属性的style里，才能生效\n```\n<style lang="scss" scoped>\n.myStyle{\n \n  /deep/ .content{\n      background:red\n  }\n}\n</style>\n```\n/deep/官方叫做深度作用选择器，和>>>和::v-deep有如下关系：\n> /deep/和::v-deep都是>>>的别名,有些像 Sass 之类的预处理器无法正确解析>>>, 这种情况下你可以使用/deep/或::v-deep操作符取而代之\n\n## 三：el-table表头溢出或不够？\n不要给每一列都设置宽度，这样所有列加起来可能会超出或短于表头div。刻意计算，又累又有风险\n\n可以给某些文本较长的列头，额外设置width，其余可以不设置，这样不设置的会平分剩下宽度。\n\n或者只剩一列不设置宽度，其余设死宽度，这样不设置宽度那列会自适应，也不至于最终表头溢出或不够。\n\n## 四：el-table去掉纵向滚动条？\n![](https://pic3.zhimg.com/80/v2-2fd5b6e078a171e20b7753be1edd3e0a_720w.webp)\n图中的el-table有纵向滚动条，且表头也增加了滚动条的宽度。感觉不够简约，可以如下调整\n```\n<style>\n.el-table th.gutter{\n  display: none;\n  width:0\n}\n.el-table colgroup col[name=\'gutter\']{\n  display: none;\n  width: 0;\n}\n\n.el-table__body{\n  width: 100% !important;\n}\n\n.el-table__body-wrapper {\n  &::-webkit-scrollbar { // 整个滚动条\n    width: 0; // 纵向滚动条的宽度\n    background: rgba(213,215,220,0.3);\n    border: none;\n  }\n  &::-webkit-scrollbar-track { // 滚动条轨道\n    border: none;\n  }\n}\n</style>\n```\n## 五：elementUI打包后样式冲突？\n在npm run serve时，本地测试没有问题。代码压缩npm run build后，样式错乱。\n\n#### 1、为什么run serve时不干扰？\n因为run serve是将组件的css打包到当前组件的js中，run build时会将所有的css提取合并到同一个css文件中，这时候同名class就完犊子了。\n\n多个页面组件使用elementUI，某一个不规范的修改了elementUI的原生属性，其他所有页面组件都会受干扰。\n\n#### 2、造成什么结果？\n比如多个卡片都使用elementUI table，你会发现，某个页面组件的某个class你压根没动，但生产环境下被改了\n\n调试后才知道是别的页面组件改的，影响到了你的页面。\n\n#### 3、如何解决？\n全局搜索类名，看是哪个组件写属性不规范。找到根源后，修改相应组件。\n\n如果只在被影响的页面组件修改问题，那这个class还会影响到其他页面\n\n#### 4、如何避免组件间样式干扰？\n使用less时，样式使用less写成层级嵌套，保持最外层类名不一样最好\n使用范围样式，scoped是H5的新特性，它限制样式只适用于当前组件\n#### 5、scoped为什么可以做到样式隔离？\nscoped通过使用 PostCSS 来实现以下转换：\n```\n<style scoped>\n.example {\n\tcolor: red;\n}\n</style>\n\n<template>\n\t<div class="example">hi</div>\n</template>\n```\n转换结果：\n```\n<style>\n\t.example[data-v-f3f3eg9] {\n\t\tcolor: red;\n\t}\n</style>\n\n<template>\n\t<div class="example" data-v-f3f3eg9>hi</div>\n</template>\n```'
    );
    getarticlelist({
      pagenum: 1,
      pagesize: 10,
    }).then((res) => {
      console.log(res);
    });


  },
  created() { },
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
    initMaven(content) {
      const rendererMD = new Marked.Renderer();
      rendererMD.image = function (href, title, text) {
        return `<img onclick="showMarkedImage(event, '${href}')" src="${href}" alt="${text}" title="${title ? title : ""
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
    drawerMe() {
      this.drawer = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => { });
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
@import "@/styles/github-markdown.css";
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

  .content_left_ul>li {
    display: flex;
    background-color: $background_color;
    margin-bottom: 15px;
    padding: 10px 15px;
    min-height: 90px;
    border-radius: 5px;
  }

  .content_left_ul>li:hover {
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

  .acticle_dscibe {
    margin-top: 10px;
    min-height: 30px;
    color: rgba(0, 0, 0, 0.43);
    font-size: 12px;
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
      background: #1890ff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    p {
      color: #666666;
      // margin: 10px 0 0;
      line-height: 24px;
      text-align: justify;
      text-align-last: left;
      text-indent: 2rem;
      letter-spacing: 2px;
      padding: 10px 10px;
      background-color: $background_color;
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
      }
    }

    .hot_acticle {
      margin-bottom: 25px;

      ul {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }

      ul>li {
        background-color: $background_color;
        padding: 10px 8px;
        cursor: pointer;
      }

      ul>li>span:nth-child(odd) {
        font-size: 16px;
      }

      ul>li:nth-child(1)>span:nth-child(1) {
        color: rgb(244, 78, 3);
      }

      ul>li:nth-child(2)>span:nth-child(1) {
        color: rgb(212, 24, 0);
      }

      ul>li:nth-child(3)>span:nth-child(1) {
        color: rgb(243, 126, 33);
      }

      ul>li:nth-child(4)>span:nth-child(1) {
        color: rgb(243, 33, 45);
      }

      ul>li:nth-child(5)>span:nth-child(1) {
        color: rgb(33, 45, 243);
      }
    }

    .categories {
      border-radius: 5px;
      margin-bottom: 25px;

      ul>li>span:nth-child(even) {
        background-color: #ccc;
        border-radius: 50%;
        min-width: 25px;
        min-height: 25px;
        text-align: center;
        line-height: 25px;
        padding: 1px;
        // color:#fff;
      }

      ul>li {
        padding: 16px 8px;
        font-size: 14px;
        @include displayEleBetween;
        background-color: $background_color;
      }

      ul>li:hover {
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
