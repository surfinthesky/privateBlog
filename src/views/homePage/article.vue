<template>
  <div class="articleBox">
    <div class="articleDetail">
      <h1 style="color: #343a40; font-size: 28px" class="dialog_h1">
        {{ drawerarticleTitle }}
      </h1>
      <div
        v-html="value"
        :class="
          themeValue == 'dark' ? 'markdown-body-dark' : 'markdown-body-light'
        "
      ></div>
    </div>
    <div class="roastBox">
      <CommentArticle
        @doSend="doSend($event)"
        @messageSend="doChidSend(arguments)"
        @initMessagePage="intMessage($event)"
        :commentNum="commentNum"
        :avatar="avatarurl"
        :placeholder="placeholder"
        :isUseEmoj="true"
      ></CommentArticle>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Base64 } from "js-base64";
import Marked from "marked";
import highlight from "highlight.js";
import CommentArticle from "@/components/CommentArticle.vue";
import { mapState, mapActions,mapMutations } from "vuex";
import * as Fn from "@/api/user.js";
import * as intutils from "@/utils/formDate.js";
Vue.use(Base64);
export default {
  name: "",
  components: { CommentArticle },
  data() {
    return {
      value: "",
      drawerarticleTitle: "",
      commentId: 10,
      placeholder: "说点什么吧",
      avatarurl:
        "http://localhost:3333/images/user/20230306144030upload_3b15d903276ea9a7483bc1169c0ce5b4.jpg",
      commentList: [],
    };
  },
  mounted() {
    if (localStorage.getItem("userMessageobj")) {
      this.__setUserinfo(JSON.parse(localStorage.getItem("userMessageobj")));
    }
    console.log(this.$route.query.id);
    console.log(this.articleList);
    let findex = this.articleList.findIndex(
      (item) => item.id == this.$route.query.id
    );
    this.drawerarticleTitle = this.articleList[findex].articleTitle;
    this.initMaven(Base64.decode(this.articleList[findex].articleHtmlText));
    this.intMessage();
  },
  created() {},
  computed: {
    ...mapState(["articleList", "themeValue"]),
    ...mapState({
      // 从vuex里面当前用户信息
      userInfo: (state) => state.article.userInfo,
      // 评论数量
      commentNum: (state) => state.article.commentNum,
    }),
  },
  watch: {},
  methods: {
    ...mapActions("article", ["getAllmessage"]),
    ...mapMutations("article", ["__setUserinfo"]),
    //格式化留言数据
    intMessage(pagenum) {
      let parentList = [];
      let childrenArr = [];
      let pageObj = {
        pagenum: 1,
        pagesize: "10",
        articleid: this.$route.query.id,
        type: "article",
      };
      if (pagenum) {
        (pageObj.pagenum = pagenum), (pageObj.pagesize = pagenum * 10);
      }
      Fn.getreplyMessgaelist(pageObj).then(async (res) => {
        this.$store.commit("article/__getCommentNum", res.data.count);
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
      console.log("一级评论发送内容article" + content);
      let data = {
        // 一级评论
        isFirstLevel: 0,
        content: content,
        createDate: intutils.getDateFormat(new Date()),
        // commentUser: this.userInfo,
        commentUser: JSON.parse(localStorage.getItem("userMessageobj")),
        type: "article",
        articleid: this.$route.query.id,
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
      console.log(data, "一级留言article");
      this.$store.dispatch("article/addCommentLevelOne", data);
      Fn.insertMessage(data).then((res) => {
        console.log(res, "返回的结果article");
      });
    },
    //接受到子组件的回复调用
    doChidSend(replyInfo) {
      console.log(replyInfo, "replyInfo");
      // return
      let data = {
        userId: 10010 + this.commentId++,
        // 二级评论
        isFirstLevel: 1,
        // 暂时写死回复评论的人
        commentUser: JSON.parse(localStorage.getItem("userMessageobj")),
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
        createDate: intutils.getDateFormat(new Date()),
        createFormdate: intutils.getDateFormatnext(new Date()),
        type: "article",
        articleid: this.$route.query.id,
      };
      console.log(data);
      this.$store.dispatch("article/addCommentLevelTwo", data);
      Fn.insertMessage(data).then((res) => {
        console.log(res, "添加下级数据为2级别或更下级别");
        if (res.data.message == "success") {
          this.intMessage();
        }
      });
    },
    initMaven(content) {
      const rendererMD = new Marked.Renderer();
      rendererMD.image = function (href, title, text) {
        return `<img onclick="showMarkedImage(event, '${href}')" src="${href}" alt="${text}" title="${
          title ? title : ""
        }">`;
      };
      Marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        },
      });

      this.value = Marked(content).replace(
        /<pre>/g,
        "<pre class='language-html'>"
      );
    },
    //阅读详情
    drawerMe(payload) {
      // this.drawer = true;
      // this.drawerarticleTitle = payload.articleTitle;
      // this.initMaven(Base64.decode(payload.articleHtmlText));
      this.$router.push({
        path: "article",
        query: { id: payload.id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/minxin.scss";
@import "@/styles/variables.scss";
@import "@/styles/github-markdown-dark.css";
@import "@/styles/github-markdown-light.css";
@import "@/styles/variables.scss";
.articleDetail {
  border-radius: 8px;
  @include background_color("dialog_bgcolor");
  margin-bottom: 40px;
  //   margin-bottom: 25px;
  ::v-deep .el-dialog {
    @include background_color("dialog_bgcolor");
  }
  .dialog_h1 {
    @include font_color("main-left_h2");
    text-align: center;
    padding: 15px 0px;
  }
}
.roastBox {
  max-height: 850px;
  overflow-y: scroll;
  @include background_color("main-left_licolor");
  border-radius: 8px;
}
.roastBox::-webkit-scrollbar {
  width: 0 !important;
}
</style>
