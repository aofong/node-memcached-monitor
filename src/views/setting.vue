<template>
    <div>
        <el-alert title="配置说明" type="error" :closable="false" description="默认启用mockjs数据，请完成下方配置后体验真实数据">
        </el-alert>
        <el-form :label-position="labelPosition" :model="setting" @submit.native.prevent @keyup.enter="onPost">
            <el-form-item label="内置服务运行端口">
                <el-col :span="2" :xs="6">
                    <el-input v-model="setting.port" placeholder="默认:3000"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="缓存key同步时间（单位：秒）">
                <el-col :span="2" :xs="6">
                    <el-input v-model="setting.synctime" placeholder="默认:5"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="添加memcached服务器IP">
                <el-col :span="12" :xs="24">
                    <el-input type="textarea" :autosize="{minRows:5}" placeholder="服务器ip，多个请换行 例:192.168.1.100:8900" v-model="setting.ips">
                    </el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onPost">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                labelPosition: "top",
                setting: {
                    ips: '',
                    port: 3000,
                    synctime: 5
                },
                searchResult: [],
                ajaxloading: false,
                ajaxfail: false,
                ajaxfailmsg: ""
            };
        },
        methods: {
            onPost() {

            }
        }
    }
</script>