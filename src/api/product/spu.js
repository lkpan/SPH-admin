import request from '@/utils/request'

// 获取SPU列表数据的接口
// /admin/product/{page}/{limit} get 
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

// 获取spu信息
// /admin/product/getSpuById/{spuId} get
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

// 获取品牌信息
// /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = ()=>request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})

// 获取spu图片接口
// /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取平台全部销售属性-整个平台一共三个
//  /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = ()=>request({url:'/admin/product/baseSaleAttrList',method:'get'})

// 修改 spu||添加spu   两者带给服务器参数大致是一样的，区别是携带参数是否有id
export const reqAddOrUpdateSpu = (spuInfo)=>{
    // 携带的参数有id，表示修改spu
    if(spuInfo.id){
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})

    }else{
        // 不带参数
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }
}

// 删除spu
// /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})

// 获取图片的接口
// /admin/product/spuImageList/{spuId} get
// export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取销售属性的数据
// /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

// 获取平台属性数据
export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 添加SKU
// /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({url:`/admin/product/saveSkuInfo`,method:'post',data:skuInfo})

// 获取SKU列表数据的接口
// /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})