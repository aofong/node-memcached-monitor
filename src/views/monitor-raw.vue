<template>
    <el-collapse v-model="activeNames" accordion>
        <el-collapse-item :title="i.server" :name="index" :key="i.server" v-for="(i,index) in raws">
            <el-pre :html="i|stringify"></el-pre>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
    import pre from '../components/pre.vue';
    export default {
        props: ['raws'],
        data() {
            return {
                activeNames: ['0']
            };
        },
        components: {
            'el-pre': pre
        },
        filters: {
            stringify(object) {
                return JSON.stringify(object, null, 4)
            }
        }
    }
</script>