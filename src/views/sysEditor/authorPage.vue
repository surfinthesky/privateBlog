<!--  -->
<template>
  <div class="">
    <div v-html="value" class="markdown-body"></div>
    <div class="main_maven">
      <mavon-editor
        :ishljs="true"
        @change="$change"
        @save="$save"
        v-model="value"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/github.css";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    $change(pos, $file) {
      console.log(pos);
      console.log($file);
    },
    $save(pos, $file) {
      console.log(pos);
      console.log($file);
    //   this.initMaven($file);
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
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMaven(
        '## 二：修改elementUI样式？修改第三方组件的某个样式，很多样式往往被嵌在很多层样式里。我们才不想关注那么多，只想修改当前class这时可以使用/deep/样式穿透，无论要修改的样式藏得有多深，只需要使用/deep/.classname就可以搞定。需要注意，/deep/必须写在设置了scoped属性的style里，才能生效```<style lang="scss" scoped>.myStyle{/deep/ .content{background:red}}</style>```')
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang='scss'>
/*@import url(); 引入公共css类*/
</style>