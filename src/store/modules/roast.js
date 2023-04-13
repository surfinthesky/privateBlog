const roast = {
  namespaced: true, //开启命名空间vue中才能映射成功
  //否则报错 module namespace not found in mapState(): editor/
  state: {
    // 评论数量
    commentNum: 0,
    // 当前用户信息
    userInfo: {
      id: 10086,
      username: "surfing",
      avatarurl:
        "http://localhost:3333/images/user/20230306144050upload_662b5f32a0ace7b28f8abb8487475e34.jpg",
    },
    commentList: [],
  },
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
    //获取留言
    getAllmessage({ commit }, data) {
      commit("__getAllmessage", data);
    },
  },
  mutations: {
    //获取留言
    __getAllmessage(state, data) {
      state.commentList = data;
      console.log(state.commentList, "__getAllmessage");
    },
    // 添加一级评论
    __addCommentLevelOne(state, data) {
      console.log(data);
      state.commentList.unshift(data);
    },
    // 添加二级评论
    __addCommentLevelTwo(state, data) {
      // console.log(state.commentList, "commentList");
      console.log(data, "data--");
      console.log(state.commentList,'commentList');
      // return;
      // 判断是不是回复他人消息标识Id匹配
      if (
        state.commentList.findIndex((item) => item.id === data.parentId) !==
        -1
      ) {
        state.commentList.forEach((items) => {
          //  console.log(items,'items');
          if (items.id == data.parentId) {
            if (items.childrenList) {
              items.childrenList.unshift(data);
              console.log(items.childrenList,'itemschildrenList');
            } else {
              items.childrenList = [];
              items.childrenList.unshift(data);
              console.log(items.childrenList,'itemschildrenList2');
            }
          }
        });
         console.log(state.commentList,'state.commentList');
      }
    },
    // 统计评论数量
    __getCommentNum(state,count) {
      state.commentNum = count;
    },
  },
};

export default roast;
