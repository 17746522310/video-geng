<template>
  <div class="index-page">
    <headtitle :title="headtitle" :search="search"></headtitle>
    <scroll class="wrapper" ref="wrapper"
      :listenScroll="false"
      :pullup="true"
      :data="videos"
      @scrollToEnd="scrollToEnd"              
      >
      <div>
        <cube-slide
          class="slide-wrap"
          :auto-play="false"
          :data="items"
          ref="slide"
          @change="changepage"
          >
          <cube-slide-item
            v-for="(item,index) in items"
            :key="index"
            @click.native="clickHandler(item,index)"
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
              <router-link
                :to="{path:'/detail', query: {id:item.id}}"
                tag="div"
                class="list-box"
                v-for="(item) in videos"
                :key="item.id"
              >
                <div class="list-img" :style="{ backgroundImage: 'url(' +item.videoImageUrl+ ')'}"></div>
                <div class="list-title">{{item.videoName}}</div>
                <div class="list-desc">{{item.videoIntroduction}}</div>
              </router-link>
              <loadmore v-show="hasMore"></loadmore>
              <div class="no-result-wrapper" v-show="!hasMore && !videos.length">
                <div title="抱歉，暂无内容"></div>
              </div>
        </div>  
        <loading :isload="isload"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import { constants } from 'fs';

import headtitle from '../title.vue'
import loading from '@/components/loading.vue'
import loadmore from '@/components/loadmore.vue'
import scroll from '@/components/scroll.vue'

import * as apiUrl from "@/common/apiUrl.js";
// import http from "@/common/http.js";
export default {
  name: "indexlist",
  components:{
    headtitle,
    loading,
    loadmore,
    scroll
  },
  data: function(){
      return {
        videos:[],
        headtitle:'首页视频',
        more: null,
        search: true,
        isload: false,
        hasMore: true,
        page:1,
        size:4,
        count:20,
        items:[
          {
            url: 'http://www.didichuxing.com/',
            image:'http://39.96.201.228:4869/44a0b7a59796c1ddbc14b87eb8b0d31c'
          },{
            image:'http://39.96.201.228:4869/83924007a32036cf933b30eb33a2ae01'
          },{
            image:'http://39.96.201.228:4869/a6b0b59f57ea3fd8a4d4d7fdab6b78b6'
          },{
          image:'http://39.96.201.228:4869/18a22e79b05ef34b3b8017fc5f6d06b7'
          }
        ]
      }
  },
  created(){
    this.isload = true;
    this.scrollToEnd();
  },
  methods:{
    scrollToEnd(){
        if(this.videos.length >= this.count){
          this.hasMore = false;
          return;
        }
        axios
        .get(apiUrl.api_test_url+'lnVideo/list/'+this.page+'/'+this.size)
        .then((res)=>{
          let data = res.data;         
          if(data.success){
            let list = data.queryResult.list;
                this.page++;
                this.videos = this.videos.concat(list);    
          }
          this.isload = false;
        })
        .catch((err) => {
            console.log(err)
        })
    },
    changepage(current){
      console.log(current);
    },
    clickHandler(item,index){
      console.log(item,index)
    }
  }
};
</script>
<style lang="less" scoped>
.index-page {
  padding-top: 40px;
  .wrapper{ 
    position: absolute;
    top:50px;
    bottom: 50px;
    left:0;
    right:0;
    overflow: hidden;
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
}
</style>
