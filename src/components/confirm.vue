<template>
    <transition name="mask-bg-fade">
        <div class="mask" v-show="show">
            <div class="mask_bg"></div>
            <transition name="slide-fade">
                <div class="modelBox" v-show="show">
                    <div class="tipIcon" v-bind:class="confirmModalOptions.type||'warning'"></div>
                    <!-- <div class="closeModel" v-on:click="closeModel()"></div> -->
                    <div class="title">{{confirmModalOptions.title || "提示"}}</div>
                    <div class="message textCenter">{{confirmModalOptions.message || " "}}</div>
                    <div class="model_btnBox">
                        <button class="dh_button_default2" v-on:click="confirmCancel()">
                            {{confirmModalOptions.btnCancelText || "取消"}}
                        </button>
                        <button class="dh_button_blue" v-on:click="confirmSubmit()">
                            {{confirmModalOptions.btnSubmitText || "确定"}}
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
  export default {
    props: ["confirmModalOptions"],
    data() {
      return {
        show: false,   // 是否显示模态框
      }
    },
    methods: {
      closeModel: function () {
        this.show = false;
      },
      showModel: function () {
        this.show = true;
      },
      confirmCancel: function () {
        this.show = false;
        if(typeof (this.confirmModalOptions.btnCancelFunction)==='function'){
          this.confirmModalOptions.btnCancelFunction()
        }
      },
      confirmSubmit: function () {
        this.show = false;
        if(typeof (this.confirmModalOptions.btnSubmitFunction)==='function'){
          this.confirmModalOptions.btnSubmitFunction()
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.mask{
    position: fixed;
    top:0;
    right:0;
    bottom: 0;
    left:0;
    z-index: 100;
    .mask_bg{
        position: absolute;
        top:0;
        right:0;
        bottom: 0;
        left:0;
        z-index: 1;
        background: rgba(0,0,0,.65);
    }
    .modelBox{
        position: absolute;
        top:50%;
        left:50%;
        z-index: 2;
        transform: translate(-50%,-50%);
        width:80%;
        background: #fff;
        border-radius: 4px;
        .title{
            padding: 20px 20px 10px;
            font-size: 16px;
            text-align: center;
            font-weight: bold;
        }
        .message{
            padding:10px 20px 30px;
            text-align: center;
            color:#666;
        }
        .model_btnBox{
            height: 40px;
            line-height: 40px;
            display: flex;
            border-top: 1px solid #eee;
            button{
                flex:1;
                text-align: center;
                position: relative;
                &::before{
                    content: "";
                    width:1px;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left:0;
                    bottom:0;
                    background: #eee;
                }
                &:first-child::before{
                    display: none;
                }
            }

            .dh_button_blue{
                color: #42b983;
                //  border-left:1px solid #eee;
            }
        }

    }
}
</style>