<template>
  <div>
    <!-- inline代表行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm" :disabled="show">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          value=""
          v-model="cForm.category1Id"
          @change="handler1"
          
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" value="" v-model="cForm.category2Id" @change="handler2">
          <el-option :label="c2.name" :value="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" value="" v-model="cForm.category3Id" @change="handler3">
          <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      // 一级分类的数据
      list1: [],
      list2: [],
      list3: [],
      // 收集相应的一级二级三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  //   组件挂在完毕发送请求获取一级分类数据
  mounted() {
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      //一级不需要带参数
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    // 一级分类select事件回调
    async handler1() {
      // 变化时清除二级三级的数据
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      // 解构一级分类id
      const { category1Id } = this.cForm;
      this.$emit('getCategoryId',{categoryId:category1Id,level:1})
      let result = await this.$API.attr.reqCategory2List(category1Id);
      if(result.code==200){
        this.list2 = result.data
      }
    },
    // 二级分类的事件回调
    async handler2() {
      // 清除三级分类id
      this.list3 = []
      this.cForm.category3Id = ''
      // 解构二级分类id
      const { category2Id } = this.cForm;
      this.$emit('getCategoryId',{categoryId:category2Id,level:2})
      let result = await this.$API.attr.reqCategory2List(category2Id);
      if(result.code==200){
        this.list3 = result.data

      }
    },
    // 三级分类的事件回调
    handler3(){
      // 获取三级分类id
      const {category3Id} = this.cForm
      this.$emit('getCategoryId',{categoryId:category3Id,level:3})
    }
  },
};
</script>

<style>
</style>