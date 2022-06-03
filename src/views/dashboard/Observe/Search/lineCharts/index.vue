<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <i class="el-icon-info" style="color: gray"></i>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <i class="el-icon-caret-top" style="color: red"></i>
      <i class="el-icon-caret-bottom" style="color: yellowgreen"></i>
    </div>
    <div class="footer">
        <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineCharts",
  mounted() {
    //初始化echarts实例
    let lineChart = echarts.init(this.$refs.charts);
    //配置数据
    lineChart.setOption({
      xAxis: {
        show: false, //隐藏X轴
        type: "category",
      },
      yAxis: {
        show: false, //隐藏Y轴
      },
      //系列
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 48, 9, 10, 44],
          //拐点样式的设置
          itemStyle: {
            opacity: 0,
          },
          //线条的样式
          lineStyle: {
            color: "blue",
          },
          //填充颜色的设置: 渐变颜色
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
                  color: "blue", // 0% 处的颜色
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
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.search-header {
  margin-right: 20px;
}
.main {
  margin: 10px 0px;
}
.main-title {
  margin-right: 30px;
}
.charts{
    width: 100%;
    height: 50px;
}
</style>