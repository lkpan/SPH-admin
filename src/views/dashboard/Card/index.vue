<template>
  <div>
    <el-row :gutter="20">
        <!-- 第一个card -->
      <el-col :span="6">
        <!-- 第一个card -->
        <el-card>
          <Detail :title="'总销售额'" count="￥ 12560">
            <template slot="charts">
                <span>周同比&nbsp;&nbsp;56.67%</span>
                <svg t="1677495172529" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2459" width="16" height="16"><path d="M529.143158 7.436293l347.212925 397.874796a21.748783 21.748783 0 0 1-16.375554 36.077393h-170.66398a21.492915 21.492915 0 0 0-21.492915 18.678367c-12.793402 92.624229-90.065549 502.268955-455.95684 562.909679a21.748783 21.748783 0 0 1-17.654895-38.380206c62.687669-49.126663 144.56544-144.309572 167.593564-313.694212a1571.285609 1571.285609 0 0 0 12.793402-207.508977 22.260519 22.260519 0 0 0-21.748783-22.260519H165.298811a21.748783 21.748783 0 0 1-16.375554-36.077393L496.39205 7.436293a21.748783 21.748783 0 0 1 32.751108 0z" p-id="2460" fill="#1afa29"></path></svg>
                <span>日同比&nbsp;&nbsp;19.96%</span>
                <svg t="1677495509739" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3742" width="16" height="16"><path d="M938.581333 812.117333l-24.746666-204.714666a8.277333 8.277333 0 0 0-13.994667-4.821334l-61.098667 61.013334-279.637333-278.698667a16.597333 16.597333 0 0 0-23.253333 0l-104.96 104.533333-285.141334-284.373333a8.277333 8.277333 0 0 0-11.648 0L87.722667 251.52a8.234667 8.234667 0 0 0 0 11.605333l331.52 330.794667c6.4 6.485333 16.938667 6.485333 23.338666 0l104.917334-104.533333 232.96 232.277333-61.098667 60.970667a8.234667 8.234667 0 0 0 4.864 13.952l205.312 24.661333a8.106667 8.106667 0 0 0 9.045333-9.130667z" fill="#d81e06" p-id="3743"></path></svg>
            </template>
            <template slot="footer">
                    <span>日销售额 ￥12432</span>
            </template>
        </Detail>
        </el-card>
      </el-col>

      <!-- 第二个card -->
      <el-col :span="6"
        ><el-card>
          <Detail :title="'访问量'" count="88460">
            <template slot="charts">
                <linecharts></linecharts>
            </template>
            <template slot="footer">
                <span>日访问量 1234</span>
            </template>
        </Detail>
        </el-card></el-col
      >

    <!-- 第三个card -->
      <el-col :span="6"
        ><el-card>
          <Detail :title="'支付笔数'" count="88460">
            <template slot="charts">
                <barCharts></barCharts>
            </template>
            <template slot="footer">
                <span>转换率64%</span>
            </template>
        </Detail>
        </el-card></el-col
      >

        <!-- 第四个card -->
      <el-col :span="6"
        ><el-card>
          <Detail :title="'运营活动效果'" count="78%">
            <template slot="charts">
                <progressCharts></progressCharts>
            </template>
            <template slot="footer">
                <span>周同比&nbsp;&nbsp;14.67%</span>
                <svg t="1677495172529" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2459" width="16" height="16"><path d="M529.143158 7.436293l347.212925 397.874796a21.748783 21.748783 0 0 1-16.375554 36.077393h-170.66398a21.492915 21.492915 0 0 0-21.492915 18.678367c-12.793402 92.624229-90.065549 502.268955-455.95684 562.909679a21.748783 21.748783 0 0 1-17.654895-38.380206c62.687669-49.126663 144.56544-144.309572 167.593564-313.694212a1571.285609 1571.285609 0 0 0 12.793402-207.508977 22.260519 22.260519 0 0 0-21.748783-22.260519H165.298811a21.748783 21.748783 0 0 1-16.375554-36.077393L496.39205 7.436293a21.748783 21.748783 0 0 1 32.751108 0z" p-id="2460" fill="#1afa29"></path></svg>
                <span>日同比&nbsp;&nbsp;17.96%</span>
                <svg t="1677495509739" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3742" width="16" height="16"><path d="M938.581333 812.117333l-24.746666-204.714666a8.277333 8.277333 0 0 0-13.994667-4.821334l-61.098667 61.013334-279.637333-278.698667a16.597333 16.597333 0 0 0-23.253333 0l-104.96 104.533333-285.141334-284.373333a8.277333 8.277333 0 0 0-11.648 0L87.722667 251.52a8.234667 8.234667 0 0 0 0 11.605333l331.52 330.794667c6.4 6.485333 16.938667 6.485333 23.338666 0l104.917334-104.533333 232.96 232.277333-61.098667 60.970667a8.234667 8.234667 0 0 0 4.864 13.952l205.312 24.661333a8.106667 8.106667 0 0 0 9.045333-9.130667z" fill="#d81e06" p-id="3743"></path></svg>
            </template>
        </Detail>
        </el-card></el-col
      >
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import linecharts from './lineChart'
import barCharts from './barCharts'
import progressCharts from './progressCharts'
export default {
  name: "Card",
  components: { Detail, linecharts,barCharts,progressCharts },
};
</script>

<style>
</style>