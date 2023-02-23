<template>
  <div>
    <el-form label-width="80px" :inline="false" size="normal" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" value="" v-model="spu.tmId">
          <el-option
            :value="tm.id"
            :label="tm.tmName"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" size="normal">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          size="normal"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片" size="normal">
        <!-- 上传图片
        action是图片上传的地址；list-type照片类型；on-preview预览；on-remove删除
        file-list:照片墙展示的数据
        -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" size="normal">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndName"
          value=""
          clearable
          filterable
        >
          <el-option
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="(unSelect, index) in unSelectSaleAttr"
            :key="unSelect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >

        <!-- 展示的是当前spu属于自己的销售属性 -->
        <el-table border stripe :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="id" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <!--  
                @close="handleClose(tag)" 
               @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              -->
              <!-- 用于展示已有属性值列表数据 -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- input与span切换 -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="id" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item size="normal">
        <el-button type="primary" size="default" @click="addOrUpdateSpu"
          >保存</el-button
        >
        <el-button @click='cancel'>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      attrIdAndName: "", // 收集未选择的销售属性id
      dialogImageUrl: "",
      dialogVisible: false,
      // 存储spu信息属性
      spu: {
        // 三级分类id
        category3Id: 0,
        // 描述
        description: "",
        // 收集spu图片信息
        spuImageList: [
          {
            // id: 0,
            // imgName: "",
            // imgUrl: "",
            // spuId: 0,
          },
        ],
        // spu名称
        spuName: "",
        // 平台id
        tmId: "",
        // 平台属性属性值
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "",
          //       saleAttrName: "",
          //       saleAttrValueName: "",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      tradeMarkList: {}, // 存储品牌信息
      spuImageList: [], // 存储spu图片数据
      saleAttrList: [], // 销售属性的数据
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // 收集照片墙图片数据
      this.spuImageList = fileList;
    },
    // 照片墙图片预览回调
    handlePictureCardPreview(file) {
      // 将图片地址给这个属性
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    // 初始化spuForm数据
    async initSpuData(spu) {
      // 获取spu信息数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        // 修改spu的时候，需要向服务器发送请求，把服务器返回数据赋值给spu
        this.spu = spuResult.data;
      }
      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();

      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        // 照片墙要求的数据要求有name和url字段
        // 需要把服务器返回的数据进行修改
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // 把整理好的数据复制给
        this.spuImageList = listArr;
      }
      // 获取平台全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 添加已经收集到的attr信息
      // 把收集到的销售属性进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(":");
      // 向spu对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      // 添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 清空数据
      this.attrIdAndName = "";
    },
    // 添加按钮回调
    addSaleAttrValue(row) {
      // 点击销售属性值的添加按钮时候，需要有button变为input时，通过inputVisible控制
      this.$set(row, "inputVisible", true);
      // 通过相应师叔数据inputVisible字段收集新增的销售属性
      this.$set(row, "inputValue", "");
    },
    // el-input失焦事件
    handleInputConfirm(row) {
      // 解构出销售属性当中的收集数据
      const { baseSaleAttrId, inputValue } = row;
      // 新增的销售属性值不能为空
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        row.inputVisible = false;
        return;
      }
      // 属性值不能重复
      // 问题还没修复
      let result = row.spuSaleAttrValueList.every((item) => {
        console.log(item.saleAttrValueName, inputValue);
        item.saleAttrValueName != inputValue;
      });
      if (result) {
        this.$message("数据已存在");
        row.inputVisible = false;
      }
      // 新增的销售属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      // 新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      // 显示button，修改inputVisible为false
      row.inputVisible = false;
    },
    // 保存按钮回调
    async addOrUpdateSpu() {
      // 整理参数：整理照片墙数据
      // 携带参数：对于图片，需要携带imageName和imageUrl字段
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if (result.code == 200) {
        // 提示
        this.$message({ type: "success", message: "保存成功" });
        // 回到场景0
        this.$emit("changeScene",{ scene:0, flag:this.spu.id?'添加':'修改'});
        // 清除数据
        Object.assign(this._data, this.$options.data())
      }
    },
    // 点击spu按钮函数
    async addSpuData(category3Id) {
      // 添加spu的时候收集三级分类id
      this.spu.category3Id = category3Id
      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取平台全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 取消按钮
    cancel(){
      // 通知父组件修改场景为0
      this.$emit('changeScene', {scene:0, flag:''})

      // 请理数据
      // Object.assign可以合并对象
      // this.$data 可以操作data当中的响应式数据
      // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空
      Object.assign(this._data, this.$options.data())
    }
  },
  computed: {
    // 计算出还未选择的销售属性  --saleAttrList
    // 当前spu拥有的属于自己的销售属性spu，spuSaleAttrList  --

    unSelectSaleAttr() {
      let result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>
    
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>