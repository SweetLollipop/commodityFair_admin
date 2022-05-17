<template>
  <div>
    <div class="card-header">
      <span>{{title}}</span>
      <!-- 引入自定义组件 -->
      <aliInfo></aliInfo>
    </div>
    <div class="card-content">
      <span>{{count}}</span>
    </div>
    <div class="card-charts">
        <slot name="charts">图表</slot>
    </div>
    <div class="card-footer">
        <slot name="footer">底部</slot>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Detail',
    props: ['title','count'], //接收从父组件传入的title、count值
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
  font-size: 14px;
}
</style>
<style scoped>
.card-header svg {
  width: 8%;
  height: 8%;
}
.card-content {
  font-size: 30px;
  padding: 10px 0;
}
.card-charts{
    height: 50px;
    font-size: 14px;
    display:table-cell;
    vertical-align: middle;
}
.card-footer{
    border-top: 1px solid #eee;
    padding: 10px 0px;
}
</style>