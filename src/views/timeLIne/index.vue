<template>
  <div>
    <div class="time_block">
      <el-timeline>
        <el-timeline-item
          :reverse="false"
          v-for="(item, index) in timeLineArr"
          :key="index"
          :icon="item.icon"
          :type="item.type"
          :color="item.color"
          :size="item.size"
          :timestamp="item.completTime"
        >
          <el-card>
            <h4>{{ item.content }}</h4>
            <p>葱头提交于 {{ item.timestamp }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <!-- 切换语言 -->
    <!-- tabs标签页 -->
  </div>
</template>

<script>
import { getDateFormatComplete } from "@/utils/formDate";
import { mapMutations } from "vuex";
export default {
  name: "ArchiveIndex",
  data() {
    return {
      timeLineArr: [
        {
          content: "支持使用图标1",
          timestamp: "2018-04-12 20:46",
          completTime: getDateFormatComplete(new Date()),
          size: "large",
          color: "#0bbd87",
        },
        {
          content: "支持使用图标2",
          timestamp: "2018-04-12 20:46",
          completTime: getDateFormatComplete(new Date()),
          size: "large",
          color: "#0bbd87",
        },
        {
          content: "支持使用图标3",
          timestamp: "2018-04-12 20:46",
          completTime: getDateFormatComplete(new Date()),
          size: "large",
          color: "#0bbd87",
        },
      ],
    };
  },
  mounted() {},
  created() {},
  methods: {
    ...mapMutations({
      set_i18n: "SET_i18n",
    }),
  },
};
</script>
<style lang="scss" scoped>
.time_block {
  margin: 30px 0px;
  h4 {
    color: #01aaed;
    padding-bottom: 15px;
  }
  p {
    color: #333333;
  }
}
</style>
