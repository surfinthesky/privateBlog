<!--  -->
<template>
  <el-skeleton :rows="6" animated :loading="tableLoading">
    <div class="table_box">
      <div class="Access_box_title">{{ title }}</div>
      <el-table :data="tableData" :border="true" stripe style="width: 100%">
        <el-table-column
          show-overflow-tooltip
          :prop="item.propName"
          :label="item.labelName"
          v-for="(item, index) in labelData"
          :key="index"
        >
        </el-table-column>
        <!-- <el-table-column prop="name" label="操作类型"> </el-table-column> -->
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        :pager-count="11"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-skeleton>
</template>

<script>
// import editor from 'mavon-editor';
import {  mapState ,mapActions} from 'vuex';
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    title: String, //标题
    labelData: Array, //接受表头及value
    getApi: Function,
    tableData: Array,
    total: Number,
  },
  data() {
    //这里存放数据
    return {
      currentPage:1
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState('editor',["tableLoading"])
  },
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.getApi);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  //方法集合
  methods: {
    // ...mapMutations("editor",['SET_tableLoading']),
    ...mapActions("editor",['SET_tableLoading']),
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.SET_tableLoading(true)
      this.currentPage= val
      // this.loading = !this.loading
      this.$parent.currentPage = val;
      this.getApi();
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
<style scoped lang='scss'>
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
}
::v-deep .el-pagination {
  position: relative;
  bottom: 0;
  padding: 0px;
  .btn-prev,
  .btn-next,
  .el-pager {
    height: 35px;
  }
  .el-pager li {
    height: 35px;
    line-height: 35px;
  }
}
</style>