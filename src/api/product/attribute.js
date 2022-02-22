//平台属性管理模块请求文件
import request from '@/utils/request'

/* 
    获取一级分类的接口
    接口: /admin/product/getCategory1
    请求类型：get
*/
export const reqCategory1List = () => request({
    url: '/admin/product/getCategory1',
    method: 'get',
})
/* 
    获取二级分类的接口
    接口: /admin/product/getCategory2/{category1Id}
    请求类型：get
*/
export const reqCategory2List = (category1Id) => request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get',
})
/* 
    获取三级分类的接口
    接口: /admin/product/getCategory3/{category2Id}
    请求类型：get
*/
export const reqCategory3List = (category2Id) => request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get',
})
/* 
    获取平台属性接口
    接口：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
    请求类型：get
*/
export const reqAttributeList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get',
})
/* 
    添加属性名称与属性值接口
    接口：/admin/product/saveAttrInfo
    请求类型：post
    参数：{
            "attrName": "string",  //属性名称
            "attrValueList": [     //属性名称中的属性值，数组类型
                {
                "attrId": 0,       //属性id
                "valueName": "string"    //属性值
                }
            ],
            "categoryId": 0,       //category3Id
            "categoryLevel": 3,    //category3Id
        }
*/
export const reqAddAttribute = (data) => request({
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    data
})