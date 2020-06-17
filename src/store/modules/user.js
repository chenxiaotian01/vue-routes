/* 
管理用户数据的vuex子模块
*/
import {reqRegister,reqLogout,reqLogin} from '@/api'
import {getUserTempId} from '@/utils'
import {getUserInfo,removeUserInfo,saveUserInfo} from '@/utils'
export default {
  state: {
    userInfo: getUserInfo(), // 登陆用户的信息
    userTempId:getUserTempId()
  },
  mutations: {
    RECEIVE_USER_INFO(state,userInfo){
      state.userInfo = userInfo
    },
    RESET_USER_INFO(state){
      state.userInfo = {}
    }
  },
  actions: {
    // 注册
    async register({commit},userInfo){
      const result = await reqRegister(userInfo)
      if(result.code!==200){
        throw new Error(result.data || '注册失败')
      }
    },
    async login({commit},{mobile,password}){
      const result = await reqLogin(mobile,password)
      if(result.code==200){
        const userInfo = result.data
        commit('RECEIVE_USER_INFO',userInfo)
        saveUserInfo(userInfo)
      }else{
        throw new Error(result.message || '注册失败')
      }
    },
    async logout({commit}){
      const result = await reqLogout()
      if(result.code==200){
        
        commit('RESET_USER_INFO')
        removeUserInfo()
      }else{
        throw new Error(result.message || '注册失败')
      }
    },
  },
  getters: {}
}