import Vue from "vue";
import store from "./store";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "summarize",
      component: () => import("./views/summarize/summarize.vue"),
      meta: {
        index: 0
      }
    },
    {
      path: "/wisdomThings",
      name: "wisdomThings",
      component: () => import("./views/wisdomThings/wisdomThings.vue"),
      meta: {
        index: 1
      }
    },
    {
      path: "/filesDispose",
      name: "filesDispose",
      component: () => import("./views/filesDispose/filesDispose.vue"),
      meta: {
        index: 2
      }
    },
    {
      path: "/intelligentAnalytics",
      name: "intelligentAnalytics",
      component: () =>
        import("./views/intelligentAnalytics/intelligentAnalytics.vue"),
      meta: {
        index: 3
      }
    },
    {
      path: "/mapiframe",
      name: "map-iframe",
      component: () => import("./views/map/map-iframe.vue"),
      // component: () => import("./views/wisdomThings/wisdomThings.vue"),
      meta: {
        index: 4
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  store.commit("setPageIndex", to.meta.index);
  next();
});
export default router;
