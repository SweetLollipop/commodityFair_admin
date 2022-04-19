<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- CategorgSelect已经在main.js中注册为全局组件了 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="scene !== 0" />
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
                @click="addSku(row)"
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
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
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
      <spuForm
        v-show="scene === 1"
        @changeScene="changeScene"
        ref="spu"
      ></spuForm>
      <skuForm
        v-show="scene === 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></skuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" style="width: 100%" v-loading="loading" border>
        <el-table-column
          prop="skuName"
          label="名称"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="width"
        ></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
      // show: true,
      page: 1, //分页器当前第几页
      limit: 3, //每页展示多少条数据
      total: 0, //分页器一共需要展示数据的条数
      records: [], //spu列表的数据
      scene: 0, //0代表展示SPU列表数据  1代表添加SPU|修改SPU  2代表添加SKU
      dialogTableVisible: false, //控制对话框的显示与隐藏
      spu: {}, //声明一个spu,后续为了“查看SKU”功能而存储对应的spu
      skuList: [], //存储sku列表的数据
      loading: true, //在表格等容器中加载数据时显示
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
      //通知子组件发请求--两个：获取品牌、获取销售属性
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改某一个SPU
    updateSpu(row) {
      this.scene = 1;
      //获取子组件spuForm子组件
      //在父组件当中可以通过$ref获取子组件
      this.$refs.spu.initSpuData(row);
    },
    //自定义事件（spuForm）
    changeScene({ scene, flag }) {
      //flag这个形参是为了区分保存按钮是添加操作还是修改操作
      this.scene = scene; //切换结构(场景)
      //子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示
      if (flag === "修改") {
        this.getSpuList(this.page); //修改时，获取当前页列表
      } else if (flag === "添加") {
        this.getSpuList(); //添加时，默认跳转并获取第一页列表
      } else {
        this.getSpuList(this.page); //取消时，获取当前页列表
      }
    },
    //删除spu的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code === 200) {
        this.$message.success("删除成功");
        //代表当SPU个数大于1时，删除后停留在当前页；否则跳转到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加SKU按钮的回调
    addSku(row) {
      //切换场景为2 scene=2
      this.scene = 2;
      //父组件调用子组件的方法，让子组件发请求---三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //skuform通知父组件修改场景
    changeScenes(scene) {
      this.scene = scene;
    },
    //查看SKU的按钮的回调
    async handler(spu) {
      //点击这个按钮的时候，对话框可见的
      this.dialogTableVisible = true;
      //保存SPU信息
      this.spu = spu;
      //获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code === 200) {
        this.skuList = result.data;
        //loading隐藏
        this.loading = false;
      }
    },
    //关闭对话框前的回调
    close(done) {
      //loading属性再次变为真
      this.loading = true;
      //清除sku列表的数据
      this.skuList = [];
      //关闭对话框
      done();
    },
  },
};
</script>

<style>
.el-dialog {
  margin-bottom: 10vh;
}
</style>