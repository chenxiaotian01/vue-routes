/* 
包含项目中所有接口的ajax请求函数
函数的返回值是promise, 函数内部调用ajax模块发请求

需要掌握一个技能: 根据接口文档, 定义接口请求函数
*/
import ajax from './ajax'
import mockAjax from './mockAjax'

/* 
登录
/api/user/passport/login
*/
export function reqLogin (mobile, password) {
  // 将ajax作为函数使用
  /* return ajax({
    url: '/user/passport/login',
    method: 'POST',
    data: {mobile, password}
  }) */

  // 将ajax作为对象使用
  return ajax.post('/user/passport/login', {mobile, password})
}

/* 
首页三级分类
/api/product/getBaseCategoryList GET
*/
export const reqCategoryList = () => ajax('/product/getBaseCategoryList')
/* 
export function reqCategoryList () {
  return ajax('/product/getBaseCategoryList')
} */

/* 
定义访问mock接口的接口请求函数
*/
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')
export const reqRecommends = () => mockAjax('/recommends')

/* 
获取商品列表
/api/list POST
options: 包含所有需要传递的搜索请求参数的对象
*/
export const reqProductList = (options) => ajax.post('/list', options)

/* 
获取商品详情信息
*/
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 获取购物车列表
export const reqShopCart = () => ajax.get('/cart/cartList')

// 添加到购物车（对已有物品进行数量改动）

export const reqAddToCart = (skuId,skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 切换某个购物项的选中状态

export const reqCheckChartItem = (skuId,isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 删除购物项商品

export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)

// 注册用户
export const reqRegister = (userInfo) => ajax.post('/user/passport/register',userInfo)

// 退出登录
export const reqLogout = () => ajax('/user/passport/logout')