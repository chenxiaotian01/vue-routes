// 管理首页数据的vuex子模块
// 首页三级列表
import {reqCategoryList,reqBanners,reqFloors,reqTodays} from '@/api'
// 暴露
export default {
    state:{
        categoryList:[],//分类列表
        banners:[],
        floors:[],
        todays:[]
    },
    mutations:{
        RECEIVE_TODAYS (state,todays){
            state.todays = todays
        },
        // 接受保存广告轮播图
        RECEIVE_BANNERS(state,banners){
            state.banners = banners
        },
        // 接受保存楼层列表
        RECEIVE_FLOORS(state,floors){
            state.floors = floors
        },
        // 接收保存分类列表的mutation
        RECEIVE_CATEGORY_LIST(state,categoryList){
            state.categoryList = categoryList
        }
    },
    actions:{
        
        async getBanners ({commit}){
            const result = await reqBanners()
            if(result.code === 200){
                const banners = result.data
                commit('RECEIVE_BANNERS',banners)
            }
        },
        async getFloors ({commit}){
            const result = await reqFloors()
            if(result.code === 200){
                const floors = result.data
                commit('RECEIVE_FLOORS',floors)
            }
        },
        async getTodays ({commit}){
            const result = await reqTodays()
            if(result.code === 200){
                const todays = result.data
                commit('RECEIVE_TODAYS',todays)
            }
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