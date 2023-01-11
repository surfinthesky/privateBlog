<!--  -->
<template>
  <div class="editor_sys">
    <div class="editor_sys_main">
      <el-container>
        <el-aside width="200px">
          <div>Conf's Blog Admin{{activePath}}</div>
          <el-menu
            :default-active="activePath"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            :router="true"
          >
            <el-menu-item
              :index="item.menuPath"
              v-for="(item, index) in menuArr"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">
                {{ item.text }}
              </span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapState,mapMutations} from 'vuex';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      isCollapse: false,
      menuArr: [
        {
          text: "访问数据",
          icon: "el-icon-user",
          sortNum: 1,
          menuPath: "/editor/num",
        },
        {
          text: "文章管理",
          icon: "el-icon-document",
          sortNum: 2,
          menuPath: "/editor/authorpage",
        },
        {
          text: "留言管理",
          icon: "el-icon-edit",
          sortNum: 3,
        },
        {
          text: "评论管理",
          icon: "el-icon-chat-dot-round",
          sortNum: 4,
        },
        {
          text: "分类管理",
          icon: "el-icon-collection-tag",
          sortNum: 5,
        },
        {
          text: "时间轴管理",
          icon: "el-icon-time",
          sortNum: 6,
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState('editor',['activePath'])//映射子module下state中属性，需要开启命名空间 namespaced: true,
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations('editor',['SET_activePath']),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$store)
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log(this.activePath)
  },
  beforeUnloadEvent(payload,event){
    console.log(payload)
    console.log(event)
  },
  beforeCreate() {
    this.$router.push({
      path: "/editor/num",
    });
  }, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
/*@import url(); 引入公共css类*/
.editor_sys {
  &_main {
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>