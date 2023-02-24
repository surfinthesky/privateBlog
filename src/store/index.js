import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import notes from "./modules/notes";
import about from "./modules/about";
import editor from "./modules/editor";
Vue.use(Vuex);
export default new Vuex.Store({
  //数据
  state: {
    i18nValue: "", //是否国际化
    scrollValue: 0, //滚动条滚动距离
    activeName: "/homepage", //默认页面路径
    themeValue: "light",
    loginOut: false, //登出
    userInfo: {},
    // 评论数量
    commentNum: 0,
    // 当前用户信息
    userInfoMessage: {
      userId: 10086,
      nickName: "huazizhanye",
      avatar:
        "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/avatat.jpg",
    },
    commentList: [
      {
        id: 1,
        isFirstLevel: 0,
        commentUser: {
          userId: 10086,
          nickName: "huazizhanye",
          avatar:
            "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/avatat.jpg",
        },
        content: "my name is huazizhanye",
        createDate: new Date().toLocaleDateString(),
        childrenList: [
          {
            id: 2,
            isFirstLevel: 1,
            commentUser: {
              userId: 10010,
              nickName: "mqq",
              avatar:
                "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/mqq.jpg",
            },
            targetUser: {
              userId: 10086,
              nickName: "huazizhanye",
              avatar:
                "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/avatat.jpg",
            },
            content: "hello huazizhanye",
            createDate: new Date().toLocaleDateString(),
          },
          {
            id: 3,
            commentUser: {
              userId: 10086,
              nickName: "huazizhanye",
              avatar:
                "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/avatat.jpg",
            },
            targetUser: {
              userId: 10010,
              nickName: "mqq",
              avatar:
                "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/mqq.jpg",
            },
            content: "hello mqq~",
            createDate: new Date().toLocaleDateString(),
          },
        ],
      },
    ],
  },
  //类似于组件中的计算属性
  getters: {
    title: (state) => state.about.title,
  },
  //同步方法操作
  mutations: {
    SET_i18n(state, payload) {
      state.i18nValue = payload;
    },
    SET_scrollValue(state, payload) {
      state.scrollValue = payload;
    },
    SET_activeName(state, payload) {
      state.activeName = payload;
    },
    //主题
    SET_themeValue(state, payload) {
      state.themeValue = payload;
    },
    //退出登录
    SET_loginOut(state, payload) {
      state.loginOut = payload;
    },
    //存储用户信息
    SET_userInfo(state, payload) {
      state.userInfo = payload;
      console.log(state.userInfo);
    },
    // 添加一级评论
    __addCommentLevelOne(state, data) {
      console.log(data);
      state.commentList.unshift(data);
    },
    // 添加二级评论
    __addCommentLevelTwo(state, data) {
      console.log(state, data);
      if (
        state.commentList.findIndex((x) => x.id === data.toCommentId) !== -1
      ) {
        state.commentList.forEach((items) => {
          if (items.id == data.toCommentId) {
            if (items.childrenList) {
              items.childrenList.push(data.dataList);
            } else {
              items.childrenList = [];
              items.childrenList.push(data.dataList);
            }
          }
        });
      }
    },
    // 统计评论数量
    __getCommentNum(state) {
      state.commentNum = state.commentList.length;
    },
  },
  //异步
  actions: {
    // 添加一级评论
    addCommentLevelOne({ commit }, data) {
      commit("__addCommentLevelOne", data);
      commit("__getCommentNum");
    },
    // 添加二级评论
    addCommentLevelTwo({ commit }, data) {
      commit("__addCommentLevelTwo", data);
    },
  },
  //分块管理
  modules: {
    notes,
    about,
    editor,
  },
  //持久化
  plugins: [createPersistedState()],
});
