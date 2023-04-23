import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import notes from "./modules/notes";
import about from "./modules/about";
import editor from "./modules/editor";
import roast from "./modules/roast";
import article from "./modules/article";
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
    userlocaltioninfo: {},
    userareaInfo: {},
    weatherList:[],//当前用户所在地天气数据存储
    articleList:[]
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
    },
    //存储用户信息ip
    SET_userlocaltion(state, payload) {
      state.userlocaltioninfo = payload;
    },
    //存储用户信息区域
    SET_userarea(state, payload) {
      state.userareaInfo = payload;
    },
    //存储用户所在地天气
    SET_userWeather(state, payload) {
      state.weatherList = payload;
    },
    //首页文章list
    SET_articleList(state, payload) {
      console.log(payload);
      state.articleList = payload;
    },
  },
  //异步
  actions: {},
  //分块管理
  modules: {
    notes,
    about,
    editor,
    roast,
    article
  },
  //持久化
  plugins: [createPersistedState()],
});
