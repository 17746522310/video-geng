import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'amfe-flexible';
import axios from 'axios';
import 'we-vue/lib/style.css' // 按需引入时也需要引入此样式
import {Picker, SearchBar, Textarea,Dialog,Toast,Cell} from 'we-vue'

import {
  Style,
  Slide,
  Button,
  Input,
} from 'cube-ui'
Vue.use(Slide)
Vue.use(Button)
Vue.use(Input)
Vue.use(Picker).use(SearchBar).use(Textarea).use(Cell)
Vue.config.productionTip = false;


Vue.prototype.$axios = axios;
// Vue.prototype.confirmDialog = confirmDialog;
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let getFlag = window.sessionStorage.getItem("token");
  // console.log('main.js判断token的值='+ getFlag)
  if(getFlag){
    if(to.path === '/login'){
      //登录状态下访问login.vue页面 会调到index.vue
      // console.log('您以登录')
      next({path:'/'})
    }else{
      next()
    }
  }else{
    //如果没有token，访问任何页面，都会进入登录页
    if(to.path ==='/login'){//如果是登录页面的话，直接next()-->解决注销后的循环执行bug
      next();
    }else if(to.path ==='/mycollect' || to.path ==='/comment'){//否则 跳转到登录页面
      // console.log('请先登录！');
      next({path: '/login'})
    }else{
      next()
    }
  }

});
