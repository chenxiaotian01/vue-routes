import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

// 保存原本的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象重新定义push
VueRouter.prototype.push = function (location,onComplete,onAbort){
  // 这里的this是VueRouter
  if(!onComplete && !onAbort){
    return originPush.call(this,location).catch(error =>{
      console.log('---push',error.message)
    })
  }else{
    originPush.call(this,location,onComplete,onAbort)
  }
}

VueRouter.prototype.replace = function (location,onComplete,onAbort){
  // 这里的this是VueRouter
  if(!onComplete && !onAbort){
    return originReplace.call(this,location).catch(error =>{
      console.log('---replace',error.message)
    })
  }else{
    originReplace.call(this,location,onComplete,onAbort)
  }
}
// 向外暴露
export default new VueRouter({
  mode:'history',
  routes
})