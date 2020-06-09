import Vue from 'vue'
import 'swiper/css/swiper.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Carousel from './components/carousel'
import './mock/mockServer'
// 注册全局组件（所有组件都可以看得到）
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
