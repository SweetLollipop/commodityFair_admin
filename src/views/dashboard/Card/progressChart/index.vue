<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  name: "progressChart",
  mounted() {
    //初始化echarts实例
    let progressChart = echarts.init(this.$refs.charts);
    //配置数据
    progressChart.setOption({
      xAxis: {
        show: false, //隐藏X轴
        //最小值与最小值的设置
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false, //隐藏Y轴
        type: "category", //均分
      },
      //系列
      series: [
        {
          type: "bar",
          data: [78],
          color: "cyan",
          barWidth: 10, //柱状条的宽度
          color: "yellowgreen",
          //背景颜色设置
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          //文本标签
          label: {
            show: true,
            //改变文本内容
            formatter: "|",
            //文本标签位置调试
            position: "right",
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
.charts {
  width: 230px;
  height: 50px;
}
</style>