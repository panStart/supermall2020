<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if='!isActive'><slot name="icon"></slot></div>
        <div v-else><slot name="icon_active"></slot></div>
        <div :style="isActive?{color:textColor}:{}">
            <slot name="text"></slot>
        </div>
        
        <!-- <img src="../../assets/img/tabbar/cart.svg" alt="">
        <div>首页</div> -->
    </div>
</template>
vue.<script>
export default {
    name:'TabBarItem',

    data(){
        return{
            //isActive:true
        }
    },
    // props:['path'],
    props:{
        path:String,
        textColor:{
            type:String,
            default:'#ff5777'
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1
        }
    },
    methods:{
        itemClick(){
            if(this.isActive) return;
            this.$router.replace(this.path)
            //5.尝试两者的区别
            // console.log(this.$router);
            // console.log(this.$route);
            
            
        }
    }
}
</script>
<style scoped>
.tab-bar-item{
    flex:1;
    text-align: center; 
    
}
.tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 5px;
    vertical-align: middle;
}
.active{
    color: #ff5777;
}
</style>