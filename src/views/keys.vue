<template>
    <div>
        <el-alert title="搜索提示" type="info" :closable="false" description="单次最大支持输出1000个key">
        </el-alert>
        <el-form :label-position="labelPosition" :model="search" @submit.native.prevent>
            <el-form-item label="搜索缓存key，支持前缀搜索，示例：cachekey_">
                <el-input v-model="search.key" @keyup.enter="onSearch" placeholder="输入搜索key前缀"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-alert v-if="ajaxfail" title="操作提示" type="warning" :closable="false" :description="ajaxfailmsg">
        </el-alert>

        <el-table :data="searchResult" border style="width: 100%">
            <el-table-column prop="platform" label="平台" width="180">
            </el-table-column>
            <el-table-column prop="name" label="key名称">
            </el-table-column>
            <el-table-column prop="size" label="大小(b)" width="180">
            </el-table-column>
            <el-table-column prop="ttl" label="过期时间" width="180" sortable :formatter="formatter">
            </el-table-column>
            <el-table-column label="action" width="180">
                <template slot-scope="scope">
                    <el-button @click="onShow(scope.row.name)" type="text" size="small">查看</el-button>
                    <el-button @click="onDel(scope.row.name,scope.$index)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="查看缓存值" :visible.sync="dialogVisible">
            <el-pre :html="dialogContent"></el-pre>
        </el-dialog>
    </div>
</template>

<script>
    import superagent from "superagent";
    import {
        MessageBox
    } from "element-ui";

    import pre from '../components/pre.vue';

    export default {
        data() {
            return {
                labelPosition: "top",
                search: {
                    key: localStorage.getItem("cache_key") || ""
                },
                searchResult: [],
                ajaxloading: false,
                ajaxfail: false,
                ajaxfailmsg: "",
                dialogVisible: false,
                dialogContent: ''
            };
        },
        components: {
            'el-pre': pre
        },
        methods: {
            formatter(row, column, cellValue) {
                var time = new Date(cellValue * 1000);
                return `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${time.getHours().toString().padStart(2,0)}:${time.getMinutes().toString().padStart(2,0)}:${time.getSeconds().toString().padStart(2,0)}`;
            },
            async onSearch() {
                var self = this;
                self.ajaxloading = true;
                var result = (await superagent.get("/api/search", {
                    key: self.search.key
                })).body;
                self.ajaxloading = false;
                self.ajaxfail = result.code !== 200;
                if (result.code === 200) {
                    self.searchResult = result.body;
                } else {
                    self.ajaxfailmsg = result.message;
                }
            },
            onDel(key, index, count) {
                var self = this;
                MessageBox.confirm(`您确定要删除${key}吗？`, `正在删除……`, {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    callback: async action => {
                        if (action === "confirm") {
                            self.ajaxloading = true;
                            var result = (await superagent.get("/api/del", {
                                keys: key
                            })).body;
                            self.ajaxloading = false;
                            self.ajaxfail = result.code !== 200;
                            if (result.code === 200) {
                                self.searchResult.splice(index, count || 1);
                            } else {
                                self.ajaxfailmsg = result.message;
                            }
                        } else {

                        }
                    }
                });
            },
            async onShow(key) {
                var self = this;
                self.ajaxloading = true;
                var result = (await superagent.get("/api/get", {
                    key: key
                })).body;
                self.ajaxloading = false;
                self.ajaxfail = result.code !== 200;
                if (result.code === 200) {
                    self.dialogVisible = true;
                    self.dialogContent = `${JSON.stringify(result.body, null, 4)||'没有value值'}`;
                } else {
                    self.ajaxfailmsg = result.message;
                }
            }
        }
    };
</script>

<style>
    .el-dialog {
        width: 90%;
        max-width: 700px;
    }

    .item {
        margin-bottom: 18px;
    }
</style>