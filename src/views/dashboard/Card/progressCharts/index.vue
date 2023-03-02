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
        // 最小值与最大值的设置

      },
      yAxis: {
        show: false,
        type: "category",
      },
      // 系列
      series: [
        {
          // 图表：柱状图
          type: "bar",
          data: [60],
          color:'cyan',
          // 柱状图宽度
          barWidth:10,
          color:'yellow',
          // 背景颜色设置
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          // 文本
          label:{
            show:true,
            // 改变文本内容
            // formatter:'|',
            position:'right'
          }

          
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