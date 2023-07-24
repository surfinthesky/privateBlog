<!--  -->
<template>
  <div class="article_ment">
    <el-button type="primary" @click="articleshow">创建文章</el-button>
    <!-- 创建文章弹窗 -->
    <el-dialog
      :visible.sync="article_show"
      width="80%"
      :before-close="handleClose"
    >
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
                <el-option label="node" value="Node"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>

        <el-upload
          class="upload-demo"
          :headers="headers"
          drag
          action="proxyServer2/fileupload/profile"
          multiple
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <div>
          <ul v-for="(item, index) in fileData" :key="index">
            <li>图片名称：{{ item.name }}</li>
            <li>图片上传url：{{ item.response.path }}</li>
          </ul>
        </div>
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
          ref="md"
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
      :getApi="initApi"
      :deleteAPi="deleteapi"
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
import * as Fn from "@/api/user";
// import { _debounce } from "@/utils/utils";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tableCom from "../../components/tableCom.vue";
import { mapMutations, mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tableCom },
  data() {
    //这里存放数据
    return {
      initApi: "getarticlelist", //传递到table组件请求的api
      deleteapi: "articledelete", //传递到table组件请求的api
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      fileData: [],
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
        articleMdText: "",
      },
      baseText: "",
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
          formatter: "getDateFormat",
        },
        {
          labelName: "文章md格式",
          propName: "articleMdText",
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
            max: 65,
            message: "长度在 5 到 65 个字符",
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
      status: "Add", //状态是添加或修改
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("editor", ["editorRow"]),
  },
  //监控data中的数据变化
  watch: {
    "$store.state.editor.editorRow"(newVal) {
      console.log(newVal, "newVal");
      if (newVal) {
        this.ruleForm.articleTitle = newVal.articleTitle;
        this.ruleForm.articleDscibe = newVal.articleDscibe;
        this.ruleForm.articlePic = newVal.articlePic;
        this.ruleForm.articleDiff = newVal.articleDiff;
        this.ruleForm.articleDate = new Date(newVal.articleDate);
        this.ruleForm.articleCreatTime = newVal.articleCreatTime;
        // this.ruleForm.articleHtmlText = Base64.decode(newVal.articleHtmlText);
        this.ruleForm.articleHtmlText = Base64.decode(newVal.articleMdText);//修正
        this.ruleForm.articleNum = newVal.articleNum;
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    articleshow() {
      this.article_show = true;
    },
    handleClose(done) {
      this.resetForm();
      done();
      // this.$confirm("确认关闭？")
      //   .then(() => {
      //     this.resetForm();
      //     done();
      //   })
      //   .catch(() => {});
    },
    handleAvatarSuccess(res, file) {
      if (res) {
        console.log(file);
      }
      this.fileData.push(file);
    },
    ...mapMutations("editor", ["SET_editorRow"]),
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
              articleMdText: this.ruleForm.articleMdText,
              articleNum: 0, //临时阅读量参数
            };
            console.log(submitForm, "-submitForm");
            // return;
            this.btnloading = true;
            Fn.addarticle({ ...submitForm, ...obj }).then((res) => {
              if (res.data.message == "success") {
                this.$message({
                  type: "success",
                  message: "已添加成功～",
                });
                this.btnloading = false;
                this.resetForm();
                this.article_show = false;
                this.$refs.tableCom.loadingshow = true;
                this.$refs.tableCom.getPagelist();
              } else {
                this.$message({
                  type: "success",
                  message: "请求异常，请稍后再试～",
                });
                this.btnloading = false;
              }
            });
          } else {
            let changeStatus = false;
            console.log("文章修改");
            let submitFormEditor = {
              id: this.editorRow.id,
              articleTitle: this.ruleForm.articleTitle,
              articleDscibe: this.ruleForm.articleDscibe,
              articlePic: this.ruleForm.articlePic,
              articleDiff: this.ruleForm.articleDiff,
              articleDate: this.ruleForm.articleDate,
              articleCreatTime: this.ruleForm.articleCreatTime,
              articleHtmlText: this.ruleForm.articleHtmlText,
              articleMdText: this.ruleForm.articleMdText,
              articleNum: this.ruleForm.articleNum,
            };
            // console.log(this.ruleForm.articleDate);
            // console.log(submitFormEditor, "submitFormEditor");
            for (let item in submitFormEditor) {
              if (submitFormEditor[item] !== this.editorRow[item]) {
                // console.log(item);
                //针对文章时间及文化编辑器内容做单独对比
                if (
                  item == "articleDate" &&
                  new Date(submitFormEditor[item]).getTime() !==
                    new Date(this.editorRow.articleDate).getTime()
                ) {
                  changeStatus = true;
                  // console.log("%c修改---articleDate", "color:red");
                } else if (
                  item == "articleHtmlText" &&
                  this.ruleForm.articleHtmlText !==
                    Base64.decode(this.editorRow.articleHtmlText)
                ) {
                  changeStatus = true;
                  // console.log("%c修改---articleHtmlText", "color:green");
                } else {
                  if (item !== "articleDate" && item !== "articleHtmlText") {
                    console.log("%c修改---articleHtmlText", "color:yellow");
                    changeStatus = true;
                  }
                }
              }
            }
            //最终调用api更新文章
            if (changeStatus == true) {
              console.log("%c修改---changeStatus", "color:brown");
              submitFormEditor.articleHtmlText = Base64.encode(
                submitFormEditor.articleHtmlText
              );
              submitFormEditor.articleDate = getDateFormat(
                submitFormEditor.articleDate
              );
              submitFormEditor.articleCreatTime = getDateFormat(
                submitFormEditor.articleCreatTime
              );
              console.log(submitFormEditor);
              // eslint-disable-next-line
              this.btnloading = true;
              Fn.updatearticle(submitFormEditor).then((res) => {
                if (res.data.message == "success") {
                  this.$message({
                    type: "success",
                    message: "更新成功",
                  });
                  this.btnloading = false;
                  this.resetForm();
                  this.article_show = false;
                  this.$refs.tableCom.loadingshow = true;
                  this.$refs.tableCom.getPagelist();
                } else {
                  this.$message({
                    type: "error",
                    message: "更新失败",
                  });
                }
              });
            } else {
              this.$message({
                type: "warning",
                message: "当前无修改信息，请重试",
              });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      console.log("------");
      this.$refs.ruleForm.resetFields();
      this.ruleForm.articleHtmlText = "";
    },
    $change(pos, $file) {
      // console.log(pos);
      // console.log($file);
      // console.log("html格式", this.$refs.md.d_render);
      // console.log("md格式", this.$refs.md.d_value);
      //存储md格式
      this.ruleForm.articleMdText = Base64.encode(this.$refs.md.d_value);
      this.initMaven($file);
    },
    $save(pos, $file) {
      console.log("html格式", this.$refs.md.d_render);
      console.log("md格式", this.$refs.md.d_value);
      // console.log(pos);
      console.log($file);
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
      // console.log(this.baseText);
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
