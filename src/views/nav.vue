<template>
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
        <el-menu-item :index="i.path" v-if="i.name" :key="i.path" v-for="i in $router.options.routes">{{i.name}}
        </el-menu-item>
    </el-menu>
</template>
<script>
    export default {
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