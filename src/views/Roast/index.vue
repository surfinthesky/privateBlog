<template>
  <div class="roastBox">
    <comment
      @doSend="doSend($event)"
      @messageSend="doChidSend(arguments)"
      @initMessagePage="intMessage($event)"
      :commentNum="commentNum"
      :avatar="avatarurl"
      :placeholder="placeholder"
      :isUseEmoj="true"
    ></comment>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import { mapState, mapActions, mapMutations } from "vuex";
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
  watch: {},
  computed: {
    ...mapState({
      // 从vuex里面当前用户信息
      userInfo: (state) => state.roast.userInfo,
      // 评论数量
      commentNum: (state) => state.roast.commentNum,
    }),
  },
  async mounted() {
    if (localStorage.getItem("userMessageobj")) {
      this.__setUserinfo(JSON.parse(localStorage.getItem("userMessageobj")));
    }
    this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.5)",
    });
    await this.intMessage();
  },
  methods: {
    ...mapActions("roast", ["getAllmessage"]),
    ...mapMutations("roast", ["__setUserinfo"]),
    //格式化留言数据
    intMessage(pagenum) {
      let parentList = [];
      let childrenArr = [];
      let pageObj = {
        pagenum: 1,
        pagesize: "10",
        type: "roast",
      };
      if (pagenum) {
        (pageObj.pagenum = pagenum), (pageObj.pagesize = pagenum * 10);
      }
      Fn.getreplyMessgaelist(pageObj).then(async (res) => {
        this.$store.commit("roast/__getCommentNum", res.data.count);
        for (let i = 0; i < res.data.result.length; i++) {
          if (res.data.result[i].isFirstLevel === 0) {
            res.data.result[i].createDate = intutils.getDateFormat(
              res.data.result[i].createDate
            );
            res.data.result[i].createFormdate = intutils.getDateFormatnext(
              res.data.result[i].createDate
            );
            parentList.push(res.data.result[i]);
          } else {
            res.data.result[i].createDate = intutils.getDateFormat(
              res.data.result[i].createDate
            );
            res.data.result[i].createFormdate = intutils.getDateFormatnext(
              res.data.result[i].createDate
            );

            childrenArr.push(res.data.result[i]);
          }
        }

        parentList.map((itemp) => {
          let arr = [];
          childrenArr.map((items) => {
            if (items.parentId == itemp.id) {
              arr.push(items);
              itemp.childrenList = arr;
            }
          });
        });
        if (parentList) {
          this.$loading().close();
        }
        this.commentList = parentList;
        this.getAllmessage(parentList);
      });
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
        type: "roast",
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
      console.log(data, "一级留言");
      this.$store.dispatch("roast/addCommentLevelOne", data);
      Fn.insertMessage(data).then((res) => {
        console.log(res, "返回的结果");
      });
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
        // 暂时写死回复评论的人
        commentUser: this.userInfo,
        // commentUser: {
        //   id: 10010 + this.commentId++,
        //   username: "mqq" + this.commentId++,
        //   avatarurl:
        //     "https://huazizhanye.oss-cn-beijing.aliyuncs.com/blogs/images/mqq.jpg",
        // },
        // 回复谁
        targetUser: {
          userId: replyInfo[1].id,
          username: replyInfo[1].username,
          avatarurl: replyInfo[1].avatarurl,
        },
        parentId: replyInfo[2],
        content: replyInfo[0],
        type: "roast",
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
