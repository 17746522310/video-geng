<template>
  <div class="collect-page">
      <headtitle :title="title" :back="true"></headtitle>
		<scroll class="scroll" ref="scroll"  
            :listenScroll="false"
            :pullup="true"
            :data="queryResult"
            @scrollToEnd="scrollToEnd">
			<!--内容...-->
            <div>   
                <router-link class="collect-item" :to="{path:'/detail', query: {id:item.id}}" tag="div" v-for="item in queryResult" :key="item.id">
                    <div class="collect-img-box">
                        <img class="collect-img" :src="item.videoImageUrl" alt="">
                    </div>
                    <div class="collect-info">
                        <div class="collect-name">{{item.videoName}}</div>
                        <div>{{item.videoPlayTime}}</div>
                    </div>
                </router-link>
                <loadmore v-show="showMore"></loadmore>
                <div v-show="!queryResult.length && !this.showMore">暂无收藏</div>
            </div>
		</scroll>
  </div>
</template>

<script>
import axios from 'axios'
import headtitle from '../title.vue'
import loadmore from '@/components/loadmore.vue'
import scroll from '@/components/scroll.vue'
import BScroll from 'better-scroll'
import { constants } from 'fs';
import * as apiUrl from "@/common/apiUrl.js";
export default {
  name: "mycollect",
  components:{
    headtitle,
    loadmore, 
    scroll
  },
  data: function(){
      return {
        title:'收藏列表',
        back: true,
        queryResult: [],
        showMore: true,
        total: 0,
        params:{
            page:1,
            size:6,
            userId:''
        },
      }
  },
  mounted(){
      this.params.userId = JSON.parse(this.$store.state.userinfo).userId;
      this.scrollToEnd();
  },
  methods:{
    scrollToEnd(){
        if( this.queryResult.length >= this.total && this.total !=0){
            this.showMore = false;
            return;
        }
        axios
        .get(apiUrl.api_test_url + 'lnVideo/listUserVideo/' + this.params.page+'/'+this.params.size,{
            params: {
                userId: this.params.userId 
            } 
        })
        .then((res)=>{
            var data = res.data;
            if(data.success){
                this.total = data.queryResult.total;
                if(this.total <= this.params.size *this.params.page ){
                    this.showMore = false;
                }
                this.params.page ++ ;
                let list = data.queryResult.list;
                this.queryResult = this.queryResult.concat(list);  

            }
        })
    },
    getList () {
        axios
        .get('http://iot.smart-ideas.com.cn/ssgy/lnVideo/listUserVideo/'+this.param.page+'/'+this.param.size,{
            params: {
                userId: this.params.userId 
            }
        })
        .then((res)=>{
            this.isload = false;
            var data = res.data;
            if(data.success){
                this.queryResult = data.queryResult.list;
                console.log(this.queryResult)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },
  }
};
</script>
<style lang="less" scoped>
.collect-page {
    padding: 50px 15px 10px;
    /*通过fixed固定mescroll的高度*/
    .scroll {
        position: fixed;
        top: 44px;
        bottom: 10px;
        height: auto;
    
        .collect-item{
            padding: 15px 0;
            display: flex;
            .collect-img-box{
                width: 120px;
                height: 100px;
                overflow: hidden;
                position: relative;
                .collect-img{
                    position: relative;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    transform-origin:50% 50%;
                    display: block;
                    width: auto;
                    height: 100px;
                }
            }
            .collect-info{
                margin-left:15px;
                flex: 1;
                .collect-name{
                    height: 48px;
                    line-height: 24px;
                    overflow: hidden;
                    font-size: 16px;
                    margin-bottom: 4px;
                }
            }
            
        }
    }
}
</style>
