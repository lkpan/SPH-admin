// 负责品牌模块的管理
// 获取品牌列表接口

import  request  from "@/utils/request";

// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

// /admin/product/baseTrademark/save  新增品牌， 携带参数品牌名称，品牌logo
// id由服务器生成


// 修改品牌数据 /admin/product/baseTrademark/update put请求 参数：id、品牌名称、logo
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    // 带给服务器携带id--修改
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        // 新增品牌
        return request({url:"/admin/product/baseTrademark/save",method:'post',data:tradeMark})
    }
}

// 删除品牌接口
export const reqDeleteTrademark = (id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})

