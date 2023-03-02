<template>
  <el-card class="box-card" style="margin: 10px 0;">
  <div slot="header" class="clearfix">
    <!-- 头部左侧内容 -->
    <!--   @tab-click="handleClick" -->
    <el-tabs class="tabs" v-model="activeName">
      <el-tab-pane label="销售额" name="sale"></el-tab-pane>
      <el-tab-pane label="访问量" name="visite"></el-tab-pane>
    </el-tabs>
    <!-- 头部右侧内容 -->
    <div class="right">
      <span @click="setDay">今日</span>
      <span @click="setWeek">本周</span>
      <span @click='setMonth'>本月</span>
      <span @click="setYear">本年</span>
      
      <el-date-picker
      v-model="date"
      class="date"
      value-format="yyyy-MM-dd"
      size="mini"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </div>
  </div>
  <div>
    <el-row :gutter="10">
      <el-col :span="20" >
        <!-- 容器 -->
        <div class="charts" ref="charts"></div>
      </el-col>
      <el-col :span="4">
        <h3  class="col-right">门店{{title}}排行</h3>
        <ul>
          <li>
            <span class="rightindex">0</span>
            <span>肯德基</span>
            <span class="rvalue">23786</span>
          </li>
          <li>
            <span class="rightindex">1</span>
            <span>肯德基</span>
            <span class="rvalue">23786</span>
          </li>
          <li>
            <span class="rightindex">2</span>
            <span>肯德基</span>
            <span class="rvalue">23786</span>
          </li>
          <li>
            <span class="rightindex">3</span>
            <span>肯德基</span>
            <span class="rvalue">23786</span>
          </li>
          <li>
            <span class="rightindex">4</span>
            <span>肯德基</span>
            <span class="rvalue">23786</span>
          </li>
          <li>
            <span class="rightindex">5</span>
            <span>肯德基</span>
            <span class="rvalue">23786</span>
          </li>
          <li>
            <span class="rightindex">6</span>
            <span>肯德基</span>
            <span class="rvalue">23786</span>
          </li>
          <li>
            <span class="rightindex">7</span>
            <span>肯德基</span>
            <span class="rvalue">23786</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</el-card>
  
</template>

<script>
// 引入echarts
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
    name:'Sale',
  data() {
    return {
      activeName:'sale',
      mycharts:null,
      // 收集日历数据
      date:[]
    }
  },
  mounted() {
    // 初始化echarts实例
    this.mycharts = echarts.init(this.$refs.charts)
    // 配置数据
    this.mycharts.setOption({
      title:{
        text:'销售额趋势'
      },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220,123,245,222,290,430],
      color:'yellowgreen'
    }
  ]
})
  },
  computed:{
    // 计算属性标题
    title(){
      return this.activeName =='sale'?'销售额':'访问量'
    }
  },
  methods: {
    // 本日
    setDay(){
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day,day]
    },
    // 本周
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      console.log(start,end);
      this.date = [start,end]
    },
    // 本月
    setMonth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start,end]
    },
    // 本月
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start,end]
    }
  },
  // 监听属性
  watch:{
    title(){
      // 重新修改图表配置数据
      this.mycharts.setOption({
        title:{
          text:this.title+'趋势'
        }
      })
    }
  }
}
</script>

<style scoped>
  .clearfix{
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .tabs{
    width: 100%;
  }
  .right{
    position: absolute;
    right: 0px;
  }
  .date{
    width: 250px;
    margin: 0px 20px;
  }
  .right span{
    margin: 0 10px;
  }
  .charts{
    width: 100%;
    height: 300px;
  }
  .col-right{
    margin: 0;
  }
  ul{
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
  }
  ul li{
    height: 8%;
    /* margin: 0 10px; */
  }
  .rightindex{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
    color:aliceblue;
    text-align: center;
    margin:0 10px;
    font-size: 20px;
  }
  .rvalue{
    float: right;
  }
</style>