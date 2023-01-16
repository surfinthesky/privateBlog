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
