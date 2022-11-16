const about = {
  state: {
    title: "暂无",
    status: "",
  },

  mutations: {
    SET_Title: (state, payload) => {
      state.title = payload;
    },
  },
};

export default about;
