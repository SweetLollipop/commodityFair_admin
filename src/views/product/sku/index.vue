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
            @click="getSkuInfo(row)"
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
    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(attr, index) in skuInfo.skuSaleAttrValueList"
              :key="attr.id"
              >{{ attr.saleAttrName }}:{{ attr.saleAttrValueName }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" style="height: 280px; width: 300px" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
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
      skuInfo: {}, //存储sku详情信息的
      drawer: false, //抽屉效果的显示与隐藏
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
    //获取SKU详情
    async getSkuInfo(sku) {
      this.drawer = true; //抽屉效果显示
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code === 200) {
        this.skuInfo = result.data;
      }
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-row .el-col {
  margin: 10px 10px;
}
.el-tag.el-tag--success {
  margin-left: 10px;
}
/* 轮播图样式 start */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 轮播图样式 end */
</style>
<style>
/* 轮播图下方按钮样式必须放到<style>中才生效：深度选择器 */
.el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
/* 轮播图容器样式 */
.el-carousel__container {
  height: 250px !important;
  width: 300px;
}
</style>