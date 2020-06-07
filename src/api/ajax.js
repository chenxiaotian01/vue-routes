import axios from 'axios'
import NProgress from 'nprogress'

// 配置通用的基础路径和超时
const instance = axios.create({
    baseURL:'/api',
    timeout:15000  //请求超时的时间
})

// 注册请求拦截器
instance.interceptors.request.use(config =>{
    // 请求时显示
    NProgress.start()
    return config
})

// 注册响应拦截器
instance.interceptors.response.use(
    // 请求成功后的回调
    response =>{
        // 请求成功隐藏
        NProgress.done()
        return response.data
    },
    error => {
        // 请求失败隐藏
        NProgress.done()
        alert(error.message || '未知错误')
        return Promise.reject(error)
    }
)

// 向外暴露
export default instance