<template>
  <div id="app">
    <!-- 底部导航栏 --> 
    <keep-alive exclude="Detail">
       <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>

import MainTabBar from 'components/content/MainTabBar/MainTabbar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
