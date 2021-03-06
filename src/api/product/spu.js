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

/* 
{
  "category3Id": 0,
  "tmId": 0,
  "description": "string",
  "spuName": "string",
  "tmId": 0,
  "spuImageList": [
    {
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "spuId": 0
    }
  ],
  "spuSaleAttrList": [
    {
      "baseSaleAttrId": 0,
      "id": 0,
      "saleAttrName": "string",
      "spuId": 0,
      "spuSaleAttrValueList": [
        {
          "baseSaleAttrId": 0,
          "id": 0,
          "isChecked": "string",
          "saleAttrName": "string",
          "saleAttrValueName": "string",
          "spuId": 0
        }
      ]
    }
  ],
}
*/

/* 
    修改SPU|添加SPU---对于修改或者添加，携带给服务器参数大致是一样的，唯一的区别就是携带的参数是否带id
    接口：/admin/product/saveSpuInfo   /admin/product/updateSpuInfo
    请求类型：post
*/
export const reqAddOrUpdateSpu = (spuInfo) => {
  //携带的参数带有id---修改spu
  if (spuInfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo,
    })
  } else {
    //携带的参数不带id---新增spu
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo,
    })
  }
}

/* 
    删除SPU
    接口：/admin/product/deleteSpu/{spuId}
    参数：id
    请求类型：delete
*/
export const reqDeleteSpu = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete',
})

/* 
    获取图片的数据
    接口：/admin/product/spuImageList/{spuId}
    请求类型：get
*/
/* export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get',
}) */

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

/* 
  添加SKU
  接口：/admin/product/saveSpuInfo
  请求类型：post
*/
export const reqAddSku = (skuInfo) => request({
  url: '/admin/product/saveSpuInfo',
  method: 'post',
  data: skuInfo,
})

/* 
  获取SKU列表数据的接口
  接口：/admin/product/findBySpuId/{spuId}
  请求类型：get
*/
export const reqSkuList = (spuId) => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'get',
})