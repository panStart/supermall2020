import Toast from './Toast'
const obj = {}
obj.install = function(Vue){
    // console.log(Vue);
    const toastContrustor = Vue.extend(Toast)
    const toast = new toastContrustor()
    toast.$mount(document.createElement('div'))
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast
    //此时的$toast == VueComponent对象
}

export default obj