<template>
  <div class="tab_control">
      <div class="tab_control_item"
        v-for="(item,index) in tabList" :key="index"
        :class="{active: currentIndex == index}"
        @click="itemClick(index)"
      >
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            currentIndex:0
        }
    },
    props:{
        tabList:{
            type:Array,
            default:[]
        }
    },
    methods:{
        itemClick(index){
            // console.log(this.currentIndex,index);
            if(this.currentIndex == index) return
            this.currentIndex = index
            //  console.log(this.currentIndex);
            
            this.$emit("itemClick" , index)
        }
    }
}
</script>

<style scoped>
.tab_control{
    /* 停留效果 */
    /* 加入scoll失效 */
    /* position: sticky;
    top: 44px; */

    
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
}
.tab_control_item{
    flex: 1;
}
.tab-control-item span {
    padding: 5px;
}
.active{
     color: var(--color-high-text);
}
.active span {
    border-bottom: 2px solid var(--color-high-text);
}


</style>