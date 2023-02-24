<template>
  <div class="international">
    <div class="test">222</div>
    <!-- 切换语言 -->
    <div class="language">
      <el-select
        v-model="value"
        placeholder="请选择"
        @change="changeLangEvent(value)"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- tabs标签页 -->
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('message.music')" name="first">
          {{ $t("message.music") }}
        </el-tab-pane>
        <el-tab-pane :label="$t('message.findMusic')" name="second">
          {{ $t("message.findMusic") }}
        </el-tab-pane>
        <el-tab-pane :label="$t('message.myMusic')" name="third">
          {{ $t("message.myMusic") }}
        </el-tab-pane>
        <el-tab-pane :label="$t('message.friend')" name="fourth">
          {{ $t("message.friend") }}
        </el-tab-pane>
        <el-tab-pane :label="$t('message.musician')" name="fivth">
          {{ $t("message.musician") }}
        </el-tab-pane>
        <el-tab-pane :label="$t('message.download')" name="sixth">
          {{ $t("message.download") }}
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 11 -->
    &nbsp;
    <!-- <el-row :gutter="20">
      <el-col :span="12"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple"></div
      ></el-col>
    </el-row> -->
    
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "vueInternationalI18n",
  data() {
    return {
      value: "zh-CN",
      lang: "zh-CN",
      activeName: "first",
      options: [
        {
          value: "zh-CN",
          label: "中文",
        },
        {
          value: "zh-EN",
          label: "英文",
        },
      ],
    };
  },
  created() {
    console.log(this.$store);
    console.log(this.$i18n);
  },
  methods: {
    ...mapMutations({
      set_i18n: "SET_i18n",
    }),
    handleClick() {},
    // 切换语言
    changeLangEvent(value) {
      this.set_i18n(value);
      switch (value) {
        case "zh-CN":
          this.lang = value;
          this.$i18n.locale = this.lang; //关键语句
          break;
        case "zh-EN":
          this.lang = value;
          this.$i18n.locale = this.lang; //关键语句
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.international {
  // width: 75vw;
  // margin: 0 auto;
  .el-row {
    max-width: 1280px;
    // margin: auto !important;
  }
  .test {
    color: #000;
  }
}
.language {
  position: absolute;
  right: 12.5vw;
  z-index: 20000000;
}
.tabs {
  margin-top: 15px;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
