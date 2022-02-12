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
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column
                prop="order"
                label="序号"
                width="80px"
                align="center">
            </el-table-column>
            <el-table-column
                prop="brandName"
                label="品牌名称">
            </el-table-column>
            <el-table-column
                prop="brandLOGO"
                label="品牌LOGO">
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作">
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
            :current-page="6"
            :total="99"
            :page-size="3"
            :page-count="7"
            :page-sizes="[3,5,10]"
            background
            layout="prev, pager, next, jumper, ->, sizes, total"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'tradeMark',
    }
</script>

<style>

</style>