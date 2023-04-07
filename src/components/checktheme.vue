<!--
 * @version: V1.0.0
 * @Author: surfinthesky
 * @Date: 2023-03-11 10:16:49
 * @LastEditors: surfinthesky
 * @LastEditTime: 2023-04-03 10:44:00
 * @company: privateblog
 * @Mailbox: surf771995@163.com
 * @Descripttion: 顶部右侧主题切换组件
-->
<template>
  <div class="toggleWrapper">
    <input
      type="checkbox"
      :checked="themeValue == 'dark' ? true : false"
      class="dn"
      id="dn"
      ref="dn"
      @click="sendTheme($event)"
    />
    <label for="dn" class="toggle">
      <span class="toggle__handler">
        <span class="crater crater--1"></span>
        <span class="crater crater--2"></span>
        <span class="crater crater--3"></span>
      </span>
      <span class="star star--1"></span>
      <span class="star star--2"></span>
      <span class="star star--3"></span>
      <span class="star star--4"></span>
      <span class="star star--5"></span>
      <span class="star star--6"></span>
    </label>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  mounted() {
    // 初始化主题
    if (localStorage.getItem("private-theme") == "dark-theme") {
      this.setThemeValue("dark");
    }
  },
  computed: {
    ...mapState(["themeValue"]),
  },
  methods: {
    ...mapMutations({
      setThemeValue: "SET_themeValue",
    }),
    sendTheme(payload) {
      if (payload.target.checked == true) {
        window.document.documentElement.setAttribute(
          "data-theme",
          "dark-theme"
        );
        this.setThemeValue("dark");
        localStorage.setItem("private-theme", "dark-theme");
      } else {
        window.document.documentElement.setAttribute(
          "data-theme",
          "light-theme"
        );
        this.setThemeValue("light");
        localStorage.setItem("private-theme", "light-theme");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.toggleWrapper {
  position: absolute;
  right: 0px;
  top: 0px;
  overflow: hidden;
  padding: 0 60px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.toggleWrapper input {
  position: absolute;
  left: -99em;
}

.toggle {
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 90px;
  height: 50px;
  background-color: #83d8ff;
  border-radius: 84px;
  -webkit-transition: background-color 200ms
    cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.toggle:before {
  content: "AM";
  position: absolute;
  left: -50px;
  font-size: 18px;
  top: -3px;
  @include font_color("check_left");
}

.toggle:after {
  content: "PM";
  position: absolute;
  right: -48px;
  font-size: 18px;
  top: -3px;
  @include font_color("check_right");
}

.toggle__handler {
  display: inline-block;
  position: relative;
  z-index: 1;
  top: 3px;
  left: 3px;
  width: 44px;
  height: 44px;
  background-color: #ffcf96;
  border-radius: 50px;
  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  -webkit-transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.toggle__handler .crater {
  position: absolute;
  background-color: #e8cda5;
  opacity: 0;
  -webkit-transition: opacity 200ms ease-in-out;
  transition: opacity 200ms ease-in-out;
  border-radius: 100%;
}

.toggle__handler .crater--1 {
  top: 18px;
  left: 10px;
  width: 4px;
  height: 4px;
}

.toggle__handler .crater--2 {
  top: 28px;
  left: 22px;
  width: 6px;
  height: 6px;
}

.toggle__handler .crater--3 {
  top: 10px;
  left: 25px;
  width: 8px;
  height: 8px;
}

.star {
  position: absolute;
  background-color: #fff;
  -webkit-transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  border-radius: 50%;
}

.star--1 {
  top: 10px;
  left: 35px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--2 {
  top: 18px;
  left: 28px;
  z-index: 1;
  width: 30px;
  height: 3px;
}

.star--3 {
  top: 27px;
  left: 40px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--4,
.star--5,
.star--6 {
  opacity: 0;
  -webkit-transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.star--4 {
  top: 16px;
  left: 11px;
  z-index: 0;
  width: 2px;
  height: 2px;
  -webkit-transform: translate3d(3px, 0, 0);
  transform: translate3d(3px, 0, 0);
}

.star--5 {
  top: 32px;
  left: 17px;
  z-index: 0;
  width: 3px;
  height: 3px;
  -webkit-transform: translate3d(3px, 0, 0);
  transform: translate3d(3px, 0, 0);
}

.star--6 {
  top: 36px;
  left: 28px;
  z-index: 0;
  width: 2px;
  height: 2px;
  -webkit-transform: translate3d(3px, 0, 0);
  transform: translate3d(3px, 0, 0);
}

input:checked + .toggle {
  background-color: #749dd6;
}

input:checked + .toggle:before {
  //   color: #fff;
}

input:checked + .toggle:after {
  //   color: #749dd6;
}

input:checked + .toggle .toggle__handler {
  background-color: #ffe5b5;
  -webkit-transform: translate3d(40px, 0, 0) rotate(0);
  transform: translate3d(40px, 0, 0) rotate(0);
}

input:checked + .toggle .toggle__handler .crater {
  opacity: 1;
}

input:checked + .toggle .star--1 {
  width: 2px;
  height: 2px;
}

input:checked + .toggle .star--2 {
  width: 4px;
  height: 4px;
  -webkit-transform: translate3d(-5px, 0, 0);
  transform: translate3d(-5px, 0, 0);
}

input:checked + .toggle .star--3 {
  width: 2px;
  height: 2px;
  -webkit-transform: translate3d(-7px, 0, 0);
  transform: translate3d(-7px, 0, 0);
}

input:checked + .toggle .star--4,
input:checked + .toggle .star--5,
input:checked + .toggle .star--6 {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

input:checked + .toggle .star--4 {
  -webkit-transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

input:checked + .toggle .star--5 {
  -webkit-transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

input:checked + .toggle .star--6 {
  -webkit-transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
</style>
