<template>
    <div>
        <el-alert title="查看memcached缓存key同步日志" type="info" :closable="false" description="">
        </el-alert>
        <el-pre v-show="log.length" :html="log"></el-pre>
    </div>
</template>
<script>
    import superagent from "superagent";
    import pre from '../components/pre.vue';
    export default {
        data() {
            return {
                log: 'loading......'
            }
        },
        components: {
            'el-pre': pre
        },
        async created() {
            var result = (await superagent.get("/api/log")).body;
            if (result.code === 200) {
                this.log = result.body;
            } else {
                this.log = result.message;
            }
        }
    }
</script>