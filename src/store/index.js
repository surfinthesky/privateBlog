import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import notes from "./modules/notes";
import about from "./modules/about";
import editor from "./modules/editor";
Vue.use(Vuex);
const _that = new Vue();
export default new Vuex.Store({
  //数据
  state: {
    i18nValue: "", //是否国际化
    scrollValue: 0, //滚动条滚动距离
    activeName: "/homepage", //默认页面路径
    themeValue:"light",
    loginOut:false,//登出
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
      console.log(_that);
      state.loginOut = payload;
    },
  },
  //异步
  actions: {},
  //分块管理
  modules: {
    notes,
    about,
    editor
  },
  //持久化
  plugins: [createPersistedState()],
});
