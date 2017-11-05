<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <el-container>
                <el-header height="150px">
                    <div class="header">
                        <div class="title">memcached monitor</div>
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
                            <el-menu-item index="/monitor">大盘监控 </el-menu-item>
                            <el-menu-item index="/keys">key管理 </el-menu-item>
                        </el-menu>
                    </div>

                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: "/keys"
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
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

    .el-header .header {
        width: 1000px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .el-header .el-menu--horizontal {
        border-bottom: 0;
    }

    .el-main {
        width: 1000px;
        margin: 0 auto;
    }
</style>