<template>
    <div>
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="marigin:10px 0px" @click="showDialog">添加</el-button>
        <!-- 表格组件
            data: 表格组件将来需要展示的数据---数组类型
            border: 是给表格添加边框
            colum属性
            label: 显示标题
            width: 对应列的宽度
            align: 标题的对齐方式
         -->
        <el-table :data="list" style="width: 100%" border>
            <el-table-column
                type="index"
                prop="order"
                label="序号"
                width="80px"
                align="center">
            </el-table-column>
            <el-table-column
                prop="tmName"
                label="品牌名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="logoUrl"
                label="品牌LOGO"
                align="center">
                <template slot-scope="{row,$index}">
                    <img :src="row.logoUrl" :alt="$index" style="width:100px; height:100px">
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                align="center">
                <template slot-scope="">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器
            当前第几页、数据总条数、每一页展示条数、连续页码数
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            page-sizes: 可以设置每一页展示多少天数据
            layout: 可以实现分页器布局
            page-count: 页码按钮数量
         -->
        <el-pagination
            style="margin-top:20px; textAlign:center"
            :current-page="page"
            :total="total"
            :page-size="limit"
            :page-count="7"
            :page-sizes="[3,5,10]"
            background
            @current-change="getPageList"
            @size-change="handleSizeChange"
            layout="prev, pager, next, jumper, ->, sizes, total"
        >
        </el-pagination>
        <!-- 对话框
            :visible.sync  控制对话框显示或隐藏用的
        -->
        <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
            <!-- form表单 :model属性（把表单的数据收集到tmForm对象身上，用于获取输入、表单验证）-->
            <el-form style="width:80%" :model="tmForm">
                <el-form-item label="品牌名称" label-width="100px">
                    <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px">
                    <!-- 
                      这里收集数据不能使用v-model,因为不是表单元素
                      action:设置图片上传的地址/admin/product/fileUpload
                      :on-success="handleAvatarSuccess" 图片上传成功之后的回调,执行一次
                      :before-upload="beforeAvatarUpload" 图片上传之前的回调，执行一次
                    -->
                    <el-upload
                      class="avatar-uploader"
                      action="/dev-api/admin/product/fileUpload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'tradeMark',
        //组件挂载后发请求
        data(){
            return{
                page: 1, //分页器第几页
                limit: 3, //当前页数展示数据条数
                total: 0, //总数据条数
                list: [], //列表展示的数据
                dialogFormVisible: false,  //对话框显示或隐藏控制的属性
                tmForm: {
                    logoUrl: '', //品牌LOGO
                    tmName: '',  //品牌名称
                }
            }
        },
        mounted(){
            //获取列表数据方法
            this.getPageList();
        },
        methods:{
            //获取品牌列表的数据
            async getPageList(pager = 1){
                this.page = pager
                const {page, limit} = this
                //获取品牌列表的接口
                let result = await this.$API.trademark.reqTradeMarkList(page, limit)
                if(result.code === 200){
                    this.total = result.data.total
                    this.list = result.data.records
                }
            },
            //点击页码按钮
            /* handleCurrentChange(pager){
                this.page = pager //修改参数
                this.getPageList() //再调请求
            }, */
            //当分页器某一页需要战术数据条数发生变化的时候会触发
            handleSizeChange(limit){
                this.limit = limit //修改参数
                this.getPageList() //再调请求
            },
            //点击添加品牌的按钮
            showDialog(){
                this.dialogFormVisible = true //显示对话框
                this.tmForm = {tmName: '', logoUrl: ''} //填写之前清空数据
            },
            //点击修改品牌的按钮
            updateTradeMark(){
                this.dialogFormVisible = true //显示对话框
            },
            //上传图片成功后的回调
            handleAvatarSuccess(res, file) {
                //res:上传成功后返回给前端的地址，file：上传成功后服务器返回的数据  
                // console.log(file)
                this.tmForm.logoUrl = res.data
            },
            //上传图片前的回调
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //添加品牌或修改品牌
            async addOrUpdateTradeMark(){
                this.dialogFormVisible = false //对话框隐藏
                let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
                if(result === 200){
                    this.$message(this.tmForm.id ? '修改品牌成功' : '添加品牌成功')  //弹出信息
                    this.getPageList()  //添加或修改成功后，再次获取列表进行展示
                }
            },
        }
    }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>