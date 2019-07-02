<template>
  <div id="headtitle">
    <router-link class="header-search" tag='span' to="/search" v-if="this.search">
      
    </router-link>
    <span class="header-back" v-if="this.back" @click="backpage"></span>
    <div>{{this.title}}</div> 
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "headtitle",
  props: {
    title: String,
    search: Boolean,
    back: Boolean
  },
  components: {
    
  },
  methods:{
    backpage(){
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
#headtitle {
  position:fixed;
  top:0;
  left:0; 
  right:0;
  z-index: 1;
  height: 44px;
  line-height: 44px;
  display: flex;
  background: #d43d3d;
  color:#fff;
  text-align: center;
  font-size: 16px;
  line-height: 44px;
  flex-wrap: nowrap;
  justify-content: center;
  // justify-content : space-between;
  div{
    // flex:1;
    width:60%;
    justify-content : center;
    text-align: center;
  }
  .header-search,.header-back{
    position: absolute;
    left:10px;
    top:0;
    bottom: 0;
    width:44px;
    height: 44px;
  }
  .header-back{
    background: url("../assets/images/header_back.png") no-repeat center left;
    background-size: 22px auto;
  }
  .header-search{
    background: url("../assets/images/header_search.png") no-repeat center left;
    background-size: 30px auto;
  }
  
}
</style>
