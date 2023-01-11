<!--  -->
<template>
  <div class="article_ment">
    <el-button type="primary" @click="acticle_show = true">创建文章</el-button>
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
    <el-dialog :visible.sync="acticle_show" width="80%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 1 -->
        <el-row style="display: flex">
          <el-form-item label="文章标题" prop="acticleTitle" style="width: 50%">
            <el-col :span="24">
              <el-input v-model="ruleForm.acticleTitle"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label="标题详述"
            prop="acticleDscibe"
            style="width: 50%"
          >
            <el-col :span="24">
              <el-input v-model="ruleForm.acticleDscibe"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 2 -->
        <el-row style="display: flex">
          <el-form-item label="标题图片" prop="acticlePic" style="width: 50%">
            <el-input v-model="ruleForm.acticlePic"></el-input>
          </el-form-item>
          <el-form-item label="记录日期" required style="width: 50%">
            <el-col :span="24">
              <el-form-item prop="acticleDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.acticleDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 3 -->
        <el-row style="display: flex">
          <el-form-item label="文章类别" prop="acticleDiff" style="width: 100%">
            <el-col :span="24">
              <el-select
                v-model="ruleForm.acticleDiff"
                placeholder="活动区域"
                style="width: 100%"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
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
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="main_maven">
        <mavon-editor
          style="height: 500px"
          :ishljs="true"
          @change="$change"
          @save="$save"
          v-model="ruleForm.acticleHtmlText"
        />
      </div>
    </el-dialog>
    <tableCom :title="titleText" :labelData="labelData"></tableCom>
  </div>
</template>

<script>
import tableCom from "../../components/tableCom.vue";
import Vue from "vue";
import Marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/github.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tableCom },
  data() {
    //这里存放数据
    return {
      acticle_show: false,
      titleText: "",
      ruleForm: {
        acticleTitle: "",
        acticleDscibe: "",
        acticlePic: "",
        acticleDiff: "",
        acticleDate: "",
        acticleHtmlText: "",
      },
      labelData:[
        {
          labelName:"访客ip",
          propName:"date"
        },
        {
          labelName:"操作类型",
          propName:"name"
        },
        {
          labelName:"操作内容",
        },
        {
          labelName:"访客定位",
        },
        {
          labelName:"访客来源",
          propName:"address"
        },
        {
          labelName:"浏览器",
        },
        {
          labelName:"访问时间",
        }
      ],
      rules: {
        acticleTitle: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 5,
            max: 25,
            message: "长度在 5 到 25 个字符",
            trigger: "blur",
          },
        ],
        acticleDscibe: [
          { required: true, message: "请输入标题详述", trigger: "blur" },
          {
            min: 5,
            max: 25,
            message: "长度在 5 到 25 个字符",
            trigger: "blur",
          },
        ],
        acticlePic: [
          { required: true, message: "请输入标题图片路径", trigger: "blur" },
        ],
        acticleDiff: [
          { required: true, message: "请选择文章类别", trigger: "change" },
        ],
        acticleDate: [
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    $change(pos, $file) {
      console.log(pos);
      console.log($file);
    },
    $save(pos, $file) {
      console.log(pos);
      console.log($file);
      //   this.initMaven($file);
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

      this.ruleForm.acticleHtmlText = Marked(content).replace(
        /<pre>/g,
        "<pre class='language-html'>"
      );
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMaven(
      '## 二：修改elementUI样式？修改第三方组件的某个样式，很多样式往往被嵌在很多层样式里。我们才不想关注那么多，只想修改当前class这时可以使用/deep/样式穿透，无论要修改的样式藏得有多深，只需要使用/deep/.classname就可以搞定。需要注意，/deep/必须写在设置了scoped属性的style里，才能生效```<style lang="scss" scoped>.myStyle{/deep/ .content{background:red}}</style>```'
    );
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
<style scoped lang='scss'>
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