import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
//安装toast插件
//使用插件，会调用该插件的install方法
Vue.use(toast)


Vue.config.productionTip = false
//设置事件总线
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// function Dog(){
//   this.name = "xiaoyu"
// }
// const dog = new Dog()
// class Person {
//   constructor(){
//     this.name="xiaoyu"
//   }
// }


