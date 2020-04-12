<template>
    <div class="graphic-page">
        <scrollview class="graphic-scroll">
            <div class="graphic-nav-content" ref="cont">
                <div ref="nav" class="graphic-list-nav border-bottom">
                    <span v-for="(item,index) in classify" :class="classifyCurrent === item.itemName ? 'active': ''" @click="getlist(item.itemName)" :key="item.index">
                          {{item.itemWord }}
                    </span>
                </div>
            </div>
        </scrollview>
        
        <div class="graphic-list-wrap">
            <block-list v-for="(item,index) in classify" class="graphic-list-block" :class="classifyCurrent === item.itemName ? 'block' : 'none'" :key="item.index">
            <!-- <div v-for="(item,index) in classify" class="graphic-list-block" :class="classifyCurrent === item.itemName ? 'block' : 'none'" :key="item.index"> -->
                <scroll class="graphic-list-scroll" 
                :listenScroll="false"
                :pullup="true"
                @scrollToEnd="scrollToEnd" 
                :data="travel"
                >
                    <ul>    
                        <div>{{item.itemWord}}</div>
                        <li class="graphic-item" v-for="(item, index) in dataBlock.dataBlockRes" :key="item.index">
                            <h2 class="graphic-item-title">[{{index}}] - {{item.title}}</h2>
                            <div class="thumb-box-list">
                                <div class="thumb-box" v-for="it in item.imgList" :key="it">
                                    <img :src="it" alt="">
                                </div>
                            </div>
                            <div class="graphic-info-box">
                                <span>旅行说</span>
                                <span>评论290</span>
                                <span>25分钟前</span>
                            </div>
                        </li>
                        <loadmore v-show="hasMore"></loadmore>
                    </ul>
                </scroll>
            </block-list>
            <!-- </div> -->
        </div>
        
        
    </div>
</template>
<script>
import scrollview from '@/components/scroll-view.vue'
import scroll from '@/components/scroll.vue'
import loadmore from '@/components/loadmore.vue'
import Axios from 'axios'
import blockList from './block-list'
export default({
    name: 'graphicList',
    components:{
        scrollview,
        scroll,
        loadmore,
        blockList
    },
    data(){
        return {
            classify:[{
                    itemName: 'travel',
                    itemWord: '旅游',
                    resultList: [],
                },{
                    itemName: 'food',
                    itemWord: '美食'
                },{
                    itemName: 'dining',
                    itemWord: '餐厅'
                },{
                    itemName: 'entertain',
                    itemWord: '娱乐'
                },{
                    itemName: 'gossip',
                    itemWord: '八卦'
                },{
                    itemName: 'side',
                    itemWord: '身边事'
                },{
                    itemName: 'technology',
                    itemWord: '科技'
            }],
            classifyCurrent: 'travel',
            hasMore: true,
            travel:[1,2,3,4,5,6,7],
            params:{
                page:0,
                size: 10,
                pagecount: 3
            },
            resData:{
                travel:{
                    resultList:[],
                    total: 0
                },
                food:{
                    resultList:[],
                    total: 0
                }
            },
            dataBlock:{
                dataBlockRes: [],
                resTotal: 0
            }
        }
    },
    mounted(){
        var e = this.$refs.nav.childNodes;
        var eLength = 0;
        for(var i = 0; i < e.length; i++){
            eLength += e[i].clientWidth;
        }
        this.$refs.cont.style.width = eLength + 'px';
        this.scrollToEnd();
    },
    methods:{
        scrollToEnd(){
        //     if( this.queryResult.length >= this.total && this.total !=0){
        //     this.showMore = false;
        //     return;
        // }
            if( this.dataBlock.dataBlockRes.length >= this.dataBlock.resTotal && this.dataBlock.resTotal !=0){
                this.hasMore = false;
                console.log('无更多内容可以加载...')
                return;
            }
            Axios
            .get('/api/news.json')
            .then((res)=>{
                var resList = res.data[this.classifyCurrent].resultList;
                var resTotal = res.data[this.classifyCurrent].total;
                var thisResList = this.dataBlock.dataBlockRes;
                this.dataBlock.dataBlockRes =  this.dataBlock.dataBlockRes.concat(resList);
                this.dataBlock.resTotal = resTotal;
                console.log('this.dataBlock.resTotal= '+this.dataBlock.resTotal)
                if(this.dataBlock.dataBlockRes.length >= this.dataBlock.resTotal){
                    this.showMore = false;
                }
                console.log('触底 总数= '+ this.dataBlock.dataBlockRes.length);
            })
        },
        getlist(itemName){
            this.classifyCurrent = itemName;
            var name = itemName;
            console.log(name)
            Axios
            .get('/api/news.json')
            .then((res)=>{
                this.resData.food.resultList = res.data[name].resultList;
                this.dataBlock.dataBlockRes = res.data[name].resultList;
                this.dataBlock.resTotal = res.data[name].resultList.total;
                // console.log(res.data[name].resultList);
                // this.resData.food.resultList = res.data.itemName.resultList;
                // console.log(res.data.itemName.resultList);
            })

        }
    }
})
</script>
<style lang="less" scoped>
    .graphic-page{
        .graphic-scroll{ 
            position: fixed; 
            left:0;
            right:0;
            top:0;
            height: 34px;
            z-index: 100;
            overflow:hidden;
            background: lightcoral;
            .graphic-nav-content{ 
                .graphic-list-nav{
                    width:auto;
                    height: 34px;
                    border-bottom:1px solid #eee;
                    font-size: 16px;
                    overflow: hidden;
                    white-space:nowrap;
                    span{
                        display: inline-block;
                        white-space: nowrap;
                        line-height: 34px;
                        padding: 0 20px;
                        white-space: 1px;
                        &.active{
                            font-size: 17px;
                            color:#fff;
                        }
                    }
                }
            }
        }
        .graphic-list-wrap{
            position: fixed;
            top: 35px;
            bottom: 45px;
            left:0;
            right:0;
            // background: pink;
            .graphic-list-block{
                padding: 0 12px;
                position: absolute;
                top:0;
                left:0;
                bottom: 0;
                right:0;
                &.block{
                    display:block;
                }
                &.none{
                    display:none;
                }
                .graphic-list-scroll{
                    position: absolute;
                    top:0;
                    bottom: 0;
                    left:12px;
                    right:12px;
                }
                .graphic-item{
                    padding: 10px 0 15px;
                    border-bottom:1px solid rgba(221, 221, 221, 0.6);
                    .graphic-item-title{
                        font-size: 16px;
                        color:#000;
                        white-space: 1px;
                        line-height: 22px;
                    }
                    .thumb-box-list{
                        overflow: hidden;
                        display: block;
                        text-align: center;
                        margin-top: 8px;
                        .thumb-box{
                            display: inline-block;
                            overflow: hidden;
                            width: 33.3%;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            height: 80px;
                            &:first-child{
                                padding-right: 2px;
                            }
                            &:last-child{
                                padding-left: 2px;
                            }
                            img{
                                border: none;
                                display: block;
                                width: 100%;
                                -webkit-transition: opacity 300ms ease;
                                -moz-transition: opacity ease .3s;
                                        transition: opacity ease .3s;
                                pointer-events: none;
                                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                                -webkit-user-select: none;
                                text-decoration: none;
                                
                            }
                        }
                    }
                    .graphic-info-box{
                        line-height: 14px;
                        font-size: 12px;
                        color:#999;
                        margin-top: 6px;
                        span{
                            display: inline-block;
                            margin-right: 8px;
                        }
                    }
                }
            }
            
        }
        
    }
</style>