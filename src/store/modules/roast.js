const roast = {
  namespaced: true, //开启命名空间vue中才能映射成功
  //否则报错 module namespace not found in mapState(): editor/
  state: {
    // 评论数量
    commentNum: 0,
    // 当前用户信息
    userInfo: {
      userId: 10086,
      userName: "surfing",
      avatar:
        "http://localhost:3333/images/user/20230306144050upload_662b5f32a0ace7b28f8abb8487475e34.jpg",
    },
    commentList: [
      {
        id: 1,
        isFirstLevel: 0,
        commentUser: {
          userId: 10086,
          userName: "surfing",
          avatar:
            "http://localhost:3333/images/user/20230306144050upload_662b5f32a0ace7b28f8abb8487475e34.jpg",
        },
        content: "my name is surfing",
        createDate: new Date().toLocaleDateString(),
        childrenList: [
          {
            id: 2,
            isFirstLevel: 1,
            commentUser: {
              userId: 10010,
              userName: "mqq",
              avatar:
                "http://localhost:3333/images/user/20230306144103upload_a5e7f94fbbad3de1bd9088bbc9c6a10f.jpg",
            },
            targetUser: {
              userId: 10086,
              userName: "surfing",
              avatar:
                "http://localhost:3333/images/user/20230306144050upload_662b5f32a0ace7b28f8abb8487475e34.jpg",
            },
            content: "hello surfing",
            createDate: new Date().toLocaleDateString(),
          },
          {
            id: 3,
            commentUser: {
              userId: 10086,
              userName: "surfing",
              avatar:
                "http://localhost:3333/images/user/20230306144050upload_662b5f32a0ace7b28f8abb8487475e34.jpg",
            },
            targetUser: {
              userId: 10010,
              userName: "mqq",
              avatar:
                "http://localhost:3333/images/user/20230306144103upload_a5e7f94fbbad3de1bd9088bbc9c6a10f.jpg",
            },
            content: "hello mqq~",
            createDate: new Date().toLocaleDateString(),
          },
        ],
      },
    ],
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
  },
  mutations: {
    // 添加一级评论
    __addCommentLevelOne(state, data) {
      console.log(data);
      state.commentList.unshift(data);
    },
    // 添加二级评论
    __addCommentLevelTwo(state, data) {
      console.log(state.commentList, "commentList");
      console.log(data, "data--");
      // return;
      // 判断是不是回复他人消息标识Id匹配
      if (
        state.commentList.findIndex((item) => item.id === data.toCommentId) !==
        -1
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
};

export default roast;
