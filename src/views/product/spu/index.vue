<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- CategorgSelect已经在main.js中注册为全局组件了 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!show" />
    </el-card>
    <el-card>
      <!-- 底部下面是由三部分切换 -->
      <div>
        <!-- 展示SPU列表的结构 -->
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table style="width: 100%" borde>
          <el-table-column
            type="index"
            label="序号"
            width="width: 80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里按钮将来用hintButton替换 -->
              <el-button type="success" icon="el-icon-plus"></el-button>
              <el-button type="warning" icon="el-icon-edit"></el-button>
              <el-button type="info" icon="el-icon-info"></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
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
          @current-change="getPageList"
          @size-change="handleSizeChange"
          layout="prev, pager, next, jumper, ->, sizes, total"
        >
        </el-pagination>
      </div>
      <div></div>
      <div></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "spu",
  data() {
    return {
      //分别是分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动的可操作性
      show: true,
    };
  },
  methods: {
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
    getSpuList() {},
  },
};
</script>

<style>
</style>