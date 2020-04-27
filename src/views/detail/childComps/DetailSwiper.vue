<template>

  <swiper class="detail_swiper_swiper">
      <swiper-item  v-for="(item,index) in swiperList" :key="index">
            <img :src="item" alt="轮播图">
      </swiper-item>
  </swiper>

</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        swiperList:{
            type:Array,
            default:[]  
        }
    }
}
</script>

<style scoped>
.detail_swiper_swiper{
    height:300px;
    overflow: hidden;
}
</style>