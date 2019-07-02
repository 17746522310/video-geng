<template>
    <div class="index-page">
        <headtitle :title="headtitle" :search="search"></headtitle>
        <cube-slide
          class="slide-wrap"
          :auto-play="false"
          :data="items"
          ref="slide"
        >
          <cube-slide-item
            v-for="(item,index) in items"
            :key="index"
          >
            <img class="slide-img" :src="item.image">
          </cube-slide-item>
          <template slot="dots" slot-scope="props">
            <span
            class="my-dot"
            :class="{active: props.current === index}"
            v-for="(item,index) in props.dots"
            :key="index"
            >{{index+1}}</span>
          </template>
        </cube-slide>
        <div class="list-wrap">
            <div class="list-wrap-title">为你精选</div>  
            <scroll class="wrapper" ref="wrapper"
                :listenScroll="false"
                :pullup="true"
                
                :data="arrList"
                @scrollToEnd="scrollToEnd"
                @setScroll="setScroll"
                @beforeScroll = "beforeScroll"
            
                >
                <ul>
                    <li class="useitem" v-for="(item,i) in arrList" :key="i">{{item}}{{i}}</li>
                     <loadmore v-show="hasMore" :loadtitle="loadtitle"></loadmore>
                </ul>
                <!-- <lading></lading> -->
                
            </scroll>
        </div>
       
        <!-- <loading :isload="isload"></loading> -->
    </div>
</template>

<script>
import axios from 'axios'
import {Style,Slide} from 'cube-ui'
import headtitle from '../title.vue'
import loading from '@/components/loading.vue'
import loadmore from '@/components/loadmore.vue'
import BScroll from 'better-scroll'
// Vue.use(Style,Slide)
import { constants } from 'fs';
import * as apiUrl from "@/common/apiUrl.js";
import http from "@/common/http.js";
import Scroll from '@/components/scroll.vue'
export default {
  name: "usescroll",
  components:{
    headtitle,
    loading,
    Scroll,
    loadmore
  },
  data: function(){
      return {
        videos:[],
        headtitle:'首页视频',
        more: null,
        search: true,
        // isload: true,
        page:0,
        size:2,
        count:6,
        loadtitle: '加载中...',
        hasMore: true,
        items:[{
          url: 'http://www.didichuxing.com/',
          image:'http://39.96.201.228:4869/44a0b7a59796c1ddbc14b87eb8b0d31c'
        },{
          image:'http://39.96.201.228:4869/83924007a32036cf933b30eb33a2ae01'
        },{
          image:'http://39.96.201.228:4869/a6b0b59f57ea3fd8a4d4d7fdab6b78b6'
        },{
          image:'http://39.96.201.228:4869/18a22e79b05ef34b3b8017fc5f6d06b7'
        }],
        arrList:[
            
        ],
        scroll:null,
        arr1 :[
            "拼接内容",
            "拼接内容",
            "拼接内容",
            "拼接内容",
            "拼接内容",
            "拼接内容",
            "拼接内容",
            "拼接内容",
            "拼接内容",
            "拼接内容",
        ]
      }
  },
  created(){
    // this.isload = true;
    // this.getList();
  },
  mounted(){
    this.scrollToEnd()
  },
  methods:{
    scrollToEnd(){
        this.page ++;
        console.log(this.page);
        if(this.page >5){
            this.page = 5
            return;
        }
        this.arrList = this.arrList.concat(this.arr1);
        console.log("下拉到最底下");
    },
    setScroll(scroll){
        console.log('scroll创建成功'+scroll)
        this.scroll = scroll;
        // console.log("scroll创建成功");
    },
    // scroll(pos){
    //     console.log(pos);//监听滚动坐标
    // },
    beforeScroll(){
        console.log('滚动之前');
    }

    
  }
};
</script>
<style lang="less" scoped>
.index-page {
  padding-top: 40px;

    .slide-wrap {
      width: 100%;
      height: 150px;
      padding-bottom: 15px;
      overflow: hidden;
      margin-bottom: 25px;
      .cube-slide-item {
        padding: 0px 15px 10px;
        .slide-img {
          display: block;
          width: 100%;
          height: auto;
        }
      }
      .cube-slide-dots {
        bottom: -10px;
        height: 5px;
        .my-dot {
          width: 10px;
          height: 2px;
          margin-right: 10px;
          background: #ccc;
          &.active {
            background: #000;
            width: 20px;
          }
        }
      }
    }
    .list-wrap {
      padding: 0 15px 10px;
      box-sizing: border-box;
      .list-wrap-title {
        font-size: 18px;
        color: #000;
        padding: 10px 0 20px;
      }
      .wrapper{ 
        position: absolute;
        top:150px;
        bottom: 150px;
        left:0;
        right:0;
        overflow: hidden;
            .useitem{
                background: orchid;
                border-bottom: 1px solid olivedrab;
                height: 80px;
            }
      }
      .list-box {
        position: relative;
        background-position: 50%;
        background-size: cover;
        color: #fff;
        padding-bottom: 25px;
        cursor: pointer;
        // height: 225px;
        .list-img {
          width: 100%;
          height: 180px;
          background-position: 50%;
          background-size: cover;
        }
        .list-title {
          padding: 15px 0px 8px;
          color: #1a1a1a;
          font-size: 14px;
          font-weight: 400;
        }
        .list-desc {
          line-height: 18px;
          font-size: 12px;
          color: #999;
          // padding-bottom: 25px;
          letter-spacing: 1px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; //需要控制的文本行数
          overflow: hidden;
          // font-weight: 300;
          // word
        }
      }
    }
  
}
</style>
