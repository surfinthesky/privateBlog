<!-- 公共table组件 -->
<template>
  <el-skeleton :rows="6" animated :loading="loadingshow">
    <div class="table_box">
      <div class="Access_box_title">
        <span>{{ title }}</span>
        <span>数据总数：{{ currentPagetotal }}</span>
      </div>
      <el-table :data="comTableData" :border="true" stripe style="width: 100%">
        <el-table-column
          show-overflow-tooltip
          :prop="item.propName"
          :label="item.labelName"
          v-for="(item, index) in labelData"
          :key="index"
        >
          <!-- 格式化数据 -->
          <template slot-scope="scope">
            {{
              item.formatter
                ? UtlisFn[item.formatter](scope.row[item.propName])
                : scope.row[item.propName]
            }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="110">
          <template slot-scope="scope">
            <el-button
              v-if="changeStatus"
              type="text"
              size="small"
              @click="handleClickEditor(scope.row)"
              >修改</el-button
            >

            <el-popover placement="bottom" width="200" trigger="click">
              <p>确定删除当前信息吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleClickDelete(scope.row)"
                  >确定</el-button
                >
              </div>
              <el-button
                type="text"
                size="small"
                @click="setvisible"
                slot="reference"
                >删除</el-button
              >
            </el-popover>
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
        :total="currentPagetotal"
      >
      </el-pagination>
    </div>
  </el-skeleton>
</template>

<script>
import * as Fn from "@/api/user";
import * as UtlisFn from "@/utils/formDate.js";
import { mapState, mapMutations } from "vuex";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Vue from "vue";
import { Base64 } from "js-base64";
Vue.use(Base64);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    title: String, //标题
    labelData: Array, //接受表头及指定渲染value
    getApi: String, //请求数据列表api
    deleteAPi: String, //删除api
    changeStatus: {
      type: Boolean,
      default: true,
    }, //是否存在修改按钮
  },
  data() {
    //这里存放数据
    return {
      currentPage: 1,
      currentPagesize: 10,
      comTableData: [], //列表数据
      currentPagetotal: 0, //数据总数
      loadingshow: true, //
      visible: false,
      UtlisFn,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("editor", ["tableLoading"]),
  },
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.deleteAPi);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getPagelist();
  },
  //方法集合
  methods: {
    ...mapMutations("editor", ["SET_editorRow"]),
    handleClickEditor(row) {
      // console.log(row);
      this.SET_editorRow(row);
      this.$parent.status = "Editor";
      this.$parent.article_show = true;
    },
    //获取文章table列表
    getPagelist() {
      //文章接口api
      if (!this.getApi) {
        this.loadingshow = false;
        return;
      }
      Fn[this.getApi]({
        pagenum: this.currentPage,
        pagesize: this.currentPagesize,
      }).then((res) => {
        if (res.data.result) {
          this.loadingshow = !this.loadingshow;
          this.currentPagetotal = res.data.count;
          this.comTableData = res.data.result;
        }
      });
    },
    setvisible() {
      this.visible = !this.visible;
      console.log(this.visible);
    },
    //根据row.id删除文章
    handleClickDelete(row) {
      Fn[this.deleteAPi]({
        delectId: row.id,
      })
        .then((res) => {
          console.log(res.data);
          this.currentPage = 1;
          if (res.data.status == 0) {
            this.$message({
              type: "warning",
              message: res.data.message,
            });
          } else {
            this.$message({
              type: "success",
              message: res.data.message,
            });
            this.getPagelist();
            this.loadingshow = !this.loadingshow;
          }
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //页码change
    handleCurrentChange(val) {
      this.loadingshow = !this.loadingshow;
      this.$parent.currentPage = val;
      this.currentPage = val;
      this.getPagelist();
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
$background_color: #fff;
.Access_box {
  // background-color: $background_color;
  &_title {
    line-height: 50px;
    background-color: $background_color;
    // padding-left: 10px;
    @include displayEleBetween();
    @include ele_padding2(0px, 10px);
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
