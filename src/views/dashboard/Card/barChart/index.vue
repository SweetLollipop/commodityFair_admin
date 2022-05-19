<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  name: "barChart",
  mounted() {
    //初始化echarts实例
    let barChart = echarts.init(this.$refs.charts);
    //配置数据
    barChart.setOption({
      xAxis: {
        show: false, //隐藏X轴
        type: "category", //均分
      },
      yAxis: {
        show: false, //隐藏Y轴
      },
      //系列
      series: [
        {
          type: "bar",
          data: [10, 7, 33, 12, 48, 9, 10, 44, 33, 22, 8],
          color: "cyan",
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      //提示框
      tooltip:{},
    });
  },
};
</script>

<style scoped>
.charts {
  width: 230px;
  height: 50px;
}
</style>