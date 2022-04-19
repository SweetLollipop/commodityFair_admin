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