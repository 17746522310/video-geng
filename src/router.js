import Vue from "vue";
import Router from "vue-router";
import index from "./views/index/list.vue";
import login from "./views/mine/login.vue";
import outlogin from "./views/mine/outlogin.vue";
import search from './views/index/search.vue'
import mycollect from './views/mine/mycollect.vue'
import comment from './views/index/comment'
import usescroll from './views/index/usescroll'
// import indexdetail from "./views/index/detail.vue";
// import center from './views/mine/center.vue'
import nuxt from './views/graphic/test.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: index,
      meta:{
        keepAlive:true,
        isLogin: true
      }
    },{
      path: "/detail",
      name: "indexdetail",
      component: () =>
        import( "./views/index/detail.vue"),
      meta:{
        needLogin: true,
        keepAlive: false
      }
    },
    {
      path: "/center",
      name: "center",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/mine/center.vue"),
      meta:{
        keepAlive: false
      }
    }, 
    {
      path: "/graphicList",
      name: "graphicList",
      component:()=>import("./views/graphic/graphic-list.vue"),
      meta:{
        keepAlive: true
      }
    },
    // {
    //   path: "/test",
    //   name: "test",
    //   component: () =>
    //   import("./views/index/test.vue"),
    //   meta:{
    //     keepAlive: true
    //   }
    // },
    {
      path: "/login",
      name: "login",
      component: login,
      meta:{
        isLogin: false
      }
    },
    {
      path: "/outlogin",
      name: "outlogin",
      component: outlogin,
      meta:{
        isLogin: false
      }
    },
    {
      path: "/search",
      name: "search",
      component: search,
      meta:{
        isLogin: false
      }
    },
    {
      path: "/mycollect",
      name: "mycollect",
      component: mycollect,
      meta:{
        isLogin: true
      }
    },
    {
      path: "/comment",
      name: "comment",
      component: comment,
      meta:{
        isLogin: true
      }
    },
    {
      path: "/usescroll",
      name: "usescroll",
      component: usescroll,
      meta:{
        isLogin: false
      }
    },
    {
      path: "/nuxt",
     
      component: nuxt,
      meta:{
        isLogin: false
      }
    }
    // {
    //   path: '*', component: NotFoundComponent
    // }
  ]
});
