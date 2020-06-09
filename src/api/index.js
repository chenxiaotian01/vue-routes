import ajax from './ajax'
import mockAjax from './mockAjax'

// 登录
export function reqLogin (mobile,password){
    // 讲ajax作为函数使用
    return ajax({
        url:'/user/passport/login',
        method:'POST',
        data:{mobile,password}
    })
}

// 首页三级分类
export const reqCategoryList = () =>ajax('/product/getBaseCategoryList')

// 定义访问mock接口的请求函数
export const reqBanners = () =>mockAjax('/banners')
export const reqFloors = () =>mockAjax('/floors')

// 获取商品列表
export const reqProductList = (options) => ajax.post('/list',options)

export const reqTodays = () =>mockAjax('/todays')