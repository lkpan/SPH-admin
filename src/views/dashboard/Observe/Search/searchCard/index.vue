<template>
  <div>
    <div class="search-info">
        <i>搜索用户数</i>
    <i class="el-icon-warning-outline" style="margin-left: 10px;"></i>
    </div>
    <div class="aboveChart">
        <span style="font-size: 20px;">12321</span>
        <span style="margin-left: 15px;">171.1</span>
        <i class="el-icon-sort-up"></i>
    </div>
    <div ref="charts" class="charts"></div>
    <!-- 底下表格排序 -->
    
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name:'searchCard',
    
    // props:['search-info','search-num','search-rate'],
    mounted() {
    // 初始化echarts实例
    let lineEcharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineEcharts.setOption({
      xAxis: {
        // 隐藏
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      // 系列
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 48, 9,44],
          // 设置拐点样式
          itemStyle: {
            opacity: 0,
          },
          // 线条样式
          lineStyle: {
            color: "purple",
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      // 布局调试
      grid: {
        left: 10,
        top: 10,
        right: 10,
        bottom: 10,
      },
    });
  },
}
</script>

<style>
.search-info{
    color: #ced0d2;
    }
.aboveChart{
    margin: 10px 10px 10px 0px;
}
.charts{
    width: 100%;
    height: 200px;
}
</style>