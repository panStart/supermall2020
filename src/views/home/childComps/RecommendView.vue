<template>
  <div class="recommend_view">
      <div v-for="(item,index) in recommends" :key="index" class="recommend_view_item">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </div>
  </div>
</template>

<script>
export default {
    props:{
      recommends:{
          type:Array,
          default:[]
      }
      
    }
}
</script>

<style scoped>
.recommend_view{
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
}
.recommend_view_item{
  flex:1;
  text-align: center;
}
.recommend_view_item img{
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
</style>