import {reqShopCart,reqAddToCart,reqCheckCartItem} from '@/api'

const state = {
    cartList: [],
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
            console.log(cartList)
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
    async addToCart2 ({commit}, {skuId, skuNum}) {
        const result = await reqAddToCart(skuId, skuNum)
        // 如果请求的结果不正确, 抛出一个错误
        if (result.code!==200) {
          // 通知组件失败了
          throw new Error('添加购物车失败')  // action函数的promise失败了, reason为error
        }
      },
      async addToCart3 ({commit}, {skuId, skuNum}) {
        const result = await reqAddToCart(skuId, skuNum)
        // 如果请求的结果不正确, 抛出一个错误
        if (result.code!==200) {
          // 通知组件失败了
          return '添加购物车失败'  // action函数的promise失败了, reason为error
        }else{
            return undefined
        }
      },
    //   勾选或不勾选某个购物商品
      async checkCartItem ({commit},{skuId,isChecked}){
          const result = await reqCheckCartItem(skuId,isChecked)
          if(result.code!==200){
              throw new Error(result.message || '选中商品失败')
          }
      },
    //   全部勾选或不勾选
    async checkAllCartItems({commit,state,dispatch},checked){
        // 确定对应的ischecked值
        const isChecked = checked ? '1' : '0'
        let promises = []
        // 遍历没够购物项
        state.cartList.forEach(item =>{
        //    购物项的状态与目标状态不一样
            if(item.isChecked!=isChecked){
                // 分发给checkCartItem,得到其返回值的
                const promise = dispatch('checkCartItem',{skuId:item.skuId,isChecked})
                // 保存到数据中
                promises.push(promise)
            }
        })
        return Promise.all(promises)
    }
}
const getters = {
    // 选中的总数量
    totalCount(state){
        return state.cartList.reduce((preTotal,item) => preTotal + (item.isChecked===1?item.skuNum:0),0)

    },
    // 选中的总价格
    totalPrice(state){
        return state.cartList.reduce((pre,item) =>pre + item.skuNum * item.cartPrice,0)
    },
    // 是否全部选中
    isCheckAll(state){
        return state.cartList.length>0 && state.cartList.every((item) => item.isChecked===1)
    }


}
export default {
    state,
    mutations,
    actions,
    getters
}