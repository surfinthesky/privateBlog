<template>
  <div>
    <div>Notes</div>
    <div>
      <el-form>
        <el-form-item label="用户地址">
          <el-select
            v-model="form.seletVal"
            placeholder="请选择"
            readonly
            filterable
            style="width: 95%"
          >
            <el-option
              v-for="item in Options"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handClick()">修改数据 </el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "NotesPage",
  data() {
    return {
      form: {
        seletVal: "",
      },
      Options: [
        {
          Id: 1,
          Name: "alice",
        },
        {
          Id: 2,
          Name: "alice2",
        },
        {
          Id: 3,
          Name: "alice3",
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
    handClick() {
      //此时对象的值更改了，但是视图没有更新
      this.Options[3] = { Id: 4, Name: "数据是否修改" };
      let item = { Id: 5, Name: "数据是否修改" };
      // this.Options.push(item)
      this.$set(this.Options, 4, item);
      console.log("测试 ");
      console.log(this.Options);
    },
  },
};
</script>
<style lang="scss" scoped></style>
