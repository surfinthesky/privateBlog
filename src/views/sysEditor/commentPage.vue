<!--  -->
<template>
    <div class="article_ment">
      <tableCom :title="titleText" :labelData="labelData"></tableCom>
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
        titleText: "评论管理",
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

      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {


    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

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