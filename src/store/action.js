import { Promise } from "core-js"

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
        return new Promise((reslove,reject) => {
            let oldProduct = context.state.cartList.find(item => {
                // console.log(item.iid,payload.iid)
                
                return item.iid == payload.iid
            })
            // console.log(oldProduct);
            
            if(oldProduct){
                // oldProduct.count ++
                //无法件监听，必须将改变的结果逻辑添加到mutations里
                context.commit('addCounter',oldProduct)
                reslove("当前商品数量+1")
            }else{
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit('addToCart',payload)
                reslove("添加新商品")
            }
        })
    },
    checkedChange(context,payload){
        // state.checked = !state.checked;
        // console.log(payload);
        // console.log(context.state.cartList);
        const res = context.state.cartList.findIndex(item => item == payload)
        context.commit('checkChange',res)
        
        
    }
}
export default action