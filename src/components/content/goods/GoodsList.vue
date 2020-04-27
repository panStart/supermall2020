<template>
  <div class="goods_list">
      <goods-list-item v-for="(item,index) in goodsList" :key="index" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    components:{
        GoodsListItem
    },
    props:{
        goodsList:{
            type:Array,
            default:[]
        }
    }
}
</script>

<style scoped>
.goods_list{
    display: flex;
    /* 包裹，根据宽度显示多少个 */
    flex-wrap: wrap;    
    /* 排列方式     */
    justify-content: space-between;
    padding: 0 5px
}
</style>