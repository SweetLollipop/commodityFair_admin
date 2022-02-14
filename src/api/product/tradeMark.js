/* 
  获取品牌管理数据的模块
  
  获取品牌列表接口
  /admin/product/baseTrademark/{page}/{limit}
*/
import request from '@/utils/request'

export function reqTradeMarkList(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get',
  })
}

/* 
  新增品牌
  接口：/admin/product/baseTrademark/save
  post请求
  携带两个参数：品牌名称、品牌LOGO
  切记：对于新增的品牌，给服务器传递数据，不需要传递id,id是服务器生成的
*/

/* 
  修改品牌
  接口：/admin/product/baseTrademark/update
  get请求
  携带三个参数：id、品牌名称、品牌LOGO
  切记：需要传递id
*/

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if(tradeMark.id){ //修改品牌，判断是否携带id
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tradeMark,
    })
  }else{ //新增品牌
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark,
    })
  }
}