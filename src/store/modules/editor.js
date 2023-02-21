const editor = {
  namespaced: true, //开启命名空间vue中才能映射成功
  //否则报错 module namespace not found in mapState(): editor/
  state: {
    activePath: "", //管理端默认menu路径
    editorRow: {},
  },
  actions: {

  },
  mutations: {
    SET_activePath: (state, payload) => {
      state.activePath = payload;
    },
    SET_editorRow: (state, payload) => {
      state.editorRow = payload;
      // console.log(state.editorRow);
    },
  },
};

export default editor;
