<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片：action图片上传的地址 list-type:文件列表的类型 on-preview:预览图片会触发，
          on-remove:删除图片会触发。file-list：照片墙需要展示的数据（数组：数组中的元素务必要有name、url属性）
          :on-preview：图片预览功能  :on-remove：图片删除功能
        -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrId"
        >
          <el-option
            :label="unselect.name"
            :value="unselect.id"
            v-for="(unselect, index) in unSelectSaleAttr"
            :key="index"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrId"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- 底下的结构可以当做咱们当年的span与input切换 -->
              <!-- @keyup.enter.native="handleInputConfirm"  @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small"
                >添加</el-button
              >
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //spu属性初始化的时候是一个空对象,在修改spu的时候，会向服务器发请求，返回SPU信息（对象），
      //在修改的时候可以利用服务器返回的这个对象收集最新的数据提交个服务器
      //添加spu,如果添加SPU的时候并没有向服务器发请求，数据收集到spu，收集数据的时候收集了哪些字段？看文档，需初始化其字段
      spu: {
        category3Id: 0, //三级分类id
        description: "", //描述
        spuName: "", //spu名称
        tmId: 0, //品牌id
        spuImageList: [
          //图片列表
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
          //销售属性列表
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              //销售属性值列表
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "string",
                saleAttrName: "string",
                saleAttrValueName: "string",
                spuId: 0,
              },
            ],
          },
        ],
      }, //存储SPU信息属性
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //存储SPU图片的数据
      saleAttrList: [], //销售属性的数据
      attrId: "", //收集未选择的销售属性的id---收集到哪里都可以，在发请求之前整理好数据格式即可
    };
  },
  methods: {
    //照片墙删除某个图片的时候会触发
    handleRemove(file, fileList) {
      //file参数：代表点击删除的那张图片
      //fileList：照片前删除某一张图片以后，剩余的其他图片
      //收集照片墙图片的数据
      //对于已有的图片（照片墙中显示的图片：有name、url字段的），因为照片墙显示务必要有这两个属性
      //对于服务器而言，不需要name,url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
      this.spuImageList = fileList;
    },
    //照片墙图片预览的回调
    handlePictureCardPreview(file) {
      //将图片存储地址赋值给dialogImageUrl
      this.dialogImageUrl = file.url;
      //对话框显示
      this.dialogVisible = true;
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList){
      //response:上传一张图片成功后服务器返回的信息
      //file：点击上传成功的那张图片信息
      //fileList:点击上传成功后，照片墙所有的图片列表信息
      //收集图片的信息
      this.spuImageList = fileList;
    },
    //初始化spuForm数据
    async initSpuData(spu) {
      //获取SPU信息
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code === 200) {
        //在修改spu的时候，需要向服务器发请求的，把服务器返回的数据（对象），赋值给spu属性
        this.spu = spuResult.data;
      }
      //获取品牌数据
      let tradeMarkResult = await this.$API.spu.reqTrademark();
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //获取spu图片数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code === 200) {
        let listArr = spuImageResult.data;
        //由于照片墙显示图片的数据需要数组，数组里面的元素需要有name与url字段
        //需要把服务器返回的数据进行修改
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        //把整理哈的数据赋值给this.spuImageList
        this.spuImageList = listArr;
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data;
      }
    },
  },
  computed: {
    //计算出还未选择的销售属性
    unSelectSaleAttr() {
      //整个平台的销售属性有3个，颜色、尺寸、版本--saleAttrList
      //SPU拥有的属于自己的销售属性spu.spuSaleAttrList
      //数组的过滤方法，可以从已有的数组当中过滤出用户需要的元素，并返回一个新的数据
      let result = this.saleAttrList.filter((item) => {
        //every数组的方法，会返回一个布尔值：真|假
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>