import Vue from 'vue'
// vuex 最核心的管理对象：store(仓库)
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user';
Vue.use(Vuex)

// const state ={}
const mutations ={
    test2(state){

    }
}
const actions ={}
const getters ={}
// 向外暴露
export default new Vuex.Store({
    // 总的
    // state,
    mutations,
    actions,
    getters,
    // 指定vuex管理所有的子模块
    modules: {
        home,
        user
    }
})