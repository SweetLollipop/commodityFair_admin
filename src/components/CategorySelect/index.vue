<template>
  <div>
    <!-- inline:代表行内表单，代表一行可以放置多个表单元素  :model="formInline" v-model="formInline.region"-->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handeler2"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3">
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      list1: [], //一级分类的数据
      list2: [], //二级分类的数据
      list3: [], //三级分类的数据
      cForm: {
        //收集相应一级二级三级分类的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  methods: {
    //获取一级分类数据的方法
    async getCategory1List() {
      let result = await this.$API.attribute.reqCategory1List(); //获取一级分类的请求，不带参数
      if (result.code === 200) {
        this.list1 = result.data;
      }
    },
    //一级分类的select事件回调（当一级分类的option发生变化的时候获取二级分类数据）
    async handler1() {
      //清除二级三级分类数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = '';
      this.cForm.category3Id = '';
      //解构出一级分类的id
      const { category1Id } = this.cForm;
      this.$emit('getCategoryId',{categoryId:category1Id,level:1});  //传给父组件attribute
      let result = await this.$API.attribute.reqCategory2List(category1Id);
      if (result.code === 200) {
        this.list2 = result.data;
      }
    },
    //二级分类的select事件回调（当二分类的option发生变化的时候获取三级分类数据）
    async handeler2() {
      //清除三级分类数据
      this.list3 = [];
      this.cForm.category3Id = '';
      const { category2Id } = this.cForm;
      this.$emit('getCategoryId',{categoryId:category2Id,level:2});  //传给父组件attribute
      let result = await this.$API.attribute.reqCategory3List(category2Id);
      if (result.code === 200) {
        this.list3 = result.data;
      }
    },
    //三级分类的事件回调
    handler3(){
      //获取三级分类id
      const { category3Id } = this.cForm;
      this.$emit('getCategoryId',{categoryId:category3Id,level:3});  //传给父组件attribute
    }
  },
  //组件挂载挂载完毕：向服务器发请求，获取相应的一级分类的数据
  mounted() {
    this.getCategory1List(); //获取一级分类的数据方法
  },
};
</script>

<style>
</style>