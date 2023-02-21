<!--  -->
<template>
  <div class="article_ment">
    <el-button type="primary" @click="article_show = true">创建文章</el-button>
    <!-- 创建timeline弹窗 -->
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
          <el-form-item
            label="时间线内容"
            prop="stageContent"
            style="width: 50%"
          >
            <el-col :span="24">
              <el-input
                v-model="ruleForm.stageContent"
                placeholder="请填写内容"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="取色器" prop="stageColor" style="width: 50%">
            <el-col :span="24">
              <!-- <el-input v-model="ruleForm.stageColor"></el-input> -->
              <el-color-picker
                style="width: 100%"
                v-model="ruleForm.stageColor"
                show-alpha
                :predefine="predefineColors"
              >
              </el-color-picker>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 2 -->
        <el-row style="display: flex">
          <el-form-item label="Icon类型" prop="stageIcon" style="width: 50%">
            <el-col :span="24">
              <el-select
                v-model="ruleForm.stageIcon"
                placeholder="请选择icon类型"
                style="width: 100%"
              >
                <el-option
                  label="el-icon-ice-tea"
                  value="el-icon-ice-tea"
                ></el-option>
                <el-option
                  label="el-icon-notebook-2"
                  value="el-icon-notebook-2"
                ></el-option>
                <el-option
                  label="el-icon-notebook-1"
                  value="el-icon-notebook-1"
                ></el-option>
                <el-option
                  label="el-icon-sunny"
                  value="el-icon-sunny"
                ></el-option>
                <el-option
                  label="el-icon-water-cup"
                  value="el-icon-water-cup"
                ></el-option>
                <el-option
                  label="el-icon-coffee-cup"
                  value="el-icon-coffee-cup"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="完成时间" required style="width: 50%">
            <el-col :span="24">
              <el-form-item prop="stageCompletTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.stageCompletTime"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>

        <el-form-item style="text-align: right">
          <el-button
            type="primary"
            :loading="btnloading"
            @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
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
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";
import tableCom from "../../components/tableCom.vue";
import { getDateFormat } from "@/utils/formDate";
import * as Fn from "@/api/user";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tableCom },
  data() {
    //这里存放数据
    return {
      initApi: "getTimelinelist", //传递到table组件请求的api
      deleteapi: "timelinedelete", //传递到table组件请求的api
      article_show: false,
      btnloading: false,
      titleText: "timeline管理",
      ruleForm: {
        stageContent: "",
        stageTimestamp: "",
        stageCompletTime: "",
        stageColor: "rgba(255, 69, 0, 0.68)",
        stageIcon: "",
      },
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
      labelData: [
        {
          labelName: "ID",
          propName: "id",
        },
        {
          labelName: "内容标题",
          propName: "stageContent",
        },
        {
          labelName: "创建时间",
          propName: "stageTimestamp",
        },
        {
          labelName: "完成时间",
          propName: "stageCompletTime",
        },
        {
          labelName: "颜色",
          propName: "stageColor",
        },
        {
          labelName: "Icon",
          propName: "stageIcon",
        },
      ],
      rules: {
        stageContent: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 5,
            max: 45,
            message: "长度在 5 到 45 个字符",
            trigger: "blur",
          },
        ],
        stageColor: [
          { required: true, message: "请输入标题详述", trigger: "blur" },
          {
            min: 5,
            max: 25,
            message: "长度在 5 到 25 个字符",
            trigger: "blur",
          },
        ],
        stageIcon: [
          { required: true, message: "请选择icon", trigger: "change" },
        ],
        stageCompletTime: [
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
        // this.ruleForm.articleDate = new Date(newVal.articleDate);
        this.ruleForm.stageContent = newVal.stageContent;
        this.ruleForm.stageTimestamp = newVal.stageTimestamp;
        this.ruleForm.stageCompletTime = new Date(newVal.stageCompletTime);
        this.ruleForm.stageColor = newVal.stageColor;
        this.ruleForm.stageIcon = newVal.stageIcon;
      }
    },
  },
  //方法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //判断新增还是更新
          if (this.status == "Add") {
            let obj = {
              stageTimestamp: getDateFormat(new Date()),
              stageCompletTime: getDateFormat(this.ruleForm.stageCompletTime),
            };
            this.btnloading = true;
            console.log(new Date());
            console.log(getDateFormat(new Date()));
            console.log({ ...this.ruleForm, ...obj });
            Fn.addtimeline({ ...this.ruleForm, ...obj })
              .then((res) => {
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
              })
              .then((err) => {
                console.log(err);
              });
          } else {
            let changeStatus = false;
            console.log("timeline修改");
            let submitFormEditor = {
              id: this.editorRow.id,
              stageColor: this.ruleForm.stageColor,
              stageCompletTime: this.ruleForm.stageCompletTime,
              stageContent: this.ruleForm.stageContent,
              stageIcon: this.ruleForm.stageIcon,
              stageTimestamp: this.ruleForm.stageTimestamp,
            };
            for (let item in submitFormEditor) {
              if (submitFormEditor[item] !== this.editorRow[item]) {
                if (item && item !== "stageCompletTime") {
                  changeStatus = true;
                } else {
                  //时间比对修否修改
                  let isTrue =
                    new Date(this.ruleForm.stageCompletTime).getTime() ==
                    new Date(this.editorRow.stageCompletTime).getTime()
                      ? true
                      : false;
                  if (!isTrue) {
                    changeStatus = true;
                  }
                }
              }
            }
            if (changeStatus) {
              submitFormEditor.stageCompletTime = getDateFormat(
                this.ruleForm.stageCompletTime
              );
              submitFormEditor.stageTimestamp = getDateFormat(
                this.ruleForm.stageTimestamp
              );
              Fn.updatetimeline(submitFormEditor)
                .then((res) => {
                  if (res.data.message == "success") {
                    this.$message({
                      type: "success",
                      message: "已更新成功～",
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
                })
                .then((err) => {
                  console.log(err);
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
      this.$refs.ruleForm.resetFields();
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
  ::v-deep .el-color-picker__trigger {
    width: 100%;
  }
}
</style>
