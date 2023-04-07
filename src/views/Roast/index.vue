<template>
  <div class="roastBox">
    <comment
      @doSend="doSend($event)"
      @messageSend="doChidSend(arguments)"
      :commentList="commentList"
      :commentNum="commentNum"
      :avatar="avatar"
      :placeholder="placeholder"
      :isUseEmoj="true"
    ></comment>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import { mapState } from "vuex";
import * as Fn from "@/api/user.js";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      commentId: 10,
      placeholder: "说点什么吧",
      avatar:
        "http://localhost:3333/images/user/20230306144030upload_3b15d903276ea9a7483bc1169c0ce5b4.jpg",
    };
  },
  watch: {
    // "$store.state.roast.commentList": {
    //   handler(newval, oldval) {
    //     console.log(newval);
    //     console.log(oldval);
    //   },
    //   deep: true,
    // },
  },
  computed: {
    ...mapState({
      // 从vuex里面取评论列表
      commentList: (state) => state.roast.commentList,
      // 从vuex里面当前用户信息
      userInfo: (state) => state.roast.userInfo,
      // 评论数量
      commentNum: (state) => state.roast.commentNum,
    }),
  },
  mounted() {
    this.$store.commit("roast/__getCommentNum");
    let parentList = [];
    let childrenArr = [];
    Fn.getreplyMessgaelist({ pagenum: "1", pagesize: "20" }).then((res) => {
      for (let i = 0; i < res.data.result.length; i++) {
        let obj = {};
        if (res.data.result[i].isFirstLevel === 0) {
          obj.avatar = res.data.result[i].avatar;
          obj.content = res.data.result[i].content;
          obj.createDate = res.data.result[i].createDate;
          obj.id = res.data.result[i].id;
          obj.isFirstLevel = res.data.result[i].isFirstLevel;
          obj.toCommentId = res.data.result[i].toCommentId;
          obj.userId = res.data.result[i].userId;
          parentList.push(obj);
        } else {
          childrenArr.push(res.data.result[i]);
        }
      }
      // console.log(parentList, "parentList");
      // console.log(childrenArr, "childrenArr");
      parentList.map((itemp) => {
        let arr = [];
        childrenArr.map((items) => {
          if (items.toCommentId == itemp.userId && items.parentId == itemp.id ) {
            arr.push(items);
            itemp.childrenList = arr;
          }
        });
      });
      console.log(parentList, "commentList2");
    });
  },
  methods: {
    doSend(content) {
      console.log("一级评论发送内容" + content);
      let data = {
        // 随机id 防止重复
        id: this.commentId++,
        // 一级评论
        isFirstLevel: 0,
        content: content,
        createDate: new Date().toLocaleDateString(),
        commentUser: this.userInfo,
        avatar: require("@/assets/img/icon/avtar.png"),
      };
      /*
       * 1、以载荷形式分发
       * this.$store.dispatch('模块名/方法',传参)
       *
       * 2、以对象形式分发
       * this.$store.dispatch({
       * 	type:'模块名/方法',
       * 	传参
       * })
       */
      this.$store.dispatch("roast/addCommentLevelOne", data);
    },
    //接受到子组件的回复调用
    doChidSend(replyInfo) {
      console.log(replyInfo);
      let data = {
        dataList: {
          // id: parseInt(Math.random()*100000000),
          id: this.commentId++,
          // 二级评论
          isFirstLevel: 1,
          // 暂时写死恢复评论的人
          commentUser: {
            label: "大佬",
            userId: 10010,
            userName: "mqq",
            avatar:
              "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/mqq.jpg",
          },
          // 回复谁
          targetUser: {
            userId: replyInfo[1].userId,
            userName: replyInfo[1].userName,
            avatar: replyInfo[1].avatar,
          },
          content: replyInfo[0],
          createDate: new Date().toLocaleDateString(),
        },
        // 要恢复的id
        toCommentId: replyInfo[2],
      };
      console.log(data);
      this.$store.dispatch("roast/addCommentLevelTwo", data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.roastBox {
  max-height: 850px;
  overflow-y: scroll;
  @include background_color("main-left_licolor");
}
.roastBox::-webkit-scrollbar {
  width: 0 !important;
}
</style>
