<template>
  <div class="index-box">
    
    <!-- <HelloWorld msg="我是父组件home传的数据" /> -->
    <!-- <indexlist></indexlist> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import indexlist from "@/views/index/list.vue"
// import { constants } from 'fs';

export default {
  name: "index",
  components: {
    indexlist
  } 
};
</script>
<style lang="less">
.index-box{ width:100%;
  color: #000;
  color: #333;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>