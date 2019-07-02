<template>
  <div class="comment-page">
    <headtitle :back="back" :title="title"></headtitle>
    <textarea class="comment-textarea" name="" id="" v-model="param.content" maxlength="30"></textarea>
    <div class="comment-count">{{wordNum}} / 30</div>
    <cube-button :primary="true" @click="onSaveComment">发布评论</cube-button>
    <toast :toastOptions="toastOptions" ref="toast"></toast>
  </div>
</template>

<script>
import axios from 'axios'
import headtitle from '../title.vue'
import toast from '@/components/toast'
import { constants } from 'fs';
import * as apiUrl from "@/common/apiUrl.js";

export default {
  name: "comment",
  components:{
    headtitle,
    toast
  },
  data: function(){
    return {
       back:true,
       title:'评论',
       userInfo:'',
       toastOptions:{},
       param:{
          videoId:'',
          userId:'',
          userNickName:'',
          content:''
       }
    }
  },
  mounted(){
    this.param.videoId = this.$route.query.id;
    this.getUserInfo();
  },
  computed:{
    wordNum:function(){
        return this.param.content.length;
    }
  },
  methods:{
    getUserInfo(){
        this.userInfo = JSON.parse(this.$store.state.userinfo);
        this.param.userId = this.userInfo.userId,
        this.param.userNickName = this.userInfo.userName
    },

    onSaveComment(){
        if(this.param.content =='' || this.param.content.length>30){
          this.showToast({
            content: "请输入评论内容"
          })
          return;
        }
        console.log(this.param);
        axios
        .put(apiUrl.api_test_url+'lnVideo/saveComments',{
            userId: this.param.userId,
            videoId: this.param.videoId,
            userNickName: this.param.userNickName,
            content: this.param.content
        })
        .then((res)=>{
            if(res.data.success){
                this.showToast({
                    content:"发布评论成功",
                    callback: ()=>{
                      this.$router.go(-1);
                    }
                })
                this.param.content ='';
            }
        })
        .catch((res)=>{
            console.log(res);
        })
    },
    showToast(obj){
        this.$refs.toast.showTips();
        this.toastOptions = obj;
    }
  }
};
</script>
<style lang="less" scoped>
.comment-page {
    padding: 50px 15px 0;
    .comment-textarea{
        width:100%;
        height: 100px;
        line-height: 20px;
        padding:5px 15px;
        border:1px solid #ccc;
        box-sizing:border-box;
        margin-bottom: 5px;
    }
    .comment-count{
      text-align: right;
      margin-bottom: 10px;
    }
    
}
</style>
