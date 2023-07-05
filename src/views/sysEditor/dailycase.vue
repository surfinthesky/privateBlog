<!--  -->
<template>
  <div class="article_ment">
    <el-button type="primary" @click="articleshow">创建案例</el-button>
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
          <el-form-item label="案例标题" prop="caseTitle" style="width: 50%">
            <el-col :span="24">
              <el-input v-model="ruleForm.caseTitle"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="案例详述" prop="caseDescribe" style="width: 50%">
            <el-col :span="24">
              <el-input v-model="ruleForm.caseDescribe"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 2 -->
        <el-row style="display: flex">
          <el-form-item label="案列图片" prop="caseBgurl" style="width: 50%">
            <el-input v-model="ruleForm.caseBgurl"></el-input>
          </el-form-item>
          <el-form-item label="记录日期" required style="width: 50%">
            <el-col :span="24">
              <el-form-item prop="caseDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.caseDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
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
          style="height: 500px"
          :ishljs="true"
          @change="$change"
          @save="$save"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
          v-model="ruleForm.caseContent"
        />
      </div>
    </el-dialog>
    <tableCom
      ref="tableCom"
      :title="titleText"
      :labelData="labelData"
      :getApi="initApi"
      :deleteAPi="deleteapi"
      :changeStatus="false"
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
// import { getDateFormat } from "@/utils/formDate";
// import * as Fn from "@/api/user";
import tableCom from "../../components/tableCom.vue";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tableCom },
  data() {
    //这里存放数据
    return {
      titleText: "案例管理",
      initApi: "getartMeslist",
      deleteapi: "deleteArtMes",
      labelData: [
        {
          labelName: "案例ID",
          propName: "articleid",
        },
        {
          labelName: "标题",
          propName: "articleid",
        },
        {
          labelName: "案例描述",
          propName: "userId",
        },
        {
          labelName: "创建时间",
          propName: "toCommentId",
        },

        {
          labelName: "背景图",
          propName: "parentId",
        },
      ],
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      fileData: [],
      baseText: "",
      ruleForm: {
        caseTitle: "",
        caseDescribe: "",
        caseBgurl:
          "https://gd-hbimg.huaban.com/66fab9c48fe58cd01c9cef2a4e056d10e7a15fc512b7c5-Ovfo5P_fw658",
        articleDiff: "",
        caseDate: "",
        caseContent: "",
      },
      article_show: false,
      btnloading: false,
      rules: {
        caseTitle: [
          { required: true, message: "请输入案例标题", trigger: "blur" },
          {
            min: 5,
            max: 25,
            message: "长度在 5 到 25 个字符",
            trigger: "blur",
          },
        ],
        caseDescribe: [
          { required: true, message: "请输入案例详述", trigger: "blur" },
          {
            min: 5,
            max: 65,
            message: "长度在 5 到 65 个字符",
            trigger: "blur",
          },
        ],
        caseBgurl: [
          { required: true, message: "请输入案例图片路径", trigger: "blur" },
        ],
        caseDate: [
          {
            type: "date",
            required: true,
            message: "请选择记录日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    articleshow() {
      this.article_show = true;
    },
    handleClose(done) {
      this.resetForm();
      done();
    },
    handleAvatarSuccess(res, file) {
      if (res) {
        console.log(file);
      }
      this.fileData.push(file);
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      console.log("------");
      this.$refs.ruleForm.resetFields();
      this.ruleForm.caseContent = "";
    },
    $change(pos, $file) {
      // console.log(pos);
      // console.log($file);
      this.initMaven($file);
    },
    $save(pos, $file) {
      // console.log(pos);
      console.log($file);
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 将图片上传到服务器.
      var base64Data = $file.miniurl.replace(/^data:image\/\w+;base64,/, "");
      let params = { base64: base64Data };
      console.log(params);
    },

    $imgDel(pos) {
      delete this.img_file[pos];
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
      this.ruleForm.caseContent = Marked(content).replace(
        /<pre>/g,
        "<pre class='language-html'>"
      );
      this.baseText = Base64.encode(this.ruleForm.caseContent);
      // console.log(this.baseText);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
