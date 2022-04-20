import request from '@/utils/request';

/* 
    获取SKU列表数据的接口
    接口：/admin/product/list/{page}/{limit}
    请求类型：get
*/
export const reqSkuList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'get',
})

/* 
    上架
    接口：/admin/product/onSale/{skuId}
    请求类型：get
*/
export const reqOnSale = (skuId) => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'get',
})

/* 
    下架
    接口：/admin/product/cancelSale/{skuId}
    请求类型：get
*/
export const reqCancelSale = (skuId) => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'get',
})