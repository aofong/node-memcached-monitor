<template>
    <div id="app">
        <el-container>
            <el-header height="150px">
                <div class="header">
                    <div class="title">memcached monitor</div>
                    <a target="_blank" href="https://github.com/aofong/node-memcached-monitor">
                        <img src="https://img.shields.io/github/stars/aofong/node-memcached-monitor.svg" />
                    </a>
                    <a target="_blank" href="https://github.com/aofong/node-memcached-monitor">
                        <img src="https://travis-ci.org/aofong/node-memcached-monitor.svg?branch=master" alt="">
                    </a>
                </div>
            </el-header>
            <el-main>
                <app-nav></app-nav>
                <keep-alive>
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </keep-alive>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    import appNav from './views/nav.vue';
    export default {
        components: {
            appNav
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