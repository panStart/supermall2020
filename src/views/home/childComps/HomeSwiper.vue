<template>
    <div>
        <swiper>
            <swiper-item v-for="(item,index) in swiperList" :key="index">
                <img src="~assets/img/linshi/fbb.jpg" alt="" >
               <!-- <img :src="'../../../assets/img/linshi/'+item.src_img" alt="" > -->
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        swiperList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    created(){
        console.log(this.swiperList[0].img_src);
        
    }
}
</script>

<style>

</style>