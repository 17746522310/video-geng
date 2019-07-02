<template>
<div class="login-page">
    <headtitle :back="back" :title="title"></headtitle>
    <div class="login-box">
        <div class="login-input-title">请输入您的手机号</div>
        <cube-input v-model="tel" ></cube-input>
        <div class="login-input-title">请输入您的密码</div>
        <cube-input type='password' v-model="password" :eye="eye"></cube-input>
    </div>
    <cube-button :primary="true" @click="userLogin()">登录</cube-button>
</div>
</template>

<script>
import axios from 'axios'
import headtitle from '@/views/title.vue'
import { constants } from 'fs';

export default {
  name: "login",
  props:{

  },
  components:{
    headtitle
  },
  data: function(){
      return {
        title:'登录',
        back: true,
        tel:'',
        password:'',
        eye: {
            open: true,
            reverse: false
        }
      }
  },
  created(){
    //   this.backComponentName = this.$route.query;
  },
  methods:{
    userLogin:function(){
        axios
        .get('https://result.eolinker.com/L6yNRgD1148c81b2e7e7c37263f70b9d7b7e296dc4db322?uri=login',{
            params:{
                username: this.tel,
                password: this.password
            } 
        })
        .then((response) =>{
            var res =  eval("(" + response.data + ")").info;
            var len = res.length;
            var userNameArr = [];
            var passWordArr =[];
            var ses = window.sessionStorage;
            for(var i=0; i<len;i++){
                userNameArr.push(res[i].username);
                passWordArr.push(res[i].password);
            }
            if(userNameArr.indexOf(this.tel) === -1){
                alert('账号不存在！');
            }else{
                var index = userNameArr.indexOf(this.tel);
                if(passWordArr[index] === this.password){
                    //把token放在sessionStorage中
                    ses.setItem('token',JSON.stringify(res[index].token));
                    ses.setItem('userinfo', JSON.stringify(res[index].userinfo));
                    
                    this.$store.commit('set_token',JSON.stringify(res[index].token) );
                    this.$store.commit('set_userinfo',JSON.stringify(res[index].userinfo));
                    console.log('登录成功！跳到首页');    
                    this.$router.go(-1);
                    
                }else{
                    alert('密码错误')
                }
            }
            
        })
        .catch((err) => {
            console.log('链接数据库失败！')
        })
    }
  }
};
</script>
<style lang="less" scoped>
    .login-page{
        padding: 50px 15px 0;
        .login-box{
            padding-bottom: 40px;
            .login-input-title{ 
                font-size: 14px;
                padding: 30px 10px 10px;
            }
            .login-input{
                display: block;
                height: 38px;
                line-height: 38px;
                padding: 0 10px;
            }
        }
    }
</style>
