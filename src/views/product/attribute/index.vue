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
          @click="addAttribute"
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
                @click="updateAttribute(row)"
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
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttributeValue"
          :disabled="!attributeInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attributeInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里结构需要用到input与span来回切换 -->
              <el-input
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span v-else @click="row.flag = true" style="display: block">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
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
          /* {
            attrId: 0,
            valueName: "",
          }, */
        ],
        categoryId: 0, //category3Id
        categoryLevel: 3, //category3Id
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
    //添加属性值
    addAttributeValue() {
      //向属性值的数组里面添加元素
      this.attributeInfo.attrValueList.push({
        attrId: this.attributeInfo.id, //相应属性的id
        valueName: "", //相应属性值名称
        //给每一个属性值添加一个标记flag，用户切花查看模式与编辑模式，好处，每一个属性可以控制自己的模式切换
        //当前flag属性，响应式数据（数据变化视图跟着变化）
        flag: true,
      });
    },
    //添加属性
    addAttribute() {
      this.isShowTable = false; //切换table显示与隐藏
      //清除数据
      this.attributeInfo = {
        attrName: "",
        attrValueList: [
          /* {
            attrId: 0,
            valueName: "",
          }, */
        ],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    //修改属性
    updateAttribute(row) {
      this.isShowTable = false; //切换table显示与隐藏
      //将选中的属性赋值给attributeInfo
      //由于数据结构当中存在对象里面套数组，数组里面又套对象，因此需要使用深拷贝解决
      //深拷贝，浅拷贝在面试的时候出现的频率很高，切记达到手写深拷贝与浅拷贝
      this.attributeInfo = cloneDeep(row);
      //在修改某一个属性的时候，将相应的属性值元素添加上flag这个标记
      this.attributeInfo.attrValueList.forEach((item) => {
        //这样书写也可以给属性值添加flag字段，但是会发现视图不会跟着变化（因为flag不是响应式数据）
        //因为 Vue 无法探测普通的新增 property,这样书写的属性并非响应式属性（数据变化师徒跟着变化）
        //第一个参数：对象，第二个参数：添加新的响应式属性，第三个属性的属性值
        this.$set(item, "flag", false);
      });
    },
    //失去焦点的事件，切换为查看模式，展示span
    toLook(row) {
      //如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim() === "") {
        this.$message.error("属性值不能为空!");
        return;
      }
      //新增的属性值不能与已有的属性值重复
      let isRepat = this.attributeInfo.attrValueList.some((item) => {
        //需要将row从数组里面判断的时候去除
        //row:最新新增的属性值（数组中的最后一个元素）
        //判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName === item.valueName;
        }
      });
      if (isRepat) {
        this.$message.error("属性值不能重复!");
        return;
      }
      //row: 形参是当前用户添加的最新的属性
      row.flag = false; //当前编辑模式变为查看模式（让input消失，显示span）
    },
  },
};
</script>

<style>
</style>