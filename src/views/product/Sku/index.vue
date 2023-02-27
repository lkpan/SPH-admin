<template>
  <div>
    <!-- 表格 -->
    <el-table border stripe :data="records">
      <el-table-column
        prop=""
        label="序号"
        type="index"
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="80px">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80px">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80px">
      </el-table-column>
      <el-table-column prop="" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-down"
            title="下架"
            v-if="row.isSale == 1"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-up"
            title="上架"
            v-else
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="getSkuList"
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      background
    >
      :pager-count="7">
    </el-pagination>

    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              style="margin: 8px"
              type="success"
              size="normal"
              effect="dark"
              v-for="(attr, index) in skuInfo.skuAttrValueList"
              :key="attr.id"
              >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" style="background-repeat: no-repeat;background-size: contain;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, // 代表当前第几页
      limit: 3, // 代表当前页面有几条数据
      records: [], // 存储sku列表数据
      total: 0, // 存储分页器一共展示的数据
      skuInfo: {}, // 存储sku对象
      show: false, // 控制抽屉隐藏
    };
  },
  methods: {
    // 获取sku列表数据
    async getSkuList(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 当前页条数改变时
    sizeChange(limit) {
      console.log(limit);
      // 修改参数
      this.limit = limit;
      this.getSkuList(this.page, limit);
    },
    // 上架操作
    // 下面这里思路不一样,isSale为0代表下架状态,1为在售状态
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    async cancel(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    // 编辑按钮
    edit() {
      this.$message({ type: "success", message: "正在开发中" });
    },
    // 获取sku详情的接口
    async getSkuInfo(row) {
      // 展示抽屉
      this.show = true;
      // 获取sku数据
      let result = await this.$API.sku.reqSkuById(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
  },
  // 组件挂在完成
  mounted() {
    // 获取sku列表方法
    this.getSkuList();
  },
};
</script>

<style>
.el-col el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }
</style>