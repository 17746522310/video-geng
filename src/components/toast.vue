<template>
    <div class="toast" v-show="show">
        {{tips.content}}
    </div>
</template>

<script>
import { constants } from 'fs';
export default {
/**
 * toast 模态接口参数
 * @param {string} modal.content 模态框提示内容
 * @param {function} modal.callback 模态框是否有回调方法
 */
  name: "toast",
  data: function(){
      return {
          show: false
      }
  },
  props:{
     toastOptions: Object,
  },
  computed:{
      tips:{
          get(){
              let tips = this.toastOptions || {};
              tips = {
                  content: tips.content || '操作成功',
                  callback: tips.callback || function(){},
                  time: tips.time || 1500
              };
              return tips;
          }
      }
  },
  methods:{
    showTips(){
        this.show = true;
        setTimeout(()=>{
            // this.$emit('callback', this.tips.callback); 
            this.show = false;
            this.tips.callback();
        }, this.tips.time)
    }
  }
};
</script>
<style lang="less" scoped>
    .toast {
        position: fixed;
        z-index: 2000;
        left: 50%;
        top:45%;
        transition:all .5s;
     -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
         -ms-transform: translateX(-50%) translateY(-50%);
          -o-transform: translateX(-50%) translateY(-50%);
             transform: translateX(-50%) translateY(-50%);
        text-align: center;
        border-radius: 5px;
        color:#FFF;
        background: rgba(17, 17, 17, 0.7);
        height: 45px;
        line-height: 45px;
        padding: 0 15px;
        max-width: 150px;
    }
</style>
