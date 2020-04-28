<template>
<scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in list" :key="index" :itemInfo='item'></cart-list-item>
</scroll>

</template>

<script>
//滑动组件
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
//mapGetters将store里的getters暂时映射到局部计算属性
import { mapGetters } from 'vuex'
export default {
    components:{
        Scroll,
        CartListItem
    },
    computed:{
        // ...mapGetters([ 'cartLength' , 'cartList'])
        ...mapGetters({
            list:'cartList'
        })
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
}
</style>