
const editor = {
    namespaced: true,//开启命名空间vue中才能映射成功 
    //否则报错 module namespace not found in mapState(): editor/
    state: {
      activePath:"",//管理端默认menu路径
      tableLoading:true,//表格骨架图隐藏
    },
    actions:{
      SET_tableLoading: (state,payload) => {
        state.tableLoading = payload;
        console.log(state.tableLoading);
      },
    },
    mutations: {
      SET_activePath: (state, payload) => {
        state.activePath = payload;
      },
      // SET_tableLoading: (state) => {
      //   state.tableLoading = !state.tableLoading;
      // },
    },
  };
  
  export default editor;
  