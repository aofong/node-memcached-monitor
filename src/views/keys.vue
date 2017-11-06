<template>
    <div>
        <el-form :label-position="labelPosition" :model="search" @submit.native.prevent @keyup.enter="onSearch">
            <el-form-item label="搜索缓存key，支持前缀搜索，示例：cachekey_">
                <el-input v-model="search.key"></el-input>
            </el-form-item>
            <el-form-item>
                <el-alert title="搜索提示" type="warning" description="单次最大支持输出1000个key ,支持redis和memcached平台">
                </el-alert>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-card class="box-card" v-if="ajaxloading||searchResult.length" v-loading="ajaxloading">
            <div v-for="(i,index) in searchResult" :key="i.name" class="text item">
                [{{i.platform}}] {{i.name}}
                <a href="javascript:void(0)" @click=onDel(i.name,index)>删除</a>
                <a href="javascript:void(0)" @click=onShow(i.name)>查看</a>
            </div>
        </el-card>

        <el-dialog title="查看缓存值" :visible.sync="dialogVisible" width="700px">
            <el-pre :html="dialogContent"></el-pre>
        </el-dialog>
    </div>
</template>

<script>
    import superagent from "superagent";
    import {
        MessageBox
    } from "element-ui";
    
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
        methods: {
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
                    self.dialogContent = `${JSON.stringify(result.body, null, 4)}`;
                } else {
                    self.ajaxfailmsg = result.message;
                }
            }
        }
    };
</script>

<style scoped>

</style>