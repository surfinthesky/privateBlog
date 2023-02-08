const editor = {
  namespaced: true, //开启命名空间vue中才能映射成功
  //否则报错 module namespace not found in mapState(): editor/
  state: {
    activePath: "", //管理端默认menu路径
    tableLoading: false, //表格骨架图隐藏
    editorRow: {},
  },
  actions: {
    SET_tableLoading: (state, payload) => {
      state.tableLoading = payload;
    },
  },
  mutations: {
    SET_activePath: (state, payload) => {
      state.activePath = payload;
    },
    SET_editorRow: (state, payload) => {
      console.log(payload,'payload');
      state.editorRow = payload;
    },
  },
};

export default editor;
