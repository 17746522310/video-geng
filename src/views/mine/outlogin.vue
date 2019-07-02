<template>
<div class="login-page">
    <headtitle :title="title" :back="back"></headtitle>
    <div class="login-box">
       <div class="outlogin-item">
           <span>江湖样貌</span>
           <img class="useravater" :src="userinfo.userImageUrl" alt="">
       </div>
       <div class="outlogin-item">
           <span>昵称</span>
           <input class="outlogin-input" type="text" v-model="userinfo.userName" placeholder="请填写昵称" >
       </div>
       <wv-cell class="addressinput" title="地址" is-link :value="address | pickerValueFilter" @click.native="addressPickerShow = true" />
       <wv-picker
        :visible.sync="addressPickerShow"
        v-model="address"
        ref="addressPicker"
        :columns="addressColumns"
        :visible-item-count="5"
        @change="onAddressChange"
        @confirm="confirmAddress"
        />
    </div>
    <!-- <cube-button :primary="true" @click="userLogin()">登录</cube-button><br> -->
    <cube-button :primary="true" @click="outlogin()">退出登录</cube-button>
</div>
</template>

<script>
import axios from 'axios'
import headtitle from '@/views/title.vue'
import { constants } from 'fs';
import chinaAreaData from 'china-area-data'
const provinces = Object.values(chinaAreaData[86])
// 获取某一省下的市
const getCities = (province) => {
  let provinceCode
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i
      break
    }
  }
  return typeof chinaAreaData[provinceCode] === 'object' ? Object.values(chinaAreaData[provinceCode]) : []
}
// 获取某一市下的区/县
function getAreas (province, city) {
  let provinceCode, cityCode
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i
      break
    }
  }
  for (let i in chinaAreaData[provinceCode]) {
    if (city === chinaAreaData[provinceCode][i]) {
      cityCode = i
      break
    }
  }
  if (chinaAreaData[cityCode]) {
    return typeof chinaAreaData[cityCode] === 'object' ? Object.values(chinaAreaData[cityCode]) : []
  } else {
    // 只有两级的情况
    return []
  }
}
export default {
  name: "outlogin",
  props:{

  },
  components:{
    headtitle
  },
  data: function(){
      return {
        title:'个人信息',
        back:true,
        userinfo:'',
        addressPickerShow: false,
        address: [],
        addressColumns: [
            { values: provinces},
            { values: getCities('北京')},
            { values: getAreas('北京', '城区')}
        ]
    }
  },
  mounted(){
      this.getUserInfo();
      this.$nextTick(() => {
        this.$refs.addressPicker.setValues(['北京市', '市辖区', '昌平区'])
      })
  },
  methods:{
    getUserInfo:function(){
       this.userinfo = JSON.parse(this.$store.state.userinfo) || '';
    },
    onAddressChange (picker, addressValues, slotIndex) {
      if (slotIndex === 0) {
        const cities = getCities(addressValues[0])
        picker.setColumnValues(1, cities)
        picker.setColumnValues(2, getAreas(addressValues[0], cities[0]))
      } else if (slotIndex === 1) {
        picker.setColumnValues(2, getAreas(addressValues[0], addressValues[1]))
      }
    },
    confirmAddress (picker) {
      this.address = picker.getValues()
    },
    outlogin () {
        // sessionStorage
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userinfo');
          this.$store.commit('set_token', null);
          this.$store.commit('set_userinfo', null);
          this.$store.commit('set_navname', 'index');
          console.log('成功退出登录...');
          //调到首页
          this.$router.push('/');
    }
    
  },
  filters: {
    pickerValueFilter (val) {
        if (Array.isArray(val)) {
            return val.toString()
        } else {
            return '请选择'
        }
    }
  }

};
</script>
<style lang="less" scoped>
    .login-page{
        padding: 50px 15px 0;
        .login-box{
            padding-top:30px;
            padding-bottom: 40px;
            .addressinput{ 
                padding: 10px 0;
                height:40px;
                line-height: 40px;
                border-bottom: 1px solid #eee;
            }
            .outlogin-item{
                display: flex;
                justify-content : space-between;
                align-items: center;
                border-bottom: 1px solid #eee;
                height:40px;
                line-height: 40px;
                padding:10px 0px;
                span{
                    color:#616161;
                }
                .useravater{
                    width:40px;
                    height:40px;
                    border-radius: 50%;
                }
                .outlogin-input{
                    height: 40px;
                    line-height: 40px;
                    text-align: right;
                    border:none;
                    color:#999;
                    &:focus{
                        border: none;
                    }
                }
            }
        }
    }
</style>