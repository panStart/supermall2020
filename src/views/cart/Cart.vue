<template>
  <div class="cart">
    <nav-bar class="cart_nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
//mapGetters将store里的getters暂时映射到局部计算属性
import { mapGetters } from 'vuex'
export default {
  components:{
    NavBar,
    CartList
  },
  computed:{
    // ...mapGetters([ 'cartLength' , 'cartList'])
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
  overflow: hidden;
}
.cart_nav{
  background-color: var(--color-tint);
  color:#fff
}

</style>