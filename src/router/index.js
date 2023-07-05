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

const router = new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false, // false表示不需要登录
      },
    },
    {
      path: "/main",
      name: "MainPage",
      component: MainPage,
      meta: {
        requiresAuth: true,
      },
    },
    // sys后台模块
    {
      path: "/editor",
      name: "editor",
      component: loadView("sysEditor/editorIndex"),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/editor/num",
          name: "num",
          component: loadView("sysEditor/num"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/editor/authorpage",
          name: "authorpage",
          component: loadView("sysEditor/authorPage"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/editor/messagepage",
          name: "messagepage",
          component: loadView("sysEditor/messagePage"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/editor/commentpage",
          name: "commentpage",
          component: loadView("sysEditor/commentPage"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/editor/classification",
          name: "classification",
          component: loadView("sysEditor/classifiCation"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/editor/timeline",
          name: "timeline",
          component: loadView("sysEditor/timeLine"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/editor/dailycase",
          name: "dailycase",
          component: loadView("sysEditor/dailycase"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    // 前台
    {
      path: "/index",
      name: "index",
      component: index,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "/homepage",
          name: "homePage",
          component: loadView("homePage/homePage"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/about",
          name: "About",
          component: loadView("about"),
        },
        {
          path: "/article",
          name: "Article",
          component: loadView("homePage/article"),
        },
        {
          path: "/timeline",
          name: "timeLIne",
          component: loadView("timeLIne"),
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

// 路由拦截，判断是否需要登录
router.beforeEach((to, from, next) => {
  // console.log(to.query);
  // 通过requiresAuth判断当前路由导航是否需要登录
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let token = sessionStorage.getItem("access_token");
    // console.log("token", token);
    // 若需要登录访问，检查是否为登录状态
    if (!token) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
    // next();
  } else {
    next(); // 确保一定要调用 next()
  }
});

export default router;
