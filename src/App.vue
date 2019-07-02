<template>
  <div id="app">
    <router-view />
    <div v-if="$route.meta.keepAlive">
        <headnav></headnav> 
    </div>
  </div>
</template>
<script>
import headnav from './views/headnav'
export default{
  name: 'App',
  components:{
    headnav,
  }
}
</script>
<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  font-size: 13px;
}

</style>
