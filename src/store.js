import Vue from "vue";
import Vuex from "vuex";
import { stat } from "fs";

Vue.use(Vuex);

const key = 'user'
const isLogin = 'isLogin'
export default new Vuex.Store({
  //设置属性
  state: {
    // isLogin: '0',
    // userId: '',
    // user: '',
    // count: 0,
    //获取token
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    userinfo: sessionStorage.getItem('userinfo') ? sessionStorage.getItem('userinfo') : '',
    navname: 'index'
  },
  getters: {
    getStorage: function (state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
        state.isLogin = localStorage.getItem(isLogin)
      }
      return state.user
    }
  },
  mutations: {
    set_token(state, value) {
      // sessionStorage('token',value);
      state.token = value
    },
    set_userinfo(state, value) {
      // sessionStorage('userinfo', value);
      state.userinfo = value;
      // state.userinfo = JSON.stringify(value)
    },
    set_navname(state, name) {
      state.navname = name;
    },

    $_setStorage(state, value) {
      state.user = value,
        console.log(state.user)
      localStorage.setItem(key, JSON.stringify(value));
    },
    $_setLogin(state, value) {
      state.isLogin = value
      localStorage.setItem(isLogin, value)
    },
    $_removeStorage(state) {
      state.user = null
      localStorage.removeItem(key)
    },

    userStatus(flag) {
      state.isLogin = flag;
    }
  }
  // //获取属性的状态
  // getters:{
  //   //获取登录状态
  //   isLogin: state => state.isLogin,
  // },
  // //设置属性状态
  // mutations: {
  //   userStatus(state, flag){
  //     state.isLogin = flag
  //   },
  // },
  // //应用mutations
  // actions: {
  //   userLogin({commit}, flag){
  //     commit("userStatus", flag)
  //   },
  // }
});
