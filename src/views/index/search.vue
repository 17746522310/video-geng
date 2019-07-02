<template>
    <div class="search-page">
        <div class="search-box">
            <input class="search-input" :placeholder="placeholder" v-model.trim="query" type="text">
            <span class="search-cancle" @click="onCancle()">取消</span>
        </div>
        <!-- 热门搜索 -->
        <ul class="hot-list"  v-show="!hasResult">
            <div>热门搜索</div>
            <ul>    
                <li class="hot-item"><span>美食</span></li>
                <li class="hot-item"><span>地铁枢纽</span></li>
            </ul>
        </ul>
        <!--搜索历史 -->
        <div v-if="seaHis.length>0">
            <ul class="hot-list"  v-show="!hasResult">
                <div>搜索历史 <img class="del" src="@/assets/images/del.png" @click="delHistory()" alt=""> </div>
                <ul>   
                    <li class="hot-item" v-for="(item,index) in seaHis" :key="index" @click="historyHandler(item.name)">
                        <span>{{item.name}}</span>    
                    </li> 
                </ul>
            </ul>
        </div>
        <!-- 搜索结果 -->
        <ul class="result-list" v-show="hasResult">
            <li  class="result-item" v-for="(item) in queryResult" :key="item.id" @click="toDetail(item.id)">
                {{item.videoName}}
            </li>
            <li class="noResult" v-show="!queryResult.length">未找到搜索结果</li>
        </ul>
        <my-dialog v-bind:confirmModalOptions="confirmOptions" ref="myConfirm"></my-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { constants } from 'fs';
import myDialog from '@/components/confirm.vue'
import * as apiUrl from "@/common/apiUrl.js";

export default {
  name: "search",
  components:{
    // headtitle
    myDialog
  },
  data: function(){
      return {
        placeholder:'搜索视频',
        query:'',
        queryResult: [],
        hasResult: false,
        page:1,
        size:2,
        seaHis:[],
        userInfo:{},
        confirmOptions:{

        }
      }
  },
  watch:{
    query(){
        if(this.query == ''){
            this.hasResult = false;
            this.queryResult =[];
            return;
        }
        axios
        .get(apiUrl.api_test_url+'lnVideo/list/'+this.page+'/'+this.size,{
            params: {
                videoName: this.query
            }
        })
        .then((res)=>{
            this.queryResult =[];
            var data = res.data;
            this.hasResult = true;
            var list = data.queryResult.list;
            var resList = this.queryResult;
            for(var key in list){
                resList.push(list[key]);
            }
            this.queryResult = resList;
        })
        .catch((err) => {
            console.log(err)
        })
    }
  },
  mounted(){
      if(this.$store.state.userinfo){
        this.userInfo.userId = JSON.parse(this.$store.state.userinfo).userId;
        this.initHistory(this.userInfo.userId);
      }else{
        this.initHistory('tourists');
      }
  },
  methods:{
    initHistory(userId){
        var seaHis = window.sessionStorage.getItem('seaHis') ? JSON.parse(window.sessionStorage.getItem('seaHis')) : '';
        if(seaHis == '' || seaHis == 'undefined'){
            return;
        }else{
            this.showHistory(userId);
        }
    },
    toDetail(videoId){
        var obj ={}
        if(this.userInfo.userId){//userId存在，说明用户已登录
            obj = {userId: this.userInfo.userId, name: this.query};
        }else{//userId不存在，说明用户是游客状态
            obj ={userId: 'tourists', name: this.query}
        }
        //点击搜索结果时判断是否存储搜索记录
        var seaHis = JSON.parse(window.sessionStorage.getItem('seaHis')) || '';
        //定义是否存储状态 true：存储 
        var isStorage = true;
        var arr = [];
        
        for(var key in seaHis){
            //搜索记录相同时 存储状态改为false
            if(seaHis[key].name == obj.name){
                isStorage = false;
                break;
            }
            arr.push(seaHis[key])
        }
        //根据存储状态来判断是否存储
        if(isStorage){
            arr.unshift(obj);
            window.sessionStorage.setItem('seaHis',JSON.stringify(arr));
        }
        this.$router.push({path:'/detail', query: {id: videoId}})

    },
    showHistory(userId){
        // console.log('showHistory  id= ' + userId)
        var searchHistory = JSON.parse(window.sessionStorage.getItem('seaHis'));
        var arr = [];
        for(var key in searchHistory){
            if(searchHistory[key].userId === userId){
                arr.push(searchHistory[key])
            }
        }
        this.seaHis = arr;

    },
    historyHandler(name){
        this.query = name;
    },
    delHistory(){
        this.$refs.myConfirm.showModel();
        this.confirmOptions= {
            type: "warning",//warning
            message: "是否删除搜索历史？",//""
            btnSubmitFunction: ()=> {
               window.sessionStorage.removeItem('seaHis');
               this.showHistory();
            },
            btnCancelFunction: function () {
                
            }
        }
        
        
    },
    onCancle(){
        this.$router.go(-1);
    }

  }
};
</script>
<style lang="less" scoped>
   .search-page{
       padding:10px 15px 0;
       .search-box{
           background: #f1f3f5;
           padding: 5px;
           display: flex;
           .search-input{
               height: 30px;
               line-height: 30px;
               display: block;
               padding-left: 50px;
               flex: 1;
               background:#fff url(http://www.ruyutrip.com/img/mb_v2/list_icon.png)no-repeat 10px center;
               background-size: 15px 15px;
               &:focus{
                   outline: none
               }
           }
           .search-cancle{
               height: 30px;
               line-height: 30px;
               width:80px;
               text-align: center;
               color:#333;
           }
       }
       .hot-list{
           overflow: hidden;
           padding-top: 30px;
           div{
               font-size: 16px;
               padding-bottom: 20px;
               .del{
                   width:16px;
                   height:16px;
                   float: right;
                   margin-top:5px;
               }
           }
           .hot-item{
               display:inline-block;
               line-height: 22px;
               padding:3px 10px;
               background: #eee;
               margin-right: 15px;
               color:#999;
               border-radius: 4px;
               margin-bottom: 5px;
           }
       }
       .result-list{
           .result-item{
               height: 46px;
               line-height: 46px;
               border-bottom: 1px solid #eee;
               overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
           }
           .noResult{ 
               text-align: center;
               padding: 30px 15px;
           }
       }
   }
</style>
