<!--  -->
<template>
  <div class="article_ment">
    <el-button type="primary" @click="article_show = true">创建文章</el-button>
    <!-- <div v-html="value" class="markdown-body"></div>
    <div class="main_maven">
      <mavon-editor
        :ishljs="true"
        @change="$change"
        @save="$save"
        v-model="value"
      />
    </div> -->
    <!-- 创建文章弹窗 -->
    <el-dialog :visible.sync="article_show" width="80%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 1 -->
        <el-row style="display: flex">
          <el-form-item label="文章标题" prop="articleTitle" style="width: 50%">
            <el-col :span="24">
              <el-input v-model="ruleForm.articleTitle"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label="标题详述"
            prop="articleDscibe"
            style="width: 50%"
          >
            <el-col :span="24">
              <el-input v-model="ruleForm.articleDscibe"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 2 -->
        <el-row style="display: flex">
          <el-form-item label="标题图片" prop="articlePic" style="width: 50%">
            <el-input v-model="ruleForm.articlePic"></el-input>
          </el-form-item>
          <el-form-item label="记录日期" required style="width: 50%">
            <el-col :span="24">
              <el-form-item prop="articleDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.articleDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 3 -->
        <el-row style="display: flex">
          <el-form-item label="文章类别" prop="articleDiff" style="width: 100%">
            <el-col :span="24">
              <el-select
                v-model="ruleForm.articleDiff"
                placeholder="请选择类别"
                style="width: 100%"
              >
                <el-option label="react" value="React"></el-option>
                <el-option label="vue" value="Vue"></el-option>
                <el-option label="echarts" value="Echarts"></el-option>
                <el-option label="javascript" value="Javascript"></el-option>
                <el-option label="java" value="Java"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>

        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <el-form-item style="text-align: right">
          <el-button type="primary" :loading="btnloading" @click="submitForm"
            >立即创建</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 编辑区 -->
      <div class="main_maven">
        <mavon-editor
          style="height: 500px"
          :ishljs="true"
          @change="$change"
          @save="$save"
          v-model="ruleForm.articleHtmlText"
        />
      </div>
    </el-dialog>
    <tableCom
      ref="tableCom"
      :title="titleText"
      :labelData="labelData"
      :getApi="getPagelist"
      :tableData="tableList"
      :total="currentPagetotal"
    ></tableCom>
  </div>
</template>

<script>
import Vue from "vue";
import { Base64 } from "js-base64";
import Marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/github.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);
Vue.use(Base64);

import { getDateFormat } from "@/utils/formDate";
import { addarticle, getarticlelist } from "@/api/user";
// import { _debounce } from "@/utils/utils";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tableCom from "../../components/tableCom.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tableCom },
  data() {
    //这里存放数据
    return {
      article_show: false,
      btnloading: false,
      titleText: "文章管理",
      ruleForm: {
        articleTitle: "",
        articleDscibe: "",
        articlePic:
          "https://gd-hbimg.huaban.com/66fab9c48fe58cd01c9cef2a4e056d10e7a15fc512b7c5-Ovfo5P_fw658",
        articleDiff: "",
        articleDate: "",
        articleHtmlText: "",
      },
      baseText: "",
      currentPage: 1,
      currentPagesize: 10,
      currentPagetotal: 1,
      labelData: [
        {
          labelName: "ID",
          propName: "id",
        },
        {
          labelName: "文章标题",
          propName: "articleTitle",
        },
        {
          labelName: "文章描述",
          propName: "articleDscibe",
        },
        {
          labelName: "图片路径",
          propName: "articlePic",
        },
        {
          labelName: "文章分类",
          propName: "articleDiff",
        },
        {
          labelName: "创建时间",
          propName: "articleDate",
        },
        {
          labelName: "文章主内容",
          propName: "articleHtmlText",
        },
        {
          labelName: "阅读次数",
          propName: "articleNum",
        },
      ],
      tableList: [],
      rules: {
        articleTitle: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 5,
            max: 25,
            message: "长度在 5 到 25 个字符",
            trigger: "blur",
          },
        ],
        articleDscibe: [
          { required: true, message: "请输入标题详述", trigger: "blur" },
          {
            min: 5,
            max: 45,
            message: "长度在 5 到 45 个字符",
            trigger: "blur",
          },
        ],
        articlePic: [
          { required: true, message: "请输入标题图片路径", trigger: "blur" },
        ],
        articleDiff: [
          { required: true, message: "请选择文章类别", trigger: "change" },
        ],
        articleDate: [
          {
            type: "date",
            required: true,
            message: "请选择记录日期",
            trigger: "change",
          },
        ],
      },
      status: "Add",
    };
  },
  //监听属性 类似于data概念
  computed: {
    Loading() {
      console.log(this.$store.state.editor.tableLoading);
      return this.$store.state.editor.tableLoading;
    },
    ...mapState('editor',["editorRow"])
  },
  //监控data中的数据变化
  watch: {
    "$store.state.editor.editorRow"(newVal) {
      console.log(newVal);
      // console.log(oldVal);
      if (newVal) {
        this.ruleForm.articleTitle = newVal.articleTitle;
        this.ruleForm.articleDscibe = newVal.articleDscibe;
        this.ruleForm.articleDiff = newVal.articleDiff;
        this.ruleForm.articleDate = new Date(newVal.articleDate);
        this.ruleForm.articleHtmlText = Base64.decode(newVal.articleHtmlText);
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getPagelist();
  },
  //方法集合
  methods: {
    // ...mapMutations("editor", ["SET_tableLoading"]),
    ...mapActions("editor", ["SET_tableLoading"]),
    ...mapMutations("editor", ["SET_editorRow"]),
    //获取首页文章
    getPagelist() {
      this.SET_tableLoading(true);
      //文章接口api
      getarticlelist({
        pagenum: this.currentPage,
        pagesize: this.currentPagesize,
      }).then((res) => {
        if (res.data.result) {
          this.currentPagetotal = res.data.count;
          this.tableList = res.data.result;
        }
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          //判断为新增还是修改
          if (this.status == "Add") {
            let obj = {
              articleDate: getDateFormat(this.ruleForm.articleDate),
              articleCreatTime: getDateFormat(new Date()),
            };
            let submitForm = {
              articleTitle: this.ruleForm.articleTitle,
              articleDscibe: this.ruleForm.articleDscibe,
              articlePic: this.ruleForm.articlePic,
              articleDiff: this.ruleForm.articleDiff,
              articleHtmlText: this.baseText,
              articleNum: 0, //临时阅读量参数
            };
            this.btnloading = true;
            addarticle({ ...submitForm, ...obj }).then((res) => {
              if (res.data.message == "success") {
                this.$message({
                  type: "success",
                  message: "已添加成功～",
                });
                this.btnloading = false;
                this.resetForm();
                this.article_show = false;
              } else {
                this.$message({
                  type: "success",
                  message: "请求异常，请稍后再试～",
                });
                this.btnloading = false;
              }
            });
          } else {
            console.log("文章修改");
            let submitFormEditor = {
              articleTitle: this.ruleForm.articleTitle,
              articleDscibe: this.ruleForm.articleDscibe,
              articlePic: this.ruleForm.articlePic,
              articleDiff: this.ruleForm.articleDiff,
              articleHtmlText: this.baseText,
            };
            for (let item in submitFormEditor) {
              console.log(submitFormEditor["articleHtmlText"]);
              // console.log(this.editorRow["articleHtmlText"]);
              if (submitFormEditor[item] !== this.editorRow[item]) {
                // console.log(item);
              }
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.ruleForm.articleHtmlText = "";
    },
    $change(pos, $file) {
      // console.log(pos);
      // console.log($file);
      this.initMaven($file);
    },
    $save() {
      // console.log(pos);
      // console.log($file);
    },
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
      this.ruleForm.articleHtmlText = Marked(content).replace(
        /<pre>/g,
        "<pre class='language-html'>"
      );
      this.baseText = Base64.encode(this.ruleForm.articleHtmlText);
      console.log(this.baseText);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="scss">
/*@import url(); 引入公共css类*/
@import "@/styles/minxin.scss";
.upload-demo {
  @include displayEleColumn;
}
.article_ment {
  ::v-deep .el-button--primary {
    margin-bottom: 10px;
  }
}
</style>
