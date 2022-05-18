<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!-- 第一个card -->
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span>
                 周同比&nbsp;&nbsp;56.67%
                 <svg t="1652804877150" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2046" width="200" height="200"><path d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z" fill="#1afa29" p-id="2047"></path></svg>
              </span>
              <span>
                 日同比&nbsp;&nbsp;19.96%
                 <svg t="1652804780172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6349" width="200" height="200"><path d="M402.535396 127.893516v438.930424h-164.589566l274.319356 329.282544 274.324476-329.282544h-164.589566V127.893516H402.535396z" p-id="6350" fill="#1296db"></path></svg>
              </span>
            </template>
            <template slot="footer">
                <span>日销售额￥12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第二个card -->
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineChart></lineChart>
            </template>
            <template slot="footer">
                <span>日访问量1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第三个card -->
          <Detail title="支付笔数" count="88460">
            <template slot="footer">
                <span>转换率65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第四个card -->
          <Detail title="运营活动效果" count="78%">
            <template slot="footer">
              <div class="effect">
                <span>
                  周同比&nbsp;&nbsp;56.67%
                  <svg t="1652804877150" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2046" width="200" height="200"><path d="M255.998 488.11h167.253l0.909 322.563h166.4v-322.56l167.253 0.455L506.819 165.61l-250.821 322.5z" fill="#1afa29" p-id="2047"></path></svg>
                </span>
                <span>
                  日同比&nbsp;&nbsp;19.96%
                  <svg t="1652804780172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6349" width="200" height="200"><path d="M402.535396 127.893516v438.930424h-164.589566l274.319356 329.282544 274.324476-329.282544h-164.589566V127.893516H402.535396z" p-id="6350" fill="#1296db"></path></svg>
                </span>
              </div>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineChart from "./lineChart";
export default {
  name: "Card",
  components: {
    Detail,
    lineChart,
  },
};
</script>

<style >
.el-card svg {
  width: 5%;
  height: 35%;
}
.effect span{
  font-size: 14px;
}
</style>