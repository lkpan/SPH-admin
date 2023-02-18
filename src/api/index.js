// 将四个接口函数统一暴漏
import * as tradeMark from './product/tradeMark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'

// 对外暴露
export default {
    tradeMark,
    attr,
    spu,
    sku
}