<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
        <el-menu-item :index="i.path" v-if="i.name" :key="i.path" v-for="i in $router.options.routes">{{i.name}}
        </el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: this.$route.path === '/' || this.$route.path === '' ? "/monitor" : this.$route.path
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key === '/git') {
                    window.open('https://gitee.com/aofong/node-memcached-monitor');
                    return;
                }
            }
        }
    }
</script>