const getters = {
    //计算一共有多少个商品
    cartLength(state){
        return state.cartList.length
    },
    //获取cartList的所有商品
    cartList(state){
        return state.cartList
    }
}
export default getters