<template>
  <div class="roastBox">
    <comment
      @doSend="doSend($event)"
      @messageSend="doChidSend(arguments)"
      :commentNum="commentNum"
      :avatar="avatarurl"
      :placeholder="placeholder"
      :isUseEmoj="true"
    ></comment>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import { mapState, mapActions } from "vuex";
import * as Fn from "@/api/user.js";
import * as intutils from "@/utils/formDate.js";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      commentId: 10,
      placeholder: "说点什么吧",
      avatarurl:
        "http://localhost:3333/images/user/20230306144030upload_3b15d903276ea9a7483bc1169c0ce5b4.jpg",
      commentList: [],
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
      // 从vuex里面当前用户信息
      userInfo: (state) => state.roast.userInfo,
      // 评论数量
      commentNum: (state) => state.roast.commentNum,
    }),
  },
  async mounted() {
    await this.intMessage();
  },
  methods: {
    ...mapActions("roast", ["getAllmessage"]),
    intMessage() {
      let parentList = [];
      let childrenArr = [];
      Fn.getreplyMessgaelist({ pagenum: "1", pagesize: "20" }).then(
        async (res) => {
          this.$store.commit("roast/__getCommentNum", res.data.count);
          for (let i = 0; i < res.data.result.length; i++) {
            let obj = {};
            if (res.data.result[i].isFirstLevel === 0) {
              obj.content = res.data.result[i].content;
              obj.createDate = res.data.result[i].createDate;
              obj.id = res.data.result[i].id;
              obj.isFirstLevel = res.data.result[i].isFirstLevel;
              obj.toCommentId = res.data.result[i].toCommentId;
              obj.userId = res.data.result[i].userId;
              obj.createDate = intutils.getDateFormat(
                res.data.result[i].createDate
              );
              obj.createFormdate = intutils.getDateFormatnext(
                res.data.result[i].createDate
              );
              await Fn.getuserInfo({ id: res.data.result[i].userId }).then(
                (res) => {
                  obj.commentUser = res.data.result[0];
                  // console.log(res, "用户信息");
                }
              );
              parentList.push(obj);
            } else {
              let obj = {};
              obj.content = res.data.result[i].content;
              obj.createDate = res.data.result[i].createDate;
              obj.id = res.data.result[i].id;
              obj.isFirstLevel = res.data.result[i].isFirstLevel;
              obj.parentId = res.data.result[i].parentId;
              obj.toCommentId = res.data.result[i].toCommentId;
              obj.userId = res.data.result[i].userId;
              obj.createDate = intutils.getDateFormat(
                res.data.result[i].createDate
              );
              obj.createFormdate = intutils.getDateFormatnext(
                res.data.result[i].createDate
              );
              await Fn.getuserInfo({ id: res.data.result[i].toCommentId }).then(
                (res) => {
                  obj.targetUser = res.data.result[0];
                }
              );
              await Fn.getuserInfo({ id: res.data.result[i].userId }).then(
                (res) => {
                  obj.commentUser = res.data.result[0];
                }
              );
              childrenArr.push(obj);
            }
          }
          // console.log(parentList, "parentList");
          // console.log(childrenArr, "childrenArr");
          parentList.map((itemp) => {
            let arr = [];
            childrenArr.map((items) => {
              // items.toCommentId == itemp.userId &&
              if (items.parentId == itemp.id) {
                arr.push(items);
                itemp.childrenList = arr;
              }
            });
          });
          this.commentList = parentList;
          this.getAllmessage(parentList);
        }
      );
    },
    doSend(content) {
      console.log("一级评论发送内容" + content);
      let data = {
        // 随机id 防止重复
        id: parseInt(Math.random() * 100000000),
        // 一级评论
        isFirstLevel: 0,
        content: content,
        createDate: intutils.getDateFormat(new Date()),
        commentUser: this.userInfo,
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
      console.log(data,'一级留言');
      this.$store.dispatch("roast/addCommentLevelOne", data);
      // Fn.insertMessage(data).then((res) => {
      //   console.log(res, "返回的结果");
      // });
    },
    //接受到子组件的回复调用
    doChidSend(replyInfo) {
      console.log(replyInfo, "replyInfo");
      // return
      let data = {
        // id: parseInt(Math.random()*100000000),
        id: parseInt(Math.random() * 100), //当前评论的标识
        userId: 10010 + this.commentId++,
        // 二级评论
        isFirstLevel: 1,
        // 暂时写死恢复评论的人
        commentUser: {
          id: 10010 + this.commentId++,
          username: "mqq" + this.commentId++,
          avatarurl:
            "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/mqq.jpg",
        },
        // 回复谁
        targetUser: {
          userId: replyInfo[1].id,
          username: replyInfo[1].username,
          avatarurl: replyInfo[1].avatarurl,
        },
        parentId: replyInfo[2],
        content: replyInfo[0],
        createDate: intutils.getDateFormat(new Date()),
        createFormdate: intutils.getDateFormatnext(new Date()),
      };
      console.log(data);
      this.$store.dispatch("roast/addCommentLevelTwo", data);
      Fn.insertMessage(data).then((res) => {
        console.log(res, "添加下级数据为2级别或更下级别");
        if (res.data.message == "success") {
          this.intMessage();
        }
      });
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
