<template>
<div id="home">
  <nav-bar class="home_nav">
     <div slot="center">购物街</div>
  </nav-bar>
  <!-- 制造tabControl悬停的效果 -->
      <tab-control :tabList = "['流行','新款','精选']" @itemClick="tabClick" 
      ref="tab_control1" class="home_tab_control" v-show="isTabFixed" 
      ></tab-control>
  <scroll class="content"
  :probeType="3"
  @scroll = "contentScroll"
  :pullUpLoad="true"
  @pullingUp="loadMore"
  ref="scroll"
  >
      
      <home-swiper :banners="banners" @swiperImageLoad = "swiperImageLoad"></home-swiper>
      <recommend-view :recommends = "recommends"/>
      <feature-view></feature-view>
      <!-- 此处需要绑定属性，除非是字符串，其余的都需要绑定 -->
      <tab-control :tabList = "['流行','新款','精选']" @itemClick="tabClick" 
      ref="tab_control2" v-show="!isTabFixed"
      ></tab-control>
      <goods-list :goodsList="showGoods"></goods-list>
     
  </scroll>
  <!-- 在home.vue的BackTop组件上添加点击事件加.native -->
  <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>


</div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/TabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
//抽到混入
// import BackTop from 'components/common/backTop/BackTop'
//滑动组件
import Scroll from 'components/common/scroll/Scroll'
// 请求数据
import {getHomeMultidata,getHomeData} from 'network/home'
//抽到混入里
// import { debounce } from 'common/utils'
import { itemImgListerMixin , backTopMixin} from 'common/mixin'
//常量抽取
// import {BACKTOP_DISTANCE,POP,NEW,SELL} from 'common/const'
import { POP,NEW,SELL } from 'common/const'
export default {
    name:'',
    data(){
      return {
        banners:[],
        recommends:[],
        currentType:POP,
        goodsList:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        // isShowBackTop:false,//混入
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        //图片刷新事件--混入
        // ItemImgListener:null
      }
      
    },
    computed:{
      showGoods(){
        return this.goodsList[this.currentType].list
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop//抽到混入
    },
    created(){
      this.getMultidata(),
      this.getHomeProducts(POP)
      this.getHomeProducts(SELL)
      this.getHomeProducts(NEW)
    },
    mounted(){
      //获取tabControl的滑动距离
      // console.log(this.$refs.tab_control.$el.offsetTop);
      
      //列表图片的加载处理
      //抽到混入里
      // const refresh = debounce(this.$refs.scroll.refresh,500)
      // this.ItemImgListener = ()=> refresh() 
      // this.$bus.$on("imageLoad",
      //   // ()=>{
      //   //   // 防抖处理前
      //   //   //console.log("------");
      //   //   //this.$refs.scroll.refresh();
      //   //   //观看处理后的结果
      //   //   // console.log(this.$refs.scroll.scroll.scrollerHeight);
      //   //   //防抖处理后
      //   //   refresh()
      //   // }
      //   this.ItemImgListener
      // )
      
    },
    mixins:[itemImgListerMixin , backTopMixin],
    activated(){
      //返回原来的位置
      this.$refs.scroll.scrollTo(0,this.saveY,0),
      //防止scroll卡主
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //记录离开的位置 
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY);
      //关闭事件总线
      this.$bus.$off("imageLoad",
        this.ItemImgListener
      )
    },
    methods:{
      //防抖方法(提取到common/utils.js)
      // debounce(func,delay=200){
      //       let timer = null
      //       return function (...args) {
      //         if (timer) clearTimeout (timer)
      //         timer = setTimeout(() => {
      //           func.apply(this, args)
      //         },delay)
      //       } 
      // },
      //事件,点击tabControl获取商品信息
      tabClick(index){
        console.log(index);
        
        switch (index){
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break  
          case 2:
            this.currentType = SELL
            break        
        }
        this.$refs.tab_control1.currentIndex = index
        this.$refs.tab_control2.currentIndex = index
      },

      //添加到混入，detail也要用
      // backTop(){
      //   //this.$refs.scroll可以拿到scroll组件里的数据方法
      //   //方案一太复杂,方案二封装
      //   // this.$refs.scroll.scroll.scrollTo(0,0)
      //   this.$refs.scroll.scrollTo(0,0)
        
      // },
      //监听scroll的滑动位置
      contentScroll(position){
        // console.log(position);
        //判断置顶按钮,封装方法提到混入
        this.listenShowBackTop(position)
        //判断tabControl
        this.isTabFixed = (-position.y) > (this.tabOffsetTop)
      },
      //判断置顶按钮,封装方法提到混入
      // listenShowBackTop(position){
      //     this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
      // },


      //tabControl的影藏显示(监听轮播图的刷新)
      swiperImageLoad(){
          this.$refs.scroll.refresh()
          this.tabOffsetTop = this.$refs.tab_control2.$el.offsetTop
      },
      //上拉加载
      loadMore(){
        this.getHomeProducts(this.currentType)
      },

      //数据请求
      getMultidata(){
        getHomeMultidata()
        .then(res=>{
          //这里的res在函数结束后会被清除，
          //对应的对象会因为没有主人而被清理，所以需要执行一个新主人
          // console.log(res);
          this.banners = res.data.banner.list,
          this.recommends = res.data.recommend.list
        })
      },
      getHomeProducts(type){
        const page =  this.goodsList[type].page + 1
        getHomeData(type,page)
          .then(res=>{
            // console.log(res.data.list);
            const goodsList = res.data.list
            //这里使用...是将多个数组单独push
            //不用的话，将所有的数组全部打进第0个索引里
            this.goodsList[type].list.push(...goodsList)
            this.goodsList[type].page ++
            // const goodsList = res.data.list
            //重启上拉加载
            this.$refs.scroll.finishPullUp()
          })
      }  
    }
}
</script>

<style scoped>
/* 
第二种方案
有了滑动组件的固定包裹，就不需要了 */
/* #home{
  padding-top: 44px;
  padding-bottom: 49px;
} */
/* 滑动组件高度设置第一种方案 */
#home{
  /* padding-top: 44px; */
  height: 100vh;
  /* position: relative; */
} 
.home_nav{
  background-color: var(--color-tint);
  color: #fff;
/*
第二种方案
有了滑动组件的固定包裹，就不需要了
*/
  /* position: fixed;
  top: 0;
  left: 0;
  right:0 ;
  z-index: 9; */
}
.content{
  /* 第二种方案 */
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden; */
  /* 滑动组件高度设置第一种方案 */
  /* position: absolute; */
  height: calc(100% - 93px);
  overflow: hidden;

}
/* tabcontrol控制显示
有问题，不起作用在滑动组件里
 */
/* .isFixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
.home_tab_control{
  position: relative;
  z-index: 9;
}
</style>