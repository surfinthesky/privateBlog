import Vue from "vue";
import Router from "vue-router";
import index from "@/views/index";
// import homePage from "@/views/homePage/homePage";
// import About from "@/views/about/index";
// import Archive from "@/views/Archive/index";
// import Music from "@/views/Music/index";
// import Others from "@/views/others/index";
// import Roast from "@/views/Roast/index";
// import Notes from "@/views/Notes/index";
import MainPage from "../components/MainPage.vue";
import testDemo from "../components/testDemo.vue";
export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve);
};
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index,
      children: [
        {
          path: "/homePage",
          name: "homePage",
          component: loadView("homePage/homePage"),
        },
        {
          path: "/about",
          name: "About",
          component: loadView("about"),
        },
        {
          path: "/archive",
          name: "Archive",
          component: loadView("Archive"),
        },
        {
          path: "/music",
          name: "Music",
          component: loadView("Music"),
        },
        {
          path: "/others",
          name: "Others",
          component: loadView("others"),
        },
        {
          path: "/roast",
          name: "Roast",
          component: loadView("Roast"),
        },
        {
          path: "/notes",
          name: "Notes",
          component: loadView("Notes"),
        },
      ],
    },
    {
      path: "/main",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/testDemo",
      name: "TestDemo",
      component: testDemo,
    },
  ],
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
