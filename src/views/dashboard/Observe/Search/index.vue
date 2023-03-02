<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header" class="clearfix">
        <div class="search-header">
          <span>线上热门搜索</span>
          <el-dropdown>
            <span class="el-dropdown-link">
                <i class="el-icon-more el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item >双皮奶</el-dropdown-item>
              <el-dropdown-item >蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="searchCharts">
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <searchCard
            ></searchCard>
          </el-col>

          <el-col :span="12" :offset="0">
            <searchCard></searchCard>
          </el-col>
        </el-row>
      </div>
      <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="排名"
      sortable
      width="80"
      type="index">
    </el-table-column>
    <el-table-column
      prop="name"
      label="搜索关键字"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="用户数"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="周涨幅"
      sortable
      >
    </el-table-column>
  </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination
    style="float: right;"
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
  </div>
</template>

<script>
import searchCard from "./searchCard";
export default {
    data() {
        return {
            tableData:[{}]
        }
    },
  components: { searchCard },
};
</script>

<style>
.search-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(238, 232, 232);
}
</style>