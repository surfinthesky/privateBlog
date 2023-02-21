<template>
  <div>
    <div class="time_block">
      <el-timeline>
        <el-timeline-item
          placement="top"
          :reverse="false"
          v-for="(item, index) in timeLineArr"
          :key="index"
          :icon="item.stageIcon"
          type="success"
          :color="item.stageColor"
          size="large"
          :timestamp="item.stageCompletTime"
        >
          <el-card>
            <h4>{{ item.stageContent }}</h4>
            <p>Author cong 提交于: {{ item.stageTimestamp }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <!-- 切换语言 -->
    <!-- tabs标签页 -->
  </div>
</template>

<script>
import { getDateFormatComplete, getDateFormat } from "@/utils/formDate";
import { mapMutations } from "vuex";
import { getTimelinelist } from "@/api/user";
export default {
  name: "ArchiveIndex",
  data() {
    return {
      currentPage: 1,
      currentPagesize: 10,
      timeLineArr: [],
    };
  },
  mounted() {
    getTimelinelist({
      // pagenum: this.currentPage,
      // pagesize: this.currentPagesize,
    }).then((res) => {
      // let arr =[]
      res.data.result.map((item) => {
        item.stageCompletTime = getDateFormatComplete(item.stageCompletTime);
        item.stageTimestamp = getDateFormat(item.stageTimestamp);
      });
      // arr = res.data.result
      this.timeLineArr = [...this.timeLineArr, ...res.data.result];
    });
  },
  created() {},
  methods: {
    ...mapMutations({
      set_i18n: "SET_i18n",
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.time_block {
  margin: 30px 0px;
  h4 {
    color: #01aaed;
    padding-bottom: 15px;
  }
  p {
    // color: #333333;
    @include font_color("timeline-card-p");
  }
  ::v-deep .el-timeline-item__node--large {
    left: -5px;
    width: 19px;
    height: 19px;
  }
  ::v-deep .el-timeline-item__timestamp.is-top {
    @include font_color("timeline-card-timestamp");
  }
  ::v-deep .el-card {
    @include background_color("main-left_licolor");
    border: none;
  }
}
</style>
