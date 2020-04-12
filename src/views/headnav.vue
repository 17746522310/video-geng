<template>
  <div id="nav" class="border-top">
      <div class="nav-item" :class="'index'==this.$store.state.navname ? 'on' : ''" @click.prevent="changelink('index')">
        <img class="icon_private nav-img" src="@/assets/icons/icon1.png" alt="">
        <img class="icon_active nav-img" src="@/assets/icons/icon1_cur.png" alt="">
        <div class="nav-txt">首页</div>
      </div>
      <!-- <div class="nav-item" :class="'test'==this.$store.state.navname ? 'on' : ''" @click.prevent="changelink('test')">
        <img class="icon_private nav-img" src="@/assets/icons/icon2.png" alt="">
        <img class="icon_active nav-img" src="@/assets/icons/icon2_cur.png" alt="">
        <div class="nav-txt">测试</div>
      </div> -->
      <div class="nav-item" :class="'graphic'==this.$store.state.navname ? 'on' : ''" @click.prevent="changelink('graphic')">
        <img class="icon_private nav-img" src="@/assets/icons/icon2.png" alt="">
        <img class="icon_active nav-img" src="@/assets/icons/icon2_cur.png" alt="">
        <div class="nav-txt">图文</div>
      </div>
      <div class="nav-item" :class="'center'==this.$store.state.navname ? 'on' : ''" @click.prevent="changelink('center')">
        <img class="icon_private nav-img" src="@/assets/icons/icon2.png" alt="">
        <img class="icon_active nav-img" src="@/assets/icons/icon2_cur.png" alt="">
        <div class="nav-txt">我的</div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "headnav",
  mounted(){
    //初次加载不在首页时校准导航状态
    this.initNav();
  },
  methods:{
    initNav(){
      var name = this.$route.name;
      this.$store.commit('set_navname',name);
    },
    changelink: function(name){
      this.$store.commit('set_navname',name);
      this.$router.push({name:name})
    }
  }

};
</script>
<style lang="less" scoped>
#nav {
  position:fixed;
  bottom:0;
  left:0; 
  right:0;
  z-index: 1;
  height: 44px;
  line-height: 44px;
  display: flex;
  background: #fff;
  border-top:1px solid #ccc;
  .nav-item {
    flex:1;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;
    &.on{
      .icon_active{ display: block;}
      .icon_private{ display: none;}
      .nav-txt{
        color:#000;
      }
    }
    .nav-img{
      display: block;
      margin:0 auto;
      width: 25px;
      height:25px;
    }
    .icon_active{
      display: none;
    }
    .nav-txt{
      height: 20px;
      line-height: 20px;
      color:#333;
    }
    // &.router-link-exact-active {
    //   color: #42b983;
    // }
  }
}
</style>
