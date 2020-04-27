<template>
    <nav-bar>
          <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg">
          <div slot="center" class="title">
              <span v-for="(item,index) in titleinfos" :key="index" 
              class="title-item" @click="barClick(index)" :class="{activeColor:index == currentIndex}"
              >
                  {{item}}
              </span>
          </div>
      </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    data(){
        return {
            currentIndex:0
        }
    },
    // computed:{
    //     isActive(index){
    //         return this.currentIndex == index
    //     }
    // },
    components:{
        NavBar
    },
    props:{
        titleinfos:{
            type:Array,
            default:()=>{
                return ['商品', '参数', '评论', '推荐']
            }
        }
    },
    methods:{
        backClick(){
            this.$router.back()
        },
        barClick(index){
            if (this.currentIndex == index) return;
            this.currentIndex = index
            this.$emit("barClick",index)
        }
    }
}
</script>

<style scoped>
.back{
    margin-top: 15px;
    height: 18px;
}
.title{
    display: flex;
}
.title-item{
    flex:1
}
.activeColor{
    color: var(--color-high-text);
}
</style>