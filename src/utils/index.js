// 包含一些工具函数的模块
import { v4 as uuidv4 } from 'uuid'

// 得到一个用户临时ID
export function getUserTempId(){
    // 从localStorage中读取，如果有就返回他
    let userTempId = localStorage.getItem('USER_TEMP_ID_KEY')
    // 如果没有，使用uuid生成一个新的，保存到localSttorage
    if(!userTempId){
        userTempId = uuidv4()
        localStorage.setItem('USER_TEMP_ID_KEY',userTempId)
    }
    // 返回他
    return userTempId
}

// 保存用户信息到local
export function saveUserInfo(userInfo){
    window.localStorage.setItem('USER_INFO_KEY',JSON.stringify(userInfo))

}

// 读取local中保存的用户信息

export function getUserInfo(){
    return JSON.parse(window.localStorage.getItem('USER_INFO_KEY')) || {}
}
// 删除local中保存的信息
export function removeUserInfo(){
    window.localStorage.removeItem('USER_INFO_KEY')
}