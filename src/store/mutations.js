const mutations = {
    addCounter(state,payload){
        payload.count ++
    },
    addToCart(state,payload){
        payload.checked = true
        state.cartList.push(payload)
    },
    checkChange(state,payload){
        state.cartList[payload].checked = !state.cartList[payload].checked
    }
    
}
export default mutations