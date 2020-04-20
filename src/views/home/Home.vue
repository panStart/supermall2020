<template>
<div id="home">
  <nav-bar class="home_nav">
     <div slot="center">购物街</div>
  </nav-bar>

  <home-swiper :swiperList = "swiperList"></home-swiper>
</div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
export default {
    name:'',
    data(){
      return {
        swiperList:[
          {id:1,img_src:"fbb.jpg"},
          {id:2,img_src:"mingren.jpg"}
        ]
      }
      
    },
    components:{
      NavBar,
      HomeSwiper
    }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.home_nav{
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right:0 ;
}
</style>