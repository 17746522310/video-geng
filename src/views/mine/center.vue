<template>
<div class="center-page">
    <div class="userinfo-box">
        <div v-if = "!islogin">
            <img class="userinfo-avatar" src="@/assets/default-avatar.jpg" alt="">
            <router-link class="usernickname" tag="div" to="/login">您还没有登录，去登陆~</router-link>
        </div>
        <div v-else>
            <router-link class="usereditlink" tag="div" to="/outlogin">
                <img class="userinfo-avatar" :src="userinfo.userImageUrl" alt="">
                <img class="userNameEdit" src="@/assets/mine/chatedit.png">
            </router-link>
            <router-link class="usernickname" tag="div" to="/outlogin">
                {{userinfo.userName}}
                {{userinfo.name}}
            </router-link>
        </div>
       
    </div>
    <ul class="userinfo-list">
        <router-link class="userinfo-item" to="/mycollect" tag="div">
            <img src="@/assets/mine/mine-icon4.png" width="20" height="20" alt="">
            <div class="userinfo-word">我的收藏</div>
        </router-link>
        <!-- <router-link class="userinfo-item" to="/" tag="div">
            <img src="@/assets/mine/mine-icon3.png" width="20" height="20" alt="">
            <div class="userinfo-word">我的点评</div>
        </router-link> -->
        <!-- <div class="userinfo-item" @click="del()">
            <img src="@/assets/mine/mine-icon1.png" width="20" height="20" alt="">
            <div class="userinfo-word">confirm测试</div>
        </div>
        <div class="userinfo-item" @click="showToast()">
            <img src="@/assets/mine/mine-icon1.png" width="20" height="20" alt="">
            <div class="userinfo-word">confirm测试</div>
        </div>
         <div class="userinfo-item" @click="showToast()">
            <img src="@/assets/mine/mine-icon1.png" width="20" height="20" alt="">
            <div class="userinfo-word">confirm测试</div>
        </div> -->
    </ul>
    <headnav></headnav>
    <d-confirm v-bind:confirmModalOptions="confirmOptions" ref="myConfirm"></d-confirm>
    <toast :toastOptions="toastOptions" ref="toast" ></toast>
</div>
</template>

<script>
import axios from 'axios'
import { constants } from 'fs';
import  DConfirm from '../../components/confirm';
import toast from '../../components/toast'
import headnav from '@/views/headnav.vue'

export default {
  name: "center",
  components:{
    DConfirm,
    toast,
    headnav
  },
  data: function(){
      return {
          islogin: false,
          userinfo: {},
          confirmOptions:{},
          toastOptions:{
          }
      }
  },
  mounted(){
    this.getUserinfo();
  },
  methods:{
      getUserinfo(){
        if(this.$store.state.token && this.$store.state.userinfo){
            this.islogin = true;
            var info = JSON.parse(this.$store.state.userinfo);
            this.userinfo = info;
        }else{
            this.islogin = false;
        }
      },
      del(){
        this.$refs.myConfirm.showModel();
        this.confirmOptions= {
            type: "warning",//warning
            message: "文字内容",//""
            btnSubmitFunction: function () {
                alert("确定")
            },
            btnCancelFunction: function () {
                alert("取消")
            }
        }
      },
      showToast(){
          this.$refs.toast.showTips();
          this.toastOptions = {
              content: 'center提交成功', //提示文本
              callback: ()=>{     //提示回调函数
                  this.$router.go(-1);
              },
              time: 1500  //提示显示ms毫秒数
          }  
      }
  }
};
</script>
<style lang="less" scoped>
    .center-page{ 
        background: #fff;
        overflow: hidden;
        .userinfo-box{
            height: 200px;
            overflow: hidden;
            .userinfo-avatar{ 
                display:block;
                width:60px;
                height:60px;
                margin: 50px auto 30px;
                border-radius: 50%;
                overflow: hidden;
            }
            .usernickname{ 
                font-size: 14px; 
                text-align: center;
            }
            .usereditlink{
                position: relative;
                width:60px;
                margin-left:auto;
                margin-right: auto;
                .userNameEdit{
                    position: absolute;
                    bottom: 0;
                    right:0;
                    width: 20px;
                }
            }
        }
        .userinfo-list{
            padding: 0 20px;
            .userinfo-item{
                height: 40px;
                display: flex;
                align-items : center; 
                .userinfo-word{
                    // height: 40px; 
                    // line-height: 40px;
                    margin-left: 15px;
                }
            }
        }
    }
</style>
