<template>
  <div id="echarts_box"></div>
</template>

<script>
import * as echarts from "echarts";
import { getOverday } from "@/utils/formDate";
export default {
  name: "echarts",
  data() {
    return {
      timeArr:[]
    };
  },
  mounted() {
    this.timeArr = getOverday(7);
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      let chartDom = document.getElementById("echarts_box");
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        legend: {
          data: ["访问人数量（人/天）", "博客访问ip数（人/天）"],
        },
        xAxis: {
          type: "category",
          data: this.timeArr,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "访问人数量（人/天）",
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            smooth: true,
          },
          {
            name: "博客访问ip数（人/天）",
            data: [15, 210, 114, 218, 125, 147, 360],
            type: "line",
            smooth: true,
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
};
</script>

<style lang="scss" scoped>
#echarts_box {
  height: 500px;
}
</style>
>
