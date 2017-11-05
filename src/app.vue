<template>
    <div id="app">
        <el-container>
            <el-header height="150px">
                <div class="title">memcached monitor</div>
            </el-header>
            <el-main>
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

                <el-card class="box-card" v-if="searchResult.length">
                    <div v-for="(i,index) in searchResult" :key="i.name" class="text item">
                        [{{i.platform}}] {{i.name}}
                        <a href="javascript:void(0)" @click=onDel(i.name,index)>删除</a>
                    </div>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import superagent from 'superagent'
    export default {
        data() {
            return {
                labelPosition: 'top',
                input: "",
                search: {
                    key: localStorage.getItem('cache_key') || ''
                },
                searchResult: [],
                ajaxloading: false,
                ajaxfail: false,
                ajaxfailmsg: ''
            };
        },
        methods: {
            async onSearch() {
                var self = this;
                self.ajaxloading = true;
                var result = (await superagent.get('/api/search', {
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
            async onDel(key, index, count) {
                var self = this;
                self.ajaxloading = true;
                var result = (await superagent.get('/api/del', {
                    key: key
                })).body;
                self.ajaxloading = false;
                self.ajaxfail = result.code !== 200;
                if (result.code === 200) {
                    self.searchResult.splice(index, count || 1);
                } else {
                    self.ajaxfailmsg = result.message;
                }
            }
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

    .el-header .title {
        width: 1000px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .el-main {
        width: 1000px;
        margin: 0 auto;
    }
</style>