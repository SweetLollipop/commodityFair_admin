<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- CategorgSelect已经在main.js中注册为全局组件了 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!show" />
    </el-card>
    <el-card>
      <!-- 底部下面是由三部分切换 -->
      <div v-show="scene === 0">
        <!-- 展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :total="total"
          :page-size="limit"
          :page-count="7"
          :page-sizes="[3, 5, 10]"
          background
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          layout="prev, pager, next, jumper, ->, sizes, total"
        >
        </el-pagination>
      </div>
      <spuForm v-show="scene === 1"></spuForm>
      <skuForm v-show="scene === 2"></skuForm>
    </el-card>
  </div>
</template>

<script>
//引入子组件
import spuForm from "./spuForm";
import skuForm from "./skuForm";

export default {
  name: "spu",
  components: { spuForm, skuForm },
  data() {
    return {
      //分别是分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动的可操作性
      show: true,
      page: 1, //分页器当前第几页
      limit: 3, //每页展示多少条数据
      total: 0, //分页器一共需要展示数据的条数
      records: [], //spu列表的数据
      scene: 0, //0代表展示SPU列表数据  1代表添加SPU|修改SPU  2代表添加SKU
    };
  },
  methods: {
    //点击页码按钮
    /* handleCurrentChange(pager){
        this.page = pager //修改参数
        this.getSpuList() //再调请求
    }, */

    //三级联动的自定义事件，可将子组件的相应id传递给父组件
    getCategoryId({ categoryId, level }) {
      //区分三级分类相应的id,以及父组件进行存储
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = ""; //清除二级分类数据
        this.category3Id = ""; //清除三级分类数据
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = ""; //清除三级分类数据
      } else {
        this.category3Id = categoryId;
        //发请求获取spu列表数据进行展示
        this.getSpuList();
      }
    },
    //获取spu列表数据的方法
    async getSpuList(pager = 1) {
      this.page = pager;
      const { page, limit, category3Id } = this;
      //携带三个参数：page第几页，limit每页展示多少条数据，category3Id三级分类id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code === 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //当分页器某一页需要战术数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit; //修改参数
      this.getSpuList(); //再调请求
    },
    //添加SPU按钮的回调
    addSpu() {
      this.scene = 1;
    },
    //修改某一个SPU
    updateSpu(row){
      this.scene = 1;
    },
  },
};
</script>

<style>
</style>