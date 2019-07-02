<template>
  <div id="loading" v-show="this.isload">
    <div id="colorfulPulse">
        <span class="item-1"></span>
        <span class="item-2"></span>
        <span class="item-3"></span>
        <span class="item-4"></span>
        <span class="item-5"></span>
        <span class="item-6"></span>
        <span class="item-7"></span>
    </div>
    <h1 class="loadingWord">加载中...</h1>
  </div>
</template>

<script>
export default {
  name: "loading",
  props:{
    isload:Boolean
  },
  data: function(){
      return {
        loading:true
      }
  }
};
</script>
<style scoped>
#loading {
    /* position: absolute;
    top:0;
    bottom: 0;
    left:0;
    right:0;
    margin: auto; */
    height: 110px;
}
#colorfulPulse {
  width: 100px;
  height: 80px;
  margin:0 auto;
  display:flex;
  flex-wrap: nowrap; 
  justify-content : space-around;
}

#colorfulPulse span {
  /* display: inline-block; */
  width: 6px;
  height: 40px;
  margin-right: 8px;
  animation-name: scale;
  -webkit-animation-name: scale;
  -moz-animation-name: scale;
  -ms-animation-name: scale;
  -o-animation-name: scale;
  animation-duration: 1.2s;
  -webkit-animation-duration: 1.2s;
  -moz-animation-duration: 1.2s;
  -ms-animation-duration: 1.2s;
  -o-animation-duration: 1.2s;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
}
span.item-1 {
  background: #2ecc71;
}
span.item-2 {
  background: #3498db;
}
span.item-3 {
  background: #9b59b6;
}
span.item-4 {
  background: #e67e22;
}
span.item-5 {
  background: #c0392b;
}
span.item-6 {
  background: #e74c3c;
}
span.item-7 {
  background: #e74c8c;
}
.item-1 {
  animation-delay: -1s;
  -webkit-animation-delay: -1s;
  -moz-animation-delay: -1s;
  -ms-animation-delay: -1s;
  -o-animation-delay: -1s;
}

.item-2 {
  animation-delay: -0.9s;
  -webkit-animation-delay: -0.9s;
  -moz-animation-delay: -0.9s;
  -ms-animation-delay: -0.9s;
  -o-animation-delay: -0.9s;
}

.item-3 {
  animation-delay: -0.8s;
  -webkit-animation-delay: -0.8s;
  -moz-animation-delay: -0.8s;
  -ms-animation-delay: -0.8s;
  -o-animation-delay: -0.8s;
}
.item-4 {
  animation-delay: -0.7s;
  -webkit-animation-delay: -0.7s;
  -moz-animation-delay: -0.7s;
  -ms-animation-delay: -0.7s;
  -o-animation-delay: -0.7s;
}

.item-5 {
  animation-delay: -0.6s;
  -webkit-animation-delay: -0.6s;
  -moz-animation-delay: -0.6s;
  -ms-animation-delay: -0.6s;
  -o-animation-delay: -0.6s;
}

.item-6 {
  animation-delay: -0.5s;
  -webkit-animation-delay: -0.5s;
  -moz-animation-delay: -0.5s;
  -ms-animation-delay: -0.5s;
  -o-animation-delay: -0.5s;
}

.item-7 {
  animation-delay: -0.4s;
  -webkit-animation-delay: -0.4s;
  -moz-animation-delay: -0.4s;
  -ms-animation-delay: -0.4s;
  -o-animation-delay: -0.4s;
}
@-webkit-keyframes scale {
  0%, 40%, 100% {
    -moz-transform: scaleY(0.2);
    -ms-transform: scaleY(0.2);
    -o-transform: scaleY(0.2);
    -webkit-transform: scaleY(0.2);
    transform: scaleY(0.2);
  }

  20%, 60% {
    -moz-transform: scaleY(1);
    -ms-transform: scaleY(1);
    -o-transform: scaleY(1);
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}
@-moz-keyframes scale {
  0%, 40%, 100% {
    -moz-transform: scaleY(0.2);
    -ms-transform: scaleY(0.2);
    -o-transform: scaleY(0.2);
    -webkit-transform: scaleY(0.2);
    transform: scaleY(0.2);
  }

  20%, 60% {
    -moz-transform: scaleY(1);
    -ms-transform: scaleY(1);
    -o-transform: scaleY(1);
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}
@-ms-keyframes scale {
  0%, 40%, 100% {
    -moz-transform: scaleY(0.2);
    -ms-transform: scaleY(0.2);
    -o-transform: scaleY(0.2);
    -webkit-transform: scaleY(0.2);
    transform: scaleY(0.2);
  }

  20%, 60% {
    -moz-transform: scaleY(1);
    -ms-transform: scaleY(1);
    -o-transform: scaleY(1);
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}
@keyframes scale {
  0%, 40%, 100% {
    -moz-transform: scaleY(0.2);
    -ms-transform: scaleY(0.2);
    -o-transform: scaleY(0.2);
    -webkit-transform: scaleY(0.2);
    transform: scaleY(0.2);
  }

  20%, 60% {
    -moz-transform: scaleY(1);
    -ms-transform: scaleY(1);
    -o-transform: scaleY(1);
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

.loadingWord {
  text-align:center;
  font-size: 1em;
  letter-spacing: 1.5px;
  text-align: center;
  /* width: 155px; */
  margin-top: 20px;
  color:#000;
  -webkit-animation: fade 2s infinite;
     -moz-animation: fade 2s infinite;
          animation: fade 2s infinite;
}
@-webkit-keyframes fade {
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
@-moz-keyframes fade {
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
@-o-keyframes fade {
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
@keyframes fade {
    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
}
</style>
