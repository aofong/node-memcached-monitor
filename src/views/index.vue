<template>
    <el-container>
        <el-header height="150px">memcached monitor</el-header>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                input: ""
            };
        }
    };
</script>

<style scoped>
    #app {
        height: 100%;
        display: flex;
    }

    .el-header {
        background-color: #409eff;
        color: #fff;
        line-height: 150px;
        font-size: 40px;
        font-weight: 800;
    }

    .el-main {
        width: 1000px;
        margin: 0 auto;
    }
</style>