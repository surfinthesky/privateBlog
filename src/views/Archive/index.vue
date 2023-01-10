<template>
  <div>
    <div class="time_block">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" :color="color" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018-4-2" placement="top">
          <el-card>
            <h4>个人blog开始编写</h4>
            <p>葱头 提交于 Nov 22, 2022</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <!-- 切换语言 -->
    <!-- tabs标签页 -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "ArchiveIndex",
  data() {
    return {
      color: "brown",
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
