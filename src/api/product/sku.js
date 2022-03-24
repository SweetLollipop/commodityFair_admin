import request from '@/utils/request';

/* 
    获取图片的数据
    接口：/admin/product/spuImageList/{spuId}
    请求类型：get
*/
export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get',
})

/* 
    获取销售属性
    接口：/admin/product/spuSaleAttrList/{spuId}
    请求类型：get
*/
export const reqSpuSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get',
})

/* 
    获取平台属性的数据
    接口：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
    请求类型：get
*/
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get',
})