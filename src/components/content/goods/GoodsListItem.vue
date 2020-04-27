<template>
  <div class="goods_list_item" @click="itemClick">
       <img :src="showImage" alt="商品" @load="imageLoad">
       <div class="goods_item_info">
           <p>{{goodsItem.title}}</p>
           <span class="price">¥{{goodsItem.price}}</span>
           <span class="collect">{{goodsItem.cfav}}</span>
       </div>
  </div>
</template>

<script>
export default {
    props:{
      goodsItem:{
        type:Object,
        default:{}
      }
    },
    computed:{
      showImage(){
        //不能调换顺序，因为首页加载时this.goodsItem.show.img已经有值，computed有缓存属性
        return  this.goodsItem.image  || this.goodsItem.show.img 
      }
    },
    methods:{
      imageLoad(){
        // console.log(this.showImage);
        this.$bus.$emit("imageLoad")
      },
      //点击跳转详情页
      itemClick(){
        // console.log(this.goodsItem);
        let id = this.goodsItem.iid
        this.$router.push('/detail/'+id)
      }
    }
}
</script>

<style scoped>
.goods_list_item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods_list_item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods_item_info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods_item_info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods_item_info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods_item_info .collect {
    position: relative;
  }

  .goods_item_info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>