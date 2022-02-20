<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card> </el-card>
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
    };
  },
  methods: {
    //自定义事件的回调,传参为对象且被解构出来
    getCategoryId({ categoryId, level }) {
      //区分三级分类相应的id,以及父组件进行存储
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";  //清除二级分类数据
        this.category3Id = "";  //清除三级分类数据
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";  //清除三级分类数据
      } else {
        this.category3Id = categoryId;
        //发请求获取品牌属性
        this.getAttributeList()
      }
    },
    //获取平台属性的数据
    getAttributeList(){
      console.log("发请求")
    }
  },
};
</script>

<style>
</style>