<template>
  <div>
    <!-- 按钮 -->
    <el-button 
    type="primary" 
    size="default" 
    icon="el-icon-plus"
      >添加</el-button
    >
    <!-- 表格组件 data是将来要展示的数据，数组类型
    data：表格组将将来的数据--数组类型
    border： 给表格添加边框
    Colum属性
    label：显示标题
    width： 对应列的宽度
    align： 标题的对齐方式
    prop： 对应内容的字段名
    展示的数据是以 列 进行展示
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"> </el-table-column>
      <el-table-column label="品牌logo" width="width"> 
        <!-- 作用域插槽 -->
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width"> 
        <template slot-scope="{row,$index}">
          <el-button type="warning" size="mini" icon="el-icon-edit">修改</el-button></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button></el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
    当前页，总页数，
    @size-change="sizeChange"
      @current-change="currentChange"
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes, total"
      :total="99"
      background
      :pager-count="7"
      @current-change="getPageList"
      @size-change="getPageList"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
    };
  },
  // 组件挂在完毕开始发送请求
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取品牌列表数据
    async getPageList(pager = 1) {
      this.page = pager
      // 解构参数
      const { page, limit } = this;
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        // 展示数据的总条数和列表
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    sizeChange(limit){
      this.limit = limit
      this.getPageList()
    }
  },
};
</script>

<style>
</style>