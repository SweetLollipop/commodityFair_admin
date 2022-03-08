import request from '@/utils/request';

/* 
    获取SPU列表数据的接口
    接口：/admin/product/{page}/{limit}
    请求类型：get
*/
export const reqSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id },
})

/* 
    获取SPU信息
    接口：/admin/product/getSpuById/{spuId}
    请求类型：get
*/
export const reqSpu = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get',
})

/* 
    获取品牌信息
    接口：/admin/product/baseTrademark/getTrademarkList
    请求类型：get
*/
export const reqTrademark = () => request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get',
})

/* 
    获取SPU图标的接口
    接口：/admin/product/spuImageList/{spuId}
    请求类型：get
*/
export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get',
})

/* 
    获取平台全部销售属性---整个平台销售属性一共三个
    接口：/admin/product/baseSaleAttrList
    请求类型：get
*/
export const reqBaseSaleAttrList = () => request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get',
}) 