// 平台属性管理模块请求文件
import request from '@/utils/request'

// 获取一级分类接口
//  /admin/product/getCategory1 get
export const reqCategory1List = () => request({url:'/admin/product/getCategory1',method:'get'})
// 获取二级分类接口
export const reqCategory2List = (category1id) => request({url:`/admin/product/getCategory2/${category1id}`,method:'get'})
// 获取三级分类接口
export const reqCategory3List = (category2id) => request({url:`/admin/product/getCategory3/${category2id}`,method:'get'})
// 获取平台属性接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
// 添加属性与属性值接口
// /admin/product/saveAttrInfo post
export const reqAddOrUpdateAttr = (data)=>request({url:`/admin/product/saveAttrInfo`,method:'post',data})