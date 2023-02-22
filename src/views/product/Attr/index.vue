<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="default"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格展示平台属性 -->
        <el-table border :data="attrList" style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="" label="属性值列表" width="">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加属性|修改属性的解构 -->
      <div v-show="!isShowTable">
        <el-form ref="form" label-width="80px" :inline="true" :model="attrInfo">
          <el-form-item label="属性名" size="normal">
            <el-input
              placeholder="请输入属性名"
              size="normal"
              clearable
              v-model="attrInfo.attrName"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里span与input来回切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!-- 气泡确认框 -->
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                  ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收服务器平台的字段
      attrList: [],
      // 控制table显示与隐藏
      isShowTable: true,
      // 收集新增属性|修改属性
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [
          // 属性值，属性值有多个，因此用数组
        ],
        categoryId: 0, // 三级分类id
        categoryLevel: 3, // 区分几级id
      },
    };
  },
  methods: {
    // 自定义事件回调
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 发请求获取平台属性数据
        this.getAttrList();
      }
    },
    // 获取平台属性
    // 用户确定三级分类时，发请求获取数据展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值回调
    addAttrValue() {
      // 向属性值数组里面添加元素
      // valueName是相应的属性值名称
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, // 修改某一属性值时，可在已有属性值基础之上新增新的属性值，把id带上
        valueName: "",
        //  给每个属性值添加一个标记flag，可以单独控制切换模式
        flag: true,
      });
      // 响应式数据
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = false;
      // 清除数据
      // 收集三级分类的id
      this.attrInfo = {
        attrName: "", // 属性名
        attrValueList: [
          // 属性值，属性值有多个，因此用数组
        ],
        categoryId: 0, // 三级分类id
        categoryLevel: 3, // 区分几级id
      };
    },
    // 修改某一个属性
    updateAttr(row) {
      // isShowTable变为false
      this.isShowTable = false;
      // 将选中的属性赋值给attrInfo
      // 深拷贝
      this.attrInfo = cloneDeep(row);
      // 在修改某一个属性值的时候，将相应的属性值元素添加flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        // item.flag = false vue无法剪视普通的新属性
        // 参数：（对象，添加值的属性，添加的值）
        this.$set(item, "flag", false);
      });
    },
    // 失去焦点的事件，切换为查看模式，展示span
    toLook(row) {
      // 输入的属性值不能为空
      if (row.valueName.trim() == "") {
        this.$message("请输入合法的属性值");
        return;
      }
      // 新增的属性值不能和原来的一样
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        // 需要将row从数组里面判断的时候去除
        // row是最新增加的属性值【数组的最后一项元素】
        // 判断的时候，已有数组中新增的属性值去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) {
        this.$message("此属性已存在");
        // 重复则删除最后的一个数据
        this.attrInfo.attrValueList.pop();
      }
      // 当前用户添加的最新属性值
      // 当前模式变为查看模式
      row.flag = false;
    },
    // 输入框自动聚焦
    toEdit(row, index) {
      row.flag = true;
      // 获取input节点。实现自动聚焦
      // 点击span需要耗费时间。不会马上获取到input
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 气泡确认框确认删除
    // 不同版本饿了么ui确认键不一样onConfirm/confirm
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 添加属性或者修改属性
    async addOrUpdateAttr(){
      // 整理参数：如果用户添加空值不应该提交给服务器
      // 提交给服务器不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        // 过滤掉属性值不为空的
        if(item.valueName!=''){
          // 删除flag属性
          delete item.flag
          return true
        }
      })
      // 发请求
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({type:'success',message:'保存成功'})
        // 保存成功要进行展示
        this.getAttrList()
      } catch (error) {

      }
    }
  },
};
</script>

<style>
</style>