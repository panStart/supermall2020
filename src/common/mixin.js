import { debounce } from 'common/utils'
import BackTop from 'components/common/backTop/BackTop'
import { BACKTOP_DISTANCE } from 'common/const'
export const itemImgListerMixin = {
   data(){
       return {
            ItemImgListener:null, 
       }
   },
   mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,500)
        this.ItemImgListener = ()=> refresh() 
            this.$bus.$on("imageLoad",
            // ()=>{
            //   // 防抖处理前
            //   //console.log("------");
            //   //this.$refs.scroll.refresh();
            //   //观看处理后的结果
            //   // console.log(this.$refs.scroll.scroll.scrollerHeight);
            //   //防抖处理后
            //   refresh()
            // }
            this.ItemImgListener
        )
        // console.log("混入的内容");
        
   }
   
}

export const backTopMixin = {
    data(){
        return{
            isShowBackTop:false,
        }
    },
    components:{
        BackTop
    },
    methods:{
        backTop(){
          //this.$refs.scroll可以拿到scroll组件里的数据方法
          //方案一太复杂,方案二封装
          // this.$refs.scroll.scroll.scrollTo(0,0)
          this.$refs.scroll.scrollTo(0,0)
        },
        listenShowBackTop(position){
            this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
        },
     }    
}