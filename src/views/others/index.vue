<template>
  <div class="casebox">
    <ul class="casebox_ul">
      <li class="" v-for="item in 7" :key="item">
        <img
          src="http://localhost:3333/images/user/20230420090649upload_a8f8dd9019835148db8473eab67726a2.png"
          alt=""
        />
        <h3>标题async 实战应用</h3>
        <h5>描述qaq 分三种情况 具体使用如下</h5>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "othersPage",
  data() {
    return {};
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
.casebox {
  .casebox_ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 12px;
    li:hover {
      transform: scale(0.98);
    }
    li {
      height: 200px;
      padding: 15px;
      margin: 10px;
      width: 300px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 2px 2px 9px -2px rgb(192 192 192);
      img {
        width: 100%;
        height: 120px;
        border-radius: 4px;
      }
      h3 {
        color: #333;
        margin: 10px 0px;
      }
      h5 {
        color: #777;
      }
    }
  }
}
</style>
