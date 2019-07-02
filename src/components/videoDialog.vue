<template>
  <div class="subscribe-dialog-view">
    <cube-popup ref="popup" @mask-click="hide">
      <div class="subscribe-dialog-wrapper">
        <span class="close" @click="hide"><i class="cubeic-close"></i></span>
        <div class="title">开启推送通知</div>
        <img src="./subscribe.png">
        <p class="desc">第一时间获取最新鲜出炉的新闻攻略、赛事咨询、数据专题、精彩视频</p>
        <cube-button class="button" @click="start">现在开启</cube-button>
      </div>
    </cube-popup>
  </div>
</template>

<script>

export default {
  name: "videoDialog",
  data: function(){
      return {
          islogin: false,
          userinfo:''
      }
  },
  methods: {
    show () {
      this.$refs.popup.show()
      this.$emit('show')
    },
    hide () {
      this.$refs.popup.hide()
      this.$emit('hide')
    },
  }
};
</script>
<style lang="less" scoped>
    // .center-page{ 
        
        
    // }
</style>
