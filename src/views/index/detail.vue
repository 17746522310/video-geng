<template>
  <div class="detail-wrap">
    <headtitle :title="headtitle" :back="back"></headtitle>
    <div class="detail-video-box">
        <video id="detailVideo" webkit-playsinline playsinline="true" preload="none" :controls="controls" 
        :src="detailInfo.videoUrl"></video>
        <div class="cover" :class="{hide:isPlay}" :style="{backgroundImage: 'url('+detailInfo.videoImageUrl+')'}"></div>
        <div class="play-btn" :class="{hide:isPlay}" v-on:click="videoPlay()"></div>
    </div>
    <!-- <div class="wrapper" ref="wrapper" style="backgroundImages:url(http://img.kaiyanapp.com/595b22ce0c71d4f82a8cb88522053c75.jpeg?imageMogr2/quality/60/format/jpg)"> -->
    <div class="wrapper" ref="wrapper" :style="{backgroundImage:'url('+ detailInfo.videoInfoBg +')'}">
        <div class="content">
            <div class="detail-video-info">
                <div class="video-info-box">
                    <h1>{{detailInfo.videoName}}</h1>
                    <p>{{detailInfo.videoPlayTime}}</p>
                    <div class="vedio-desc">{{detailInfo.videoIntroduction}}</div>
                </div>
                <div class="video-review-box">
                    <div class="header">热门评论</div>
                    <div class="video-review-list">
                        <div v-if="reviewList.length > 0">
                            <div class="review-item"  v-for="item in reviewList" :key="item.id">
                                <div class="review-avatar" style="backgroundImage:url(http://img.kaiyanapp.com/231870dcc13e098d31bf551b07b7558f.jpeg?imageMogr2/quality/60/format/jpg)"></div>
                                <!-- <div class="review-avatar" :style="{backgroundImage: 'url('+item.useravatar+')'}"></div> -->
                                <div class="review-info-box">
                                    <p class="username">{{item.userNickName}}</p>
                                    <p class="time">{{item.createDate}}</p>
                                    <p class="text">{{item.content}}</p>
                                </div>
                                <div class="like">
                                    <div class="like-count">{{item.star}}</div>
                                    <div class="like-icon"></div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="noreview" @click="onComment()">还没有评论,快去评论吧~</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="video-cover-blurred" :style="{backgroundImage:'url('+ detailInfo.infobgurl +')'}"></div> -->
    </div>
    <div class="detail-footer">
        <div @click="flagFavorite()"> 
            <img class="collect-icon" :src="isCollect? imgUrl : imgUrlOff" alt="">
            <!-- <img class="collect-icon" :src="'../assets/images/collect-icon-'+on+'.png'">  -->
            <span>收藏</span>
        </div>
        <div @click="onComment()">去评论</div>
    </div>
    <toast :toastOptions="toastOptions" ref="toast"></toast>
  </div>
</template>

<script>
import imgUrl from '@/assets/images/collect-icon-on.png'
import imgUrlOff from '@/assets/images/collect-icon-off.png'

import Axios from 'axios'
import BScroll from 'better-scroll'
import headtitle from '../title.vue'
import toast from '@/components/toast'
import { constants } from 'fs';
import * as apiUrl from "@/common/apiUrl.js";

export default {
  name: "indexdetail",
  components:{
    headtitle,
    toast
  },
  data: function(){
      return {
        headtitle:"详情",
        back: true,
        detailInfo:'',
        reviewList: [],
        _dom: '',
        controls: false,
        isPlay: false,
        isCollect: false,
        imgUrl,
        imgUrlOff, 
        params:{
            videoId:'',
            userId:''
        },
        toastOptions:{}
      }
  },
  created(){
    this.params.videoId = this.$route.query.id;
    this.params.userId = this.$store.state.userinfo ? JSON.parse(this.$store.state.userinfo).userId : 'noLogin';
  },
  mounted() {
    this.getVideoDetail();
    this.getReview();
    this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
            bounce: {
                top: true,
                bottom: true,
                left: false,
                right: false
            }
        })
    })
    
  },
  methods: {
    getVideoDetail:function(){
        Axios
        .get(apiUrl.api_test_url +'lnVideo/findById/'+this.params.videoId+'/'+ this.params.userId)
        .then((res)=>{
            var data = res.data;
            if(data.success){
                this.detailInfo = data.video;
                if(data.video.isCollecttion === 'Y'){
                    this.isCollect = true;
                }
            }
        })
    },
    getReview:function(){
        Axios
        .get(apiUrl.api_test_url+'lnVideo/findCommentsByVideoId/'+this.params.videoId)
        .then((res)=>{
            var data = res.data;
            if(data.success){
                this.reviewList = data.comments;
            }
        })
    },
    videoPlay:function(){
        this._dom = document.getElementById('detailVideo');
        this.isPlay = !this.isPlay;
        this.controls = true;
        this._dom.play();
    },
    flagFavorite(){
        if(this.params.userId ==='noLogin'){
            this.showToast({
                content:"您还没有登录，去登录~",
                callback: ()=>{
                    this.$router.push({name: 'login'})
                }
            });
            return;
        }
        if(this.isCollect){
            Axios
            .delete(apiUrl.api_test_url+'lnVideo/deleteUserVideo/'+ this.params.userId +'/'+ this.params.videoId)
            .then((res)=>{
                var data = res.data;
                if(data.success){
                    this.isCollect = false;
                    this.showToast({
                        content:"以取消收藏"
                    });
                }
            })
        }else{
            Axios
            .put(apiUrl.api_test_url+'lnVideo/saveUserVideo',{
                userId: this.params.userId,
                videoId: this.params.videoId
            })
            .then((res)=>{
                var data = res.data;
                if(data.success){
                    this.isCollect = true;
                    this.showToast({
                        content:"收藏成功"
                    });
                }
            })
        }
    },
    onComment(){
        if(this.params.userId === 'noLogin'){
            this.showToast({
                content:"您还没有登录，去登录~",
                callback: ()=>{
                    this.$router.push({name: 'login',query:{'backComponentName':'indexdetail','id': this.params.videoId}})
                }
            });
        }else{
            this.$router.push({path: '/comment', query:{'id': this.params.videoId}})
        }
        
    },
    showToast(obj){
        this.$refs.toast.showTips();
        this.toastOptions = obj;
    },
  }
};
</script>
<style lang="less" scoped>
    h1, p {
        line-height: 1.5;
    }
    .detail-wrap{   
        padding-top:40px;
        height: 100%;
        .detail-video-box{
            background: #000;
            height: 210px;
            overflow: hidden;
            position: relative;
            left: 50%;
            -webkit-transform: translate(-50%);
            transform: translate(-50%);
            width: 100%;
            video{    
                display: inline-block;
                *display: inline;
                *zoom: 1;
                height: 100%;
                position: absolute;
                width: 100%;
                left: 0;
                z-index: 1;
            }
            .cover{
                height: 100%;
                position: absolute;
                width: 100%;
                left: 0;
                background-position: bottom;
                background-repeat: no-repeat;
                background-size: cover;
                z-index: 2;
            }
            .cover.hide{ display: none;}
            .play-btn.hide{ display: none;}
            .play-btn{
                height: 100%;
                position: absolute;
                width: 100%;
                left: 0;
                background-color: rgba(0,0,0,.15);
                background-image: url(//static.kaiyanapp.com/eyepetizer-web/assets/images/detail/icon_play@2x.53ec01f2.png);
                background-position: 50%;
                background-repeat: no-repeat;
                background-size: 40px 40px;
                cursor: pointer;
                -webkit-transition: background-color .5s;
                        transition: background-color .5s;
                z-index: 3;
            }
        }
        .wrapper{
            // background-image: url("http://img.kaiyanapp.com/4721aee1249d815abbc2834e4b8bd58a.png?imageMogr2/quality/60/format/jpg");
            background-color: rgba(0, 0, 0, .5);
            width: 100%;
            position: absolute;
            top: 250px;
            bottom: 40px;  /*关键*/
            overflow: hidden;
            z-index: 1;
            background-size: cover;
            .content{
                
                overflow: hidden;
                .detail-video-info{
                    color:#fff;
                    .video-info-box{
                        // background: rgba(0,0,0,.2);
                        padding: 15px;
                        padding-bottom: 4px;
                        h1{
                            font-size: 20px;
                            margin: 0;
                            margin-bottom: 7px;
                        }
                        p{
                            margin: 0;
                            margin-bottom: 12px;
                        }
                        .vedio-desc {
                            margin-bottom: 11px;
                            font-weight: 300;
                            line-height: 20px;
                        }
                    }
                    .video-review-box{
                        // background: rgba(0,0,0,.4);
                        padding: 0;
                        overflow: hidden;
                        .header{
                            margin: 16px 0 10px;
                            text-align: center;
                        }
                        .video-review-list{
                            .review-item {
                                font-size: 12px;
                                padding-bottom: 15px;
                                position: relative;
                                .review-avatar{
                                    background-position: 50%;
                                    background-size: cover;
                                    border-radius: 50%;
                                    float: left;
                                    height: 36px;
                                    margin: 0 13px;
                                    width: 36px;
                                }
                                .review-info-box{
                                    margin-left: 62px;
                                    .username{   
                                        margin: 0;
                                        margin-bottom: 4px;
                                    }
                                    .time{
                                        margin-bottom: 4px;
                                        opacity: .6;
                                    }
                                    .text{
                                        margin-bottom: 15px;
                                        padding-right: 35px;
                                    }
                                }
                                .like{
                                    position: absolute;
                                    text-align: right;
                                    top: 0;
                                    right: 16px;
                                    div{
                                        display: inline-block;
                                    }
                                    .like-icon{
                                        background-image: url(//static.kaiyanapp.com/eyepetizer-web/assets/images/detail/icon_like_grey@3x.d2a2a2a8.png);
                                        background-position: 50%;
                                        background-size: cover;
                                        height: 15px;
                                        width: 15px;
                                        margin-left:3px;
                                    }
                                }
                            }
                            .noreview{
                                text-align: center;
                                padding: 15px 10px 30px;
                                font-size: 12px; 
                                opacity: .8;
                            }
                        }
                    }
                    
                }
                
            }
            // .video-cover-blurred {
                //     background-position: 50%;
                //     background-size: 100% 100%;
                //     height: 100%;
                //     position: absolute;
                //     top: 0;
                //     -webkit-transform: rotate(180deg) scaleX(-1);
                //             transform: rotate(180deg) scaleX(-1);
                //     width: 100%;
                //     z-index: -10;
            // }
        }
        .detail-footer{
            position: fixed;
            left:0;
            right:0;
            bottom:0;
            height: 40px;
            z-index:10;
            display: flex;
            width:100%;
            background: #333;
            color: #fff;
            // justify-items: center;
            justify-content : space-between;
            div{ 
                margin:0 30px;
                line-height: 30px;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-around;
                align-items: center;
                span{
                    line-height: 16px;
                    margin-top: 1px;
                    margin-left: 2px;
                }
                .collect-icon{
                    width:20px;
                    height: 20px;
                    // display: inline-block;
                    // margin-top:3px;
                }
            }

        }
        
    }
</style>
