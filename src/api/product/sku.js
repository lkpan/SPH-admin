import request from '@/utils/request'

// sku列表接口
// /admin/product/list/{page}/{limit}
export const reqSkuList = (page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})

// 上架
// /admin/product/onlSale/{skuId}
export const reqSale = (skuId)=>request({url:`/admin/product/onlSale/${skuId}`,method:'get'})

// 下架
// /admin/product/CancelSale/{skuId}
export const reqCancelSale = (skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

// 获取sku详情的接口
// /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})