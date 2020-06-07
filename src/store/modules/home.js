// 管理首页数据的vuex子模块
// 首页三级列表
import {reqCategoryList} from '@/api'
// 暴露
export default {
    state:{
        categoryList:[],//分类列表
        xxx:{},
        yyy:'xiaotian'
    },
    mutations:{
        test1(state){
            
        },
        // 接收保存分类列表的mutation
        RECEIVE_CATEGORY_LIST(state,categoryList){
            state.categoryList = categoryList
        }
    },
    actions:{
        test3({commit,state}){

        },
        // 获取分类列表的异步actions
        async getCategoryList ({commit}){
            // 调用接口发送异步请求
            const result = await reqCategoryList()
            console.log('result',result)
            if(result.code === 200){
                const categoryList = result.data.filter((item,index) => index < 15)
                commit('RECEIVE_CATEGORY_LIST',categoryList)
            }
        }
    },
    getters:{
        test4(state){
            
        }
    }
}