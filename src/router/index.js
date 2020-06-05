import Vue from 'vue'
import vueRouter from 'vue-router'
import routes from './routes'
Vue.use(vueRouter)

export default new vueRouter({
  mode:'history',
  routes
})