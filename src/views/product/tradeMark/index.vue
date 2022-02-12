<template>
    <div>
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="marigin:10px 0px">添加</el-button>
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
                    <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
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
            }
        }
    }
</script>

<style>

</style>