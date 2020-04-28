<template>
  <div class="detail">
      <common-mask v-show="maskShow"></common-mask>
      <detail-nav-bar class="detail_navbar" @barClick="barClick" ref="navbar"></detail-nav-bar>
      <scroll class="detail_scroll_content" ref="scroll" @scroll = "contentScroll"
      :probeType="3"
      >
       
        <detail-swiper :swiperList = "swiperList"></detail-swiper>
        <detail-base-info :goods = "goods"></detail-base-info>
        <detail-shop-info :shop = "shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad = "imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goodsList="recommendList" ref="recommend"></goods-list>
      </scroll>
      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
      <detail-bottom-bar @addToCart = "addToCart"></detail-bottom-bar>
      <!-- <toast/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
//混入
// import BackTop from 'components/common/backTop/BackTop'
//幕板
import CommonMask from "components/content/Mask/commonMask"
//滑动组件
import Scroll from 'components/common/scroll/Scroll'
//toast组件
// import Toast from 'components/common/toast/Toast'

import { getDetail,Goods,Shop,GoodsParam,getRecommend}  from  "network/detail"
//获取防抖
// import { debounce } from 'common/utils'
//混入
import { itemImgListerMixin , backTopMixin } from 'common/mixin'
//映射actions
import { mapActions } from 'vuex'

export default {
    name:"Detail",
    data(){
        return{
            iid:null,
            maskShow:true,
            swiperList: [],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommendList:[],
            //混入
            // ItemImgListener:null
            themeTopYs:[],
            currentIndex:0,
            // isShowBackTop:false//混入
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo, 
        GoodsList,
        DetailBottomBar,
        // BackTop,//混入

        Scroll,
        CommonMask,
        // Toast
    },
    created(){
       //1.获取路由id
       this.iid = this.$route.params.id
       console.log(this.iid);
       
       this._getDetailData(),
       this._getRecommend()
    },
    methods:{
        //映射action.js的方法
        ...mapActions(['addCart']),
        _getDetailData(){
            const id = this.$route.params.id
            getDetail(id).then(res=>{
                const data = res.result;
                // console.log(data);
                
                //获取轮播图信息
                this.swiperList = data.itemInfo.topImages;
                // console.log(this.swiperList);
                //获取商品信息
                // 2.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                //3.获取商铺信息
                this.shop =  new Shop(data.shopInfo);
                //4.获取商品信息
                this.detailInfo = data.detailInfo
                //5.商品参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
                // 6.保存评论信息
                if (data.rate.list) {
                    // console.log(data.rate.list);
                    this.commentInfo = data.rate.list[0];
                }
            })
        },
        _getRecommend(){
            getRecommend().then(res => {
                this.recommendList = res.data.list
                // console.log(this.recommendList);
                
            })
        },
        imageLoad(){
            this.$refs.scroll.refresh()
            this.maskShow = false
            
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
            // console.log(this.themeTopYs);
            
        },
        //获取navbar的index实现点击滑动到位置
        barClick(index){
           this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
            
        },
        //滑动改变navbar
        contentScroll(position){
            let positionY = -position.y;
            let topLength = this.themeTopYs.length;

            // for (let i = 0; i < topLength; i++) {
            //     // console.log(i,this.currentIndex);
            //     if( (this.currentIndex !== i) && 
            //         ((i < topLength - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||
            //         ( i == topLength-1 && positionY >= this.themeTopYs[i])) 
            //     ){
            //         this.currentIndex = i
            //         this.$refs.navbar.currentIndex = i
            //     }
                
                
            // }                      
            for (let i = 0; i < topLength-1; i++) {
                // console.log(i,this.currentIndex);
                if( (this.currentIndex !== i) && 
                    (positionY >= this.themeTopYs[i] && 
                    positionY < this.themeTopYs[i+1])
                     
                ){
                    this.currentIndex = i
                    this.$refs.navbar.currentIndex = i
                }
            }

            //监听backTop的显示,混入
            // this.isShowBackTop = (-position.y) > 1000
            this.listenShowBackTop(position)
        },
        //backTop置顶--混入
        // backTop(){
        //     this.$refs.scroll.scrollTo(0,0)
        // }
        
        ///////////////////////////////////////////////////////////////////////////////////
        ////添加购物车
        ///////////////////////////////////////////////////////////////////////////////////
        addToCart(){
            console.log(this.goods);
            const product = {}
            product.image = this.swiperList[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.nowPrice
            product.iid = this.iid
            // console.log(product);
            // this.$store.commit("addCart",product)
            //复杂的逻辑使用actions,mutations尽量简单
            // this.$store.dispatch("addCart",product).then(res => {
            //     console.log(res);
                
            // })
            //映射后使用
            this.addCart(product).then(res => {
                // console.log(res);
                // this.$toast.show(res)
                this.$toast.show(res);
                
            })
        }
    },
    mounted(){
    //   const refresh = debounce(this.$refs.scroll.refresh,500)
    //   this.ItemImgListener = () => refresh() 
    //   this.$bus.$on("imageLoad",
    //     this.ItemImgListener
    //   )
    },
    mixins:[itemImgListerMixin,backTopMixin],
    destroyed(){
        this.$bus.$off("imageLoad",
            this.ItemImgListener
        )
    }
}

</script>

<style scoped>
.detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color:#ffffff;
}
.detail_scroll_content{
        position: absolute;
        overflow: hidden;
        top: 44px;
        bottom: 0;
        left: 0;
        right: 0
}
/* .detail_navbar{
   position: relative;
    z-index: 9; 
    background-color: #ffffff;
} */
</style>