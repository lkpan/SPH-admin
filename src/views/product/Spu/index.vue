<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene!=0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部有三个部分切换 -->
      <div v-show="scene == 0">
        <!-- 展示Spu列表结构 -->
        <el-button type="primary" size="default" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu"
          >添加Spu</el-button
        >
        <el-table border style="width: 100%" :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="Spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="Spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $idnex }">
              <!-- 这里将来用hitbutton替换 -->
              <hint-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加spu"
              ></hint-button>
              <hint-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                size="mini"
                icon="el-icon-info"
                title="查看当前spu的全部sku列表"
              ></hint-button>

              <el-popconfirm  title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                title="删除spu"
                slot="reference"
              ></hint-button>
              </el-popconfirm>

              
            </template>
          </el-table-column>
        </el-table>
        <!-- 
          分页器
          
         -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->, sizes,total"
          @current-change="getSpuList"
          @size-change="sizeChange"
          :total="total"
          :pager-count="7"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
// 引入子组件
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: { SkuForm, SpuForm },
  data() {
    return {
      // 分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动的可操作性
      show: true,
      page: 1, // 分页器当前第几页
      limit: 3, // 每页展示多少条数据
      records: [], // spu列表数据
      total: 0, // 分页器一共需要展示的条数
      scene: 0, // 0代表展示spu数据   1代表添加修改Spu 2添加sku
    };
  },
  methods: {
    // 点击分页器的第几页
    currentChange(page) {
      this.page = page;
      this.getSpuList();
    },
    // 把子组件相应的id传给父组件
    getCategoryId({ categoryId, level }) {
      // categoryId获取到一二三分类id   level：为了区分是几级id
      if (level == 1) {
        this.catogyri1Id = categoryId;
        // 清除二三级id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        // 清除三级id
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 获取数据列表进行展示
        this.getSpuList();
      }
    },
    // 获取Spu列表数据方法
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      // 携带三个参数page,limit,category3Id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 分页器某一个展示数据条数发生变化的回调
    sizeChange(limit) {
      // 修改参数再次发请求
      this.limit = limit;
      this.getSpuList();
    },
    // 添加spu按钮的回调
    addSpu(){
      this.scene = 1
      // 通知子组件spuForm发请求--两个
      this.$refs.spu.addSpuData(this.category3Id)
    },
    // 修改某一个SPU
    updateSpu(row){
      this.scene = 1
      // 获取子组件spuform
      // 父组件可以通过$refs获取子组件
      this.$refs.spu.initSpuData(row)
    },
    // 改变场景  自定义事件回调spuForm
    changeScene({scene,flag}){
      console.log('场景',scene,flag);
      this.scene = scene
      // falg是为了区分保存还是添加按钮
      if(flag=='修改'){
        this.getSpuList(this.page)
      }else{
        this.getSpuList()
      }
      // 子组件通知父组件切换场景，再次获取SPU聊表数据进行展示
      // this.getSpuList(this.page)
    },
    // 删除spu按钮回调
    async deleteSpu(row){
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if(result.code==200){
        this.$message({type:'success',message:'删除成功'})
        console.log(this.page);
        this.getSpuList(this.records.length>1?this.page:this.page-1)
      }
    }

  },
};
</script>

<style>
</style>