<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button 
          @click.native="checkClick"
          :is-checked = "isSelectAll"
        class="check-btn"></check-button>
        <span>全选</span>
      </div>
      
      <div class="price">总计：{{totalPrice}}</div>
      <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>

 

</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name:'',
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice(){
            return "￥" + this.cartList.filter(item => {
                return item.checked
                
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
    },
    checkLength() {
            return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
            if (this.cartList.length == 0) return false
            // return !(this.cartList.filter(item => !item.checked).length)
            return !this.cartList.find(item => !item.checked)
            // for (let item of this.cartList) {
            //     if(!item.checked){
            //         return false
            //     }
            // }
            //return true
        }
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
            if (this.isSelectAll) {
                this.cartList.forEach(item => item.checked = false);
            } else {
                this.cartList.forEach(item => item.checked = true)
            }
            
            //简化错误方式：会相互影响isSelectAll/checked
            // this.cartList.forEach(item => item.checked =!this.isSelectAll);

        },
    calcClick() {
            // if(!this.isSelectAll) {
            //     alert('请选择购买的商品',2000)
            // }
        }
  }
}
</script>
<style scoped>
.bottom-bar{
        position: relative;
        display: flex;

        height: 40px;
        line-height: 40px;
        bottom: 40px;

        background-color:#eee;  
}
.check-content{
        display: flex;
        align-items:center;
        margin-left: 5px;
        font-size: 15px;
        width: 70px
    }
.price {
        margin-left: 20px;
        flex:1
    }   
.check-btn{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }    
.calculate{
        width: 90px;
        background-color: red;
        color: #fff;
        text-align: center
    }     
</style>