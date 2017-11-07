<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <el-container>
                <el-header height="150px">
                    <div class="header">
                        <div class="title">memcached monitor</div>
                    </div>

                </el-header>
                <el-main>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
                        <el-menu-item index="/monitor">服务监控 </el-menu-item>
                        <el-menu-item index="/keys">keys管理 </el-menu-item>
                        <el-menu-item index="/setting">配置 </el-menu-item>
                    </el-menu>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </transition>
    </div>
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
                //console.log(key, keyPath);
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
        font-size: 40px;
        font-weight: 800;
        display: flex;
        align-items: center;
    }

    .el-header .header {
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .el-main {
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        padding-top: 0;
    }

    .el-main .el-menu {
        border-bottom: 0;
        margin-bottom: 20px;
    }
</style>