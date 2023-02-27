<template>
  <div>
    <el-form label-width="80px" size="normal" ref="form">
      <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称" size="normal">
        <el-input placeholder="SKU名称" size="normal" v-model="skuInfo.skuName" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" size="normal">
        <el-input placeholder="价格(元)" size="normal" type="number" v-model="skuInfo.price" clearable></el-input>
      </el-form-item>
      <el-form-item label="重量(kg)" size="normal">
        <el-input placeholder="重量(kg)" v-model="skuInfo.weight" size="normal" clearable></el-input>
      </el-form-item>
      <el-form-item label="规格描述" size="normal">
        <el-input
          placeholder="重量(kg)"
          type="textarea"
          rows="4"
          size="normal"
          clearable
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性" size="normal">
        <el-form ref="form" label-width="80px" :inline="true" size="normal">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id" :inline-message="true">
            <el-select
              value-key=""
              placeholder="请选择"
              value=""
              clearable
              filterable
              v-model="attr.attrIdAndValue"
            >
              <el-option :key="attrvalue.id" :label="attrvalue.valueName"  :value="`${attr.id}:${attrvalue.id}`" v-for="attrvalue in attr.attrValueList">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性" size="normal">
        <el-form ref="form" label-width="80px" :inline="true" size="normal">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select
              value-key=""
              placeholder="请选择"
              value=""
              clearable
              filterable
              v-model="saleAttr.attrIdAndValue"
            >
              <el-option v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表" size="normal">
        <el-table border stripe :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column
            prop="col.id"
            label="label"
            width="col.width"
            type="selection"
          >
          </el-table-column>
          <el-table-column prop="col.id" label="图片" width="col.width">
            <template slot-scope="{row, $index}">
              <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
          <el-table-column prop="col.id" label="名称" width="col.width">
          </el-table-column>
          <el-table-column prop="col.id" label="操作" width="col.width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="default" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="" size="normal">
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片信息
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrList: [],
      // 存储平台属性数组
      attrInfoList: [],
      // 收集SKu数据的字段
      skuInfo: {
        // 第一类收集的数据：父组件给的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类，需要通过数据双向绑定v-model收集
        price: 0,
        skuName:'',
        weight: "",
        skuDesc: "",
        // 第三类需要自己写代码收集
        // 默认字段
        skuDefaultImg: "",
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        skuName: "",
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu:{},
      // 收集图片的字段：缺少default字段，提交给服务器的时候需要整理参数
      imageList:[]
    };
  },
  methods: {
    // 获取skuForm数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件传递的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      // 获取图图片的数据
      let result = await this.$API.spu.reqSpuImageList(spu.id);
      if (result.code == 200) {
        let list = result.data;
        list.forEach(item => {
          item.isDefault = 0
        });
        this.spuImageList = list
      }
      //  获取销售属性的数据
      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      //  获取平台属性的数据
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // table表格复选框按钮事件
    handleSelectionChange(params){
      // 获取用户选中图片信息，但是缺少isDefault字段
      this.imageList = params
    },
    // 派他思想，修改isDefault
    changeDefault(row){
      // 图片列表的isDeault字段变为0
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      });
      row.isDefault = 1
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 取消按钮
    cancel(){
      this.$emit('changeScene',{scene:0,flag:''})
      Object.assign(this._data,this.$options.data())
    },
    // 保存按钮案件
    async save(){
      // 整理参数
      const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this
      // 新建数组
      let arr = []
      // 把收集到的数据整理一下
      // 当前平台用户进行选择
      attrInfoList.forEach(item => {
          if(item.attrIdAndValue){
            const [attrId,valueId] = item.attrIdAndValue.split(':')
            // 携带给服务器参数应该是对象
            let obj = {valueId,attrId}
            arr.push(obj)
          }
      });
      // 将整理好的参数赋值给skuInfo,skuAttrInfoList
      skuInfo.skuAttrValueList = arr
      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
        if(item.attrIdAndValue){
          const [saleAttrId,saleAttrValue] = item.attrIdAndValue.split(':')
          prev.push({saleAttrId,saleAttrValue})
        }
        return prev
      },[])
      // 整理图片数据
      skuInfo.skuImageList = imageList.map(item=>{
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id,

        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddSku(skuInfo)
      if(result.code==200){
        this.$message({type:'success',message:'添加SKU成功'})
        this.$emit('changeScene',{scene:0,flag:''})
        Object.assign(this._data,this.$options.data())
      }
    }

  },
};
</script>

<style>
</style>