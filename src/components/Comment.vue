<template>
  <!-- 评论组件 -->
  <div class="roastcom">
    <!-- 顶部 -->
    <div class="roastcom-topcommbox">
      <div class="roastcom-topcommbox-avatar" v-if="showAvatar">
        <avatar :avatar="avatar"></avatar>
      </div>
      <div class="roastcom-topcommbox-comment" :style="{ width: commentWidth }">
        <textarea
          class="textarea_outhor"
          @focus="showButton(0)"
          maxlength="500"
          :placeholder="placeholder"
          v-model="textareaMap.textValue"
        >
        </textarea>
        <div v-if="buttonMap[0]">
          <div
            v-if="isUseEmoj"
            :class="pBodyMap[0] ? 'Emo' : 'Emo Emo-open'"
            class="emoj public"
            :style="{ width: emojiWidth }"
          >
            <div class="Emo-logo" @click="pBodyStatus(0)">
              <span>Emoji</span>
            </div>
            <div class="Emo-body">
              <ul class="Emo-items Emo-items-show">
                <li
                  class="Emo-item"
                  v-for="(oitem, index) in Emolist"
                  :key="'oitem' + index"
                  @click="choseEmoji(0, oitem.title)"
                >
                  <img
                    :src="require('@/assets/img/face/' + oitem.url)"
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
          <div class="public public-btn messageParent">
            <button class="btn" @click="doSend()">发送</button>
            <button @click="cancelFn(0)" class="btn btn-cancel">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论数量区 -->
    <div class="roastcom-commcount">
      <div class="su com-rep"></div>
      <div class="com-rep com-title">
        评论<span class="com-span">({{ commentNum }})</span>
      </div>
    </div>
    <!-- 底部评论区 -->
    <div
      v-for="(item, index) in commentList"
      class="roastcom-child"
      :key="index"
    >
      <div class="infosend"></div>
      <div class="content">
        <div class="comment-f">
          <avatar
            :avatar="
              item.commentUser.avatarurl ? item.commentUser.avatarurl : avatar
            "
          ></avatar>
        </div>
        <div class="comment-f">
          <div>
            <div class="username author">
              {{ item.commentUser.username }}
            </div>
            <div class="date">
              {{ item.createDate }}
            </div>
          </div>
        </div>

        <div class="infosend-content" v-html="analyzeEmoji(item.content)"></div>
        <div class="infosend-content infosend-fa">
          <div class="infosend-font" @click="doReply(item.id)">
            <div>
              <img
                src="@/assets/img/icon/reply.png"
                class="icon-infosend"
              /><font class="icon-infosend icon-hf">回复</font>
            </div>
          </div>

          <div
            class="comment"
            :style="{ width: commentWidth }"
            v-if="replyMap.focusValue == item.id"
            :showAvatar="showAvatar"
          >
            <textarea
              class="textarea_hf"
              @focus="showButton(item.id)"
              :placeholder="placeholder"
              v-model="textareaMap.textValue"
            >
            </textarea>

            <div v-if="buttonMap[item.id]">
              <div
                v-if="isUseEmoj"
                :class="pBodyMap[item.id] ? 'Emo' : 'Emo Emo-open'"
                class="emoj public"
                :style="{ width: emojiWidth }"
              >
                <div class="Emo-logo" @click="pBodyStatus(item.id)">
                  <span>Emoji</span>
                </div>
                <div class="Emo-body">
                  <ul class="Emo-items Emo-items-show">
                    <li
                      class="Emo-item"
                      v-for="(oitem, index) in Emolist"
                      :key="'oitem' + index"
                      @click="choseEmoji(item.id, oitem.title)"
                    >
                      <img
                        :src="require('@/assets/img/face/' + oitem.url)"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div class="public public-btn messageChild">
                <button
                  class="btn"
                  @click="doChidSend(item.id, item.commentUser, item.id,item.userId)"
                >
                  发送
                </button>
                <button @click="cancelFn(item.id)" class="btn btn-cancel">
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 子评论回复 -->
      <div
        class="children"
        v-for="(replyitem, replyindex) in item.childrenList"
        :key="replyindex"
      >
        <div class="infosend"></div>
        <div class="content">
          <div class="comment-f">
            <avatar
              :avatar="
                replyitem.commentUser.avatarurl
                  ? replyitem.commentUser.avatarurl
                  : avatar
              "
            ></avatar>
          </div>

          <div class="comment-f">
            <div>
              <div class="username author">
                {{ replyitem.commentUser.username }}
              </div>
              <div class="date">
                {{ replyitem.createDate }}
              </div>
            </div>
          </div>

          <div class="infosend-content">
            <div class="send send-to">
              <a href="#">@{{ replyitem.targetUser.username }}</a>
            </div>

            <div class="send" v-html="analyzeEmoji(replyitem.content)"></div>
          </div>

          <div class="infosend-content infosend-fa">
            <div class="infosend-font" @click="doReply(replyitem.id)">
              <div>
                <!-- 下级评论区域 -->
                <img
                  src="@/assets/img/icon/reply.png"
                  class="icon-infosend"
                /><font class="icon-infosend icon-hf">回复</font>
              </div>
            </div>

            <div
              class="comment"
              :style="{ width: commentWidth }"
              v-if="replyMap.focusValue == replyitem.id"
              :showAvatar="showAvatar"
            >
              <textarea
                class="textarea_hf"
                @focus="showButton(replyitem.id)"
                :placeholder="placeholder"
                v-model="textareaMap.textValue"
              >
              </textarea>

              <div v-if="buttonMap[replyitem.id]">
                <div
                  :class="pBodyMap[replyitem.id] ? 'Emo' : 'Emo Emo-open'"
                  class="emoj public"
                  :style="{ width: emojiWidth }"
                >
                  <div class="Emo-logo" @click="pBodyStatus(replyitem.id)">
                    <span>Emoji</span>
                  </div>
                  <div class="Emo-body">
                    <ul class="Emo-items Emo-items-show">
                      <li
                        class="Emo-item"
                        v-for="(oitem, index) in Emolist"
                        :key="'oitem' + index"
                        @click="choseEmoji(replyitem.id, oitem.title)"
                      >
                        <img
                          :src="require('@/assets/img/face/' + oitem.url)"
                          alt=""
                        />
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="public public-btn messageChild2">
                  <button
                    class="btn"
                    @click="
                      doChidSend(replyitem.id, replyitem.commentUser, item.id,item.userId)
                    "
                  >
                    发送
                  </button>
                  <button
                    @click="cancelFn(replyitem.id)"
                    class="btn btn-cancel"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "./Avatar.vue";
import { emoji } from "./emoji.js";
import { mapState } from "vuex";
export default {
  props: {
    emojiWidth: {
      type: String,
      default: "560px",
    },
    showAvatar: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "在此输入评论内容...",
    },
    minRows: {
      type: Number,
      default: 4,
    },
    maxRows: {
      type: Number,
      default: 8,
    },
    commentNum: {
      type: Number,
      default: 0,
    },
    authorId: {
      type: Number,
      default: 1,
    },
    commentWidth: {
      type: String,
      default: "80%",
    },
    // 是否启用表情
    isUseEmoj: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      replyMap:{
        focusValue:0
      },
      buttonMap: [],
      pBodyMap: {
        pBodyValue:0
      },
      textareaMap:{
        textValue:""
      },
      Emolist: emoji,
    };
  },
  computed: {
    ...mapState("roast", ["commentList"]),
  },
  mounted() {
    
    console.log(this.commentList);
  },
  watch: {
    // pBodyMap: {
    //   handler(newval, oldval) {
    //     console.log(newval);
    //     console.log(oldval);
    //   },
    //   deep: true,
    // },
  },
  components: {
    avatar,
  },
  methods: {
    // this.$set(target, propertyName/index, value)
    // （1） target: 要更改的数据源（可以是一个对象或者数组）
    // （2）propertyName/index: 要更改的具体数据 （索引）
    // （3）value: 重新赋的值(any)
    //事件处理器
    showButton(index) {
      this.$set(this.buttonMap, index, true);
    },
    //关闭输入框及emoji表情
    cancelFn(index) {
      this.$set(this.buttonMap, index, false);
      if (index !== 0) {
        this.$set(this.replyMap, "focusValue", 0);
      }
    },
    doSend() {
      // 一级评论发送事件
      this.$emit("doSend", this.textareaMap.textValue);
      console.log(this.textareaMap.textValue, "顶部留言");
      this.$set(this.textareaMap, "textValue", "");
    },
    // 二级评论发送事件
    doChidSend(index, commentUserId, pid,userId) {
      console.log(index, commentUserId, pid,userId, "回复其他留言");
      this.$emit("messageSend", this.textareaMap.textValue, commentUserId, pid,userId);
      this.$set(this.textareaMap, "textValue", "");
    },
    //选择表情包
    choseEmoji: function (index, inner) {
      var con = "";
      con = this.textareaMap.textValue += "[" + inner + "]";
      this.$set(this.textareaMap, 'textValue', con);
    },
    analyzeEmoji: function (cont) {
      //编译表情替换成图片展示出来
      var pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
      var pattern2 = /\[[\u4e00-\u9fa5]+\]/;
      var content = cont.match(pattern1);
      var str = cont;
      if (content) {
        for (var i = 0; i < content.length; i++) {
          for (var j = 0; j < this.Emolist.length; j++) {
            if ("[" + this.Emolist[j].title + "]" == content[i]) {
              var src = this.Emolist[j].url;
              break;
            }
          }
          var s = require("@/assets/img/face/" + src);
          var imoj = "<img src='" + s + "'/>";
          str = str.replace(pattern2, imoj);
        }
      }
      return str;
    },
    //当前点击回复他人id存储
    doReply(index) {
      this.$set(this.replyMap, 'focusValue', index);
      this.$set(this.textareaMap, 'textValue', '');
      console.log(this.replyMap,'focusValue');
    },
    //传递回复他人的id
    pBodyStatus(itemid) {
      this.$set(this.pBodyMap, "pBodyValue",itemid);
      console.log(this.pBodyMap);
    },
  },
};
</script>
<style lang="scss" scoped>
// 暂时保留
.comment {
  display: inline-block;
  vertical-align: top;
}
.roastcom {
  // 顶部评论区域
  &-topcommbox {
    padding: 40px;
    &-avatar {
      display: inline-block;
      vertical-align: top;
    }
    &-comment {
      display: inline-block;
      vertical-align: top;
      .textarea_outhor {
        padding: 10px;
        box-sizing: border-box;
        color: #363d4c;
        border: 1px solid #999;
        border-radius: 10px;
        font-size: 16px;
        width: 99%;
        height: 80px;
      }
    }
  }
  //评论数量
  &-commcount {
    padding: 20px;
    .su {
      margin-top: 2px;
      width: 5px;
      height: 23px;
      background: #0bbfed; /*#1E90FF*/
    }
    .com-rep {
      display: inline-block;
      vertical-align: top;
    }
    .com-title {
      font-size: 20px;
      margin-left: 5px;
    }
    .com-span {
      font-size: 16px;
    }
  }
  // 底部评论区
  &-child {
    padding: 20px;
    .infosend {
      border-top: solid 1px #d9d9d9;
    }
    .content {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .comment-f {
      display: inline-block;
      vertical-align: top;
    }
    .username {
      font-size: 14px;
    }
    .author {
      display: inline-block;
    }
    .icon {
      margin-left: 2px;
      background: #f6b80e;
      color: #eb3510;
      border-radius: 5px;
      padding: 1px 4px;
      font-size: 10px;
      font-weight: 600px;
    }
    .date {
      font-size: 12px;
      margin-top: 5px;
      color: grey;
    }
    .infosend-content {
      word-wrap: break-word;
      width: 90%;
      font-size: 15px;
      line-height: 25px;
      margin-left: 56px;
    }

    .infosend-fa {
      margin-top: 5px;
    }
    .infosend-font {
      margin-bottom: 5px;
      color: grey;
      cursor: pointer;
    }
    .children {
      padding-left: 40px;
    }
  }
}

.emoj {
  /*width: 560px;*/
}
.public {
  margin-top: 10px;
  margin-right: 131px;
  display: inline-block;
  vertical-align: top;
}
.public-btn {
  float: right;
}

.textarea_hf {
  padding: 10px;
  box-sizing: border-box;
  color: #363d4c;
  border: 1px solid #999;
  border-radius: 10px;
  font-size: 16px;
  width: 80%;
  height: 60px;
}
.btn {
  width: 70px; /* 宽度 */
  margin-top: 3px;
  height: 30px; /* 高度 */
  border-width: 0px; /* 边框宽度 */
  border-radius: 3px; /* 边框半径 */
  background: #3cb371; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: white; /* 字体颜色 */
  font-size: 13px; /* 字体大小 */
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
}
.btn-cancel {
  background: grey; /* 背景颜色 */
}

.tmsgBox {
  position: relative;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.tmsg-respond h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}
.tmsg-respond h3 small {
  font-size: smaller;
  cursor: pointer;
}
.tmsg-respond textarea {
  background: #f4f6f7;
  height: 100px;
  margin-bottom: 10px;
}

.Emo {
  position: relative;
  z-index: 1;
}
.Emo .Emo-logo {
  position: relative;
  border-radius: 4px;
  color: #444;
  display: inline-block;
  background: #fff;
  border: 1px solid #ddd;
  font-size: 13px;
  padding: 0 6px;
  cursor: pointer;
  height: 30px;
  box-sizing: border-box;
  z-index: 2;
  line-height: 30px;
}
.Emo .Emo-logo:hover {
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.Emo .Emo-body {
  width: 50%;
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  z-index: 1;
  top: 29px;
  border-radius: 0 4px 4px 4px;
  display: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.Emo-open .Emo-body {
  display: block;
}
.Emo-open .Emo-logo {
  border-radius: 4px 4px 0 0;
  border-bottom: none;
}
.Emo-open .Emo-logo:hover {
  animation: none;
  -webkit-animation: none;
}
.Emo .Emo-items {
  max-height: 197px;
  overflow: scroll;
  font-size: 0;
  padding: 10px;
  z-index: 1;
}
.Emo .Emo-items .Emo-item {
  background: #f7f7f7;
  padding: 5px 3px;
  border-radius: 5px;
  display: inline-block;
  margin: 0 10px 12px 0;
  transition: 0.3s;
  line-height: 19px;
  font-size: 20px;
  cursor: pointer;
}
.Emo .Emo-items .Emo-item:hover {
  background: #eee;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.Emo .Emo-body .Emo-bar {
  width: 5%;
  height: 30px;
  border-top: 1px solid #ddd;
  background: #fff;
  border-radius: 0 0 4px 4px;
  color: #444;
}
.Emo .Emo-body .Emo-bar .Emo-packages li {
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  margin-right: 3px;
  text-align: center;
}
.Emo .Emo-body .Emo-bar .Emo-packages li:first-of-type {
  border-radius: 0 0 0 3px;
}
/*用户输入表单*/
.tmsg-r-info {
  margin: 10px 0;
}
.tmsg-r-info textarea {
  height: 30px;
  border-radius: 4px;
  background: #f4f6f7;
}
.tmsg-r-info .info-submit {
  margin: 10px 0;
  text-align: center;
}
.tmsg-r-info .info-submit p,
.tmsg-commentshow h1 {
  /*background: #97dffd;*/
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  /*transition: all .3s ease-in-out;*/
  height: 30px;
  line-height: 30px;
  text-align: center;
}
/*.tmsg-r-info .info-submit p:hover{
    background: #47456d;
}*/
/*评论列表*/
.tmsg-comments .tmsg-comments-tip {
  display: block;
  border-left: 2px solid #363d4c;
  padding: 0 10px;
  margin: 40px 0;
  font-size: 20px;
}
.tmsg-commentlist {
  margin-bottom: 20px;
}
.tmsg-commentshow > .tmsg-commentlist {
  border-bottom: 1px solid #e5eaed;
}
.tmsg-c-item {
  border-top: 1px solid #e5eaed;
}
.tmsg-c-item article {
  margin: 20px 0;
}
.tmsg-c-item article header {
  margin-bottom: 10px;
}
.tmsg-c-item article header img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  float: left;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  margin-right: 15px;
  object-fit: cover;
}
.tmsg-c-item article header img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}
.tmsg-c-item article header .i-name {
  font-size: 14px;
  margin: 5px 8px 7px 0;
  color: #444;
  font-weight: bold;
  display: inline-block;
}
.tmsg-c-item article header .i-class {
  display: inline-block;
  margin-left: 10px;
  background: #dff0d8;
  color: #3c763d;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 400;
}
.tmsg-c-item article header .i-time {
  color: #aaa;
  font-size: 12px;
}
.tmsg-c-item article section {
  margin-left: 80px;
}
.tmsg-c-item article section p img {
  vertical-align: middle;
}
.tmsg-c-item article section .tmsg-replay {
  margin: 10px 0;
  font-size: 12px;
  color: #64609e;
  cursor: pointer;
}
.hzzy-owo {
  text-align: left;
}

.roastcom {
  text-align: left;
}

.send {
  display: inline-block;
}
.send-to a {
  text-decoration: none;
  color: #409eff;
  margin-right: 4px;
}
.icon-infosend {
  display: inline-block;
  vertical-align: top;
}

.icon-hf {
  margin-top: 2px;
}
</style>
