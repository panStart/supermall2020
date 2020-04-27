const action = {
    addCart(context,payload){
        // let oldProduct = null
        // for (let item of state.cartList) {
        //     if(item.iid == payload.iid){
        //         oldProduct = item
        //     }
        // }
        // if(oldProduct){
        //     oldProduct.count ++
        // }else{
        //     payload.count = 1
        //     state.cartList.push(payload)
        // }
        let oldProduct = context.state.cartList.find(item => {
            // console.log(item.iid,payload.iid)
            
            return item.iid == payload.iid
        })
        console.log(oldProduct);
        
        if(oldProduct){
            // oldProduct.count ++
            //无法件监听，必须将改变的结果逻辑添加到mutations里
            context.commit('addCounter',oldProduct)
        }else{
            payload.count = 1
            // context.state.cartList.push(payload)
            context.commit('addToCart',payload)
        }
    }
}
export default action