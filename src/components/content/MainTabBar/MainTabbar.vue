<template>
    <tab-bar>
        <tab-bar-item path="/home" textColor='red'>
            <img slot='icon' src="~assets/img/tabbar/home.svg" alt="">
            <img slot='icon_active' src="~assets/img/tabbar/home_active.svg" alt="">
            <div slot="text">首页</div>
        </tab-bar-item>
         <tab-bar-item path="/category" textColor='red'>
            <img slot='icon' src="~assets/img/tabbar/category.svg" alt="">
            <img slot='icon_active' src="~assets/img/tabbar/category_active.svg" alt="">
            <div slot="text">分类</div>
        </tab-bar-item>
         <tab-bar-item path="/cart" textColor='red'>
            <img slot='icon' src="~assets/img/tabbar/shopcart.svg" alt="">
            <img slot='icon_active' src="~assets/img/tabbar/shopcart_active.svg" alt="">
            <div slot="text">购物车</div>
        </tab-bar-item>
         <tab-bar-item path="/profile" textColor='red'>
            <img slot='icon' src="~assets/img/tabbar/profile.svg" alt="">
            <img slot='icon_active' src="~assets/img/tabbar/profile_active.svg" alt="">
            <div slot="text">我的</div>
        </tab-bar-item>
    </tab-bar>
</template>
<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
    name:"MainTabbar",
    components:{
        TabBar,
        TabBarItem
    }
}
</script>
<style scoped>

</style>