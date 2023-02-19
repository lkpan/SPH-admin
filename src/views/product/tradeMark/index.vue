<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      size="default"
      icon="el-icon-plus"
      @click="showDialog"
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
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column label="品牌logo" width="width">
        <!-- 作用域插槽 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
            >删除</el-button
          >
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
      @size-change="sizeChange"
    >
    </el-pagination>

    <!-- 对话框 
    ：visible.sync:控制对话框显示与隐藏
    -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- form表单 :model作用是把表单数据收集到那个对象身上将来用来表单验证-->
      <el-form
        style="width: 80%"
        :model="tmForm"
        :rules="rules"
        ref="rulerForm"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
          <!-- 
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload" -->
          <!-- 这里收集数据;不能使用v-model，因为不是表单元素
  action：设置图片上传地址
  on-success:可以检测图片上传成功，会执行一次
  before:图片上传之前执行一次
 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动区域" label-width="100px"> </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    // 自定义校验规则
    var validateTmName = (rule, value, callback) => {
        if(value.length<2||value.length>10){
          callback(new Error('品牌名称2-10位'))
        }
      };
    return {
      // 分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 控制对话框显示与隐藏
      dialogFormVisible: false,
      // 收集品牌信息
      tmForm: {
        // 对象身上的属性
        tmName: "",
        logoUrl: "",
      },
      // 表单验证规则
      rules: {
        // 品牌名称验证规则
        tmName: [
          // trigger用户行为设置
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // 自定义校验规则
          { validator: validateTmName, trigger: 'change' }
          // { min: 2, max: 10, message: "长度在2-10个字符", trigger: "change" },
        ],
        // 品牌logo验证规则
        region: [{ required: true, message: "请选择图片", trigger: "change" }],
      },
    };
  },
  // 组件挂在完毕开始发送请求
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获取品牌列表数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构参数
      const { page, limit } = this;
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        // 展示数据的总条数和列表
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
      // 清除数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    // 修改某一品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    // 上传图片成功
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // res上传成功之后返回前端数据;file上传成功后服务器返回前端数据
      // 收集品牌图片数据，将来带给服务器
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加按钮（添加品牌|修改品牌）
    addOrUpdateTradeMark() {
      // 当全部验证字段通过再去书写业务逻辑
      this.$refs.rulerForm.validate(async (success) => {
        // 如果全部字段符合条件
        if (success) {
          this.dialogFormVisible = false;
          // 发请求(添加|修改品牌)
          let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200) {
            // 弹出信息:添加品牌成功、修改品牌成功
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 添加或者修改品牌成功后，需要再次获取品牌列表进行展示

            // 添加或者修改品牌成功后再次获取进行展示
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        }else{
          console.log('error submit');
          return false
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>