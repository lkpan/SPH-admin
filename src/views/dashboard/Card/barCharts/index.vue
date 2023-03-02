<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
export default {
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
          // 图表：柱状图
          type: "bar",
          data: [10, 7, 33, 12, 48, 9,44],
          
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
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>