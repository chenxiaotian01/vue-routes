import {reqShopCart,reqAddToCart} from '@/api'

const state = {
    cartList:[],
}

const mutations = {
    RECEIVE_CART_LIST(state,cartList){
        state.cartList = cartList
    }
}

const actions = {
    // 获取购物车列表数据的异步action
    async getCartList ({commit}){
        const result = await reqShopCart()
        if(result.code === 200){
            const cartList = result.data
            commit('RECEIVE_CART_LIST',cartList)
        }
    },
    // 添加到购物车的异步action
    async addToCart ({commit},{skuId,skuNum,callback}){
        const result = await reqAddToCart(skuId,skuNum)
        if(result.code === 200){
            // 通知组件成功了
            callback()
        }else{
            // 失败
            callback('添加购物车失败')
        }
    },

    // 添加到购物车的异步action
    async addToCart2 ({commit},{skuId,skuNum}){
        const result = await reqAddToCart(skuId,skuNum)
        if(result.code !== 200){
            // 通知组件成功了
            return '添加购物车失败'
        }else{
            // 失败
            return undefined
        }
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}