// 负责品牌模块的管理
// 获取品牌列表接口

import  request  from "@/utils/request";

// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})