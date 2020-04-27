<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot/>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            scroll:null
        }
    },
    props:{
        //是否监听滑动距离
        probeType:{
            type:Number,
            default:0
        },
        //是否监听上拉加载
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,//监听滑动距离
            click:true,
            pullUpLoad:this.pullUpLoad,//监听上拉加载,
            scrollY: true
        })
        if(this.probeType == 2||this.probeType == 3){
            this.scroll.on('scroll',(position)=>{
                // console.log(position);
                this.$emit('scroll',position)
            })
        }
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',() => {
                console.log("上拉加载更多");
                this.$emit('pullingUp')
            })
        }
        // console.log(this.scroll.scrollerHeight);
        
    },
    methods:{
        //方案二：封装backTop方法
        scrollTo(x,y,time=300){
            this.scroll&&this.scroll.scrollTo(x,y,time)
        },
        //重启上拉加载
        finishPullUp(){
           this.scroll&&this.scroll.finishPullUp()
       },
       //重新刷新计算滚动高度
       refresh(){
            // console.log("-------");
           this.scroll&&this.scroll.refresh()
       },
       getScrollY(){
        //    console.log(this.scroll.y);
           
           return  this.scroll? this.scroll.y : 0
       }
           
    }
    
}
</script>

<style>

</style>