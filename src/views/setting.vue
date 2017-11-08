<template>
    <div>
        <el-alert v-if="setting.lastAccess&&!setting.lastAccess" title="配置说明" type="error" :closable="false" description="默认启用mockjs数据，请完成下方配置后体验真实数据">
        </el-alert>
        <el-alert v-if="isSetting" title="修改成功" type="success" :closable="false" description="数据配置已完成，请重新启动服务！">
        </el-alert>
        <el-form :label-position="labelPosition" :model="setting" @submit.native.prevent @keyup.enter="onPost">
            <el-form-item label="数据源">
                <el-col :span="24">
                    <el-switch v-model="setting.closeMock" active-text="服务器数据" inactive-text="模拟数据（mockjs）">
                    </el-switch>
                </el-col>
            </el-form-item>

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
    import superagent from "superagent";
    export default {
        data() {
            return {
                labelPosition: "top",
                setting: {},
                searchResult: [],
                ajaxloading: false,
                ajaxfail: false,
                ajaxfailmsg: "",
                isSetting: false
            };
        },
        async created() {
            var result = (await superagent.get("/api/getting")).body.body;
            this.setting = Object.assign({}, {
                ips: '',
                port: 3000,
                synctime: 5,
                closeMock: false,
                lastAccess: ''
            }, result);
        },
        methods: {
            async onPost() {
                var self = this;
                var result = (await superagent.post("/api/setting", self.setting)).body.body;
                self.setting = result;
                self.isSetting = true;
            }
        }
    }
</script>