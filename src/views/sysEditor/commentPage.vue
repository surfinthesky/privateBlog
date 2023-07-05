<!--  -->
<template>
  <div class="article_ment">
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
import tableCom from "../../components/tableCom.vue";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tableCom },
  data() {
    //这里存放数据
    return {
      acticle_show: false,
      titleText: "文章评论管理",
      initApi: "getartMeslist",
      deleteapi: "deleteArtMes",
      labelData: [
        {
          labelName: "文章ID",
          propName: "articleid",
        },
        {
          labelName: "用户ID",
          propName: "userId",
        },
        {
          labelName: "被回复人",
          propName: "toCommentId",
        },

        {
          labelName: "级别",
          propName: "parentId",
        },
        {
          labelName: "区分留言层级",
          propName: "isFirstLevel",
        },
        {
          labelName: "评论内容",
          propName: "content",
        },
        {
          labelName: "创建时间",
          propName: "createDate",
          formatter: "getDateFormat",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
