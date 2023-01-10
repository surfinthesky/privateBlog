import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login/loginIndex";
import MainPage from "../components/MainPage.vue";
import index from "@/views/index";
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
      name: "login",
      component: Login,
    },
    {
      path: "/main",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/editor",
      name: "editor",
      component: loadView("sysEditor/editorIndex"),
      children: [
        {
          path: "/editor/num",
          name: "num",
          component: loadView("sysEditor/num"),
        },
        {
          path: "/editor/authorpage",
          name: "authorpage",
          component: loadView("sysEditor/authorPage"),
        },
      ],
    },
    {
      path: "/index",
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
