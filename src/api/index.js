import ajax from './ajax'

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