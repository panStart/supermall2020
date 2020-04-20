<template>
    <div id="tab-bar">
        <!-- <tab-bar-item></tab-bar-item>
        <tab-bar-item></tab-bar-item>
        <tab-bar-item></tab-bar-item>
        <tab-bar-item></tab-bar-item> -->
        <slot></slot>
    </div>
    
</template>
<script>
// import TabBarItem from './TabBarItem'
export default {
    name:'TabBar',
    components:{
        //TabBarItem
    }
}
</script>
<style  scoped>
#tab-bar{
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left:0;
    right: 0;
    bottom: 0;
    height: 49px;
    box-shadow: 0px -2px 1px rgba(100, 100, 100, .2);
}

</style>