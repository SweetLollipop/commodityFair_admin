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