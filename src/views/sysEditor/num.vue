<!--  -->
<template>
  <div class="Access_box">
    <echart></echart>
    <div class="Access_box_title">博客访问数据明细</div>
    <el-table :data="tableData" :border="true" stripe style="width: 100%">
      <el-table-column prop="date" label="访客ip"> </el-table-column>
      <el-table-column prop="name" label="操作类型"> </el-table-column>
      <el-table-column prop="address" label="操作内容"> </el-table-column>
      <el-table-column prop="address" label="访客定位"> </el-table-column>
      <el-table-column prop="address" label="访客来源"> </el-table-column>
      <el-table-column prop="address" label="浏览器"> </el-table-column>
      <el-table-column prop="address" label="访问时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="110">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import echart from "../../components/echartsBox.vue";
console.log(echart);
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    echart,
  },
  data() {
    //这里存放数据
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
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
$background_color: #fff;
.Access_box {
  // background-color: $background_color;
  &_title {
    line-height: 50px;
    background-color: $background_color;
    padding-left: 10px;
  }
  ::v-deep  .el-pagination {
    padding: 0px;
    .btn-prev,
    .btn-next,
    .el-pager {
      height: 40px;
    }
    .el-pager li{
      height: 40px;
      line-height:40px
    }
  }
}
</style>
