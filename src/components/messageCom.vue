<!--  -->
<template>
  <div class="message_box">
    <div class="message_box_top">
      <div class="message_box_top_imgbox">
        <img
          data-v-da920a76=""
          src="https://gd-hbimg.huaban.com/c4ab80a0b7289bd71784e7a2d7f7d40ecf28563981a3b-6Uowp5_fw658"
          alt=""
          class="message_img"
        />
      </div>

      <el-input
        type="textarea"
        v-model="ruleForm.desc"
        placeholder="请填写评论"
      ></el-input>
    </div>

    <el-button type="primary" size="small" @click="submitForm">提交</el-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "messagebox",
  components: {},
  data() {
    //这里存放数据
    return {
      ruleForm: {
        desc: "",
      },
      rules: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm() {

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
<style scoped lang='scss'>
/*@import url(); 引入公共css类*/
@import "@/styles/minxin.scss";
.message_box {
  margin-top: 30px;
  .message_img {
    width: 100%;
    height: 100%;
    border-radius: 4px
  }
  ::v-deep .el-form-item__content {
    @include displayflex;
  }
  ::v-deep  .el-button--small{
      float: right;
      margin-top: 15px;
    }
  ::v-deep .el-textarea__inner {
    resize: none;
    height: 62px;
    width: 500px
  }
  &_top {
    @include displayflex;
    &_imgbox {
      max-width: 50px;
      max-height: 50px;
      margin-right: 15px;
      margin-top: 2px;
    }
  }
}
</style>