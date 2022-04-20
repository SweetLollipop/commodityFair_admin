<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="width"
      ></el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
      ></el-table-column>
      <el-table-column label="默认图片" width="110px">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(KG)"
        width="80px"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80px "
      ></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <!-- 这里按钮将来用hintButton替换 -->
          <hint-button
            type="success"
            icon="el-icon-top"
            size="mini"
            title="上架sku"
            v-if="row.isSale === 0"
            @click="onSale(row)"
          ></hint-button>
          <hint-button
            type="warning"
            icon="el-icon-bottom"
            size="mini"
            title="下架sku"
            v-else
            @click="cancelSale(row)"
          ></hint-button>
          <hint-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            title="修改sku"
            @click="editSku"
          ></hint-button>
          <hint-button
            type="info"
            icon="el-icon-info"
            size="mini"
            title="查看sku"
            @click="handler(row)"
          ></hint-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="deleteSku(row)">
            <hint-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              title="删除sku"
              slot="reference"
            ></hint-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--分页 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 10, //代表当前页面有几条数据
      records: [], //存储sku列表的数据
      total: 0, //存储分页器一共展示的数据
    };
  },
  //组件噶在完毕
  mounted() {
    //获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    //获取sku列表数据的方法
    async getSkuList(pager = 1) {
      this.page = pager;
      //结构出默认参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      //console.log(result);
      if (result.code === 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      //修改参数
      this.limit = limit;
      this.getSkuList();
    },
    //上架
    async onSale(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code === 200) {
        row.isSale = 1;
        this.$message.success("上架成功");
      }
    },
    //下架
    async cancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code === 200) {
        row.isSale = 0;
        this.$message.success("下架成功");
      }
    },
    //编辑
    editSku() {
      this.$message("正在开发中...");
    },
  },
};
</script>

<style>
</style>