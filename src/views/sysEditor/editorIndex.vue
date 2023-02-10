<!-- 管理端首页 -->
<template>
  <div class="editor_sys">
    <div class="editor_sys_main">
      <el-container>
        <el-aside width="200px">
          <div class="editor_sys_main_top">CongTou's Blog sysmaner</div>
          <el-menu
            :default-active="activePath"
            class="el-menu-vertical-demo"
            @select="activeSelect"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
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
          <el-header class="editor_sys_main_head">
            <div class="editor_sys_main_head_lft">
              <ul>
                <li @click="goLogin" class="editor_sys_main_head_lft_login">
                  <i class="el-icon-house">&nbsp;用户端入口</i>
                </li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div class="editor_sys_main_head_rht">
              <ul>
                <li @click="loginOut">
                  <i :class="activeChange">&nbsp;管理员</i>
                  <span v-show="loginOutSow">退出</span>
                </li>
              </ul>
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState, mapMutations } from "vuex";
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
          menuPath: "/editor/messagePage",
        },
        {
          text: "评论管理",
          icon: "el-icon-chat-dot-round",
          sortNum: 4,
          menuPath: "/editor/commentpage",
        },
        {
          text: "分类管理",
          icon: "el-icon-collection-tag",
          sortNum: 5,
          menuPath: "/editor/classification",
        },
        {
          text: "时间线管理",
          icon: "el-icon-time",
          sortNum: 6,
          menuPath: "/editor/timeline",
        },
      ],
      activeChange: "el-icon-caret-bottom",
      loginOutSow: false,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("editor", ["activePath"]), //映射子module下state中属性，需要开启命名空间 namespaced: true,
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loginOut() {
      if (this.activeChange == "el-icon-caret-bottom") {
        this.activeChange = "el-icon-caret-top";
        this.loginOutSow = true;
      } else {
        this.activeChange = "el-icon-caret-bottom";
        this.loginOutSow = false;
      }
    },
    goLogin() {
      this.$router.push({ path: "/" });
    },
    ...mapMutations("editor", ["SET_activePath"]),
    activeSelect(key) {
      // console.log(key, keyPath);
      this.SET_activePath(key);
    },
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
<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
@import "@/styles/minxin.scss";
$background_color: #fff;
.editor_sys {
  &_main {
    &_top {
      height: 120px;
      text-align: center;
      line-height: 120px;
      color: #fff;
      background-color: rgb(84, 92, 100);
    }
    &_head {
      padding: 0 20px;
      @include displayEleBetween;
      color: #666666;
      &_lft {
        &_login {
          cursor: pointer;
        }
      }
      &_rht {
        ul > li {
          position: relative;
          cursor: pointer;
        }
        ul > li > span {
          position: absolute;
          bottom: -60px;
          left: -50px;
          display: inline-block;
          width: 120px;
          height: 50px;
          line-height: 50px;
          border: 1px solid #e9e9e9;
          background-color: #fff;
          box-shadow: 0 2px 12px 0 #0000001a;
          cursor: pointer;
          z-index: 99;
        }
        ul > li > span:hover {
          color: #409eff;
        }
      }
    }
  }
}
.el-header,
.el-footer {
  background-color: $background_color;
  text-align: center;
}
.el-header {
  margin: 0px 0 0px 210px;
}
.el-aside {
  text-align: center;
  position: fixed;
  height: 100%;
  // background-color: $background_color;
  background-color: rgb(84, 92, 100);
}

.el-main {
  margin: 10px;
  padding: 10px 0 10px 200px;
}
.el-menu {
  border-right: 0px;
}
</style>
