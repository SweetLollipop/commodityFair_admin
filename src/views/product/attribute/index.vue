<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <!-- 展示属性的结构 -->
      <diV v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="isShowTable = false"
          >添加属性</el-button
        >
        <!-- 表格：展示平台属性 -->
        <el-table :data="attributeList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="address" label="属性值列表">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 3px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="isShowTable = false"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </diV>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form
          :inline="true"
          ref="from"
          label-width="80px"
          :model="attributeInfo"
        >
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attributeInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="width: 100%; margin: 20px 0px" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "attribute",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attributeList: [], //接收平台属性的字段
      isShowTable: true, //控制table表格的显示与隐藏
      //收集新增属性|修改属性
      attributeInfo: {
        attrName: "",
        attrValueList: [
          {
            attrId: 0,
            valueName: "",
          },
        ],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    //自定义事件的回调,传参为对象且被解构出来
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
        //发请求获取平台的属性数据
        this.getAttributeList();
      }
    },
    //获取平台属性的数据
    //当用户确定三级分类的数据时候，可以向服务器发请求获取平台属性进行展示
    async getAttributeList() {
      //获取分类的id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attribute.reqAttributeList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code === 200) {
        this.attributeList = result.data;
      }
    },
  },
};
</script>

<style>
</style>