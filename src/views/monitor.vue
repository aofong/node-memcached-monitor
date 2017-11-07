<template>
    <div>
        <el-row>
            <el-select v-model="serverip" placeholder="查看单台服务器" clearable @change="onChange">
                <el-option :label="i.server" :value="i.server" :key="i.server" v-for="i in stats"></el-option>
            </el-select>
        </el-row>

        <el-row>
            <el-alert title="" type="success">存储空间:{{server.bytes}}G,分配内存:{{server.limit_maxbytes}}G
            </el-alert>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="12" :xs="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>连接数</span>
                        <el-button style="float: right; padding: 3px 0" type="text">连接数：{{conns}}</el-button>
                    </div>
                    <div id="conns-chart" style="width:100%; height:200px;"></div>
                </el-card>
            </el-col>
            <el-col :md="12" :xs="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>命令数(每秒)</span>
                        <el-button style="float: right; padding: 3px 0" type="text">命中率：{{hits}}%</el-button>
                    </div>
                    <div id="cmds-chart" style="width:100%; height:200px;"> </div>
                </el-card>
            </el-col>
        </el-row>


        <el-row>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>流量(每秒,单位:M)</span>
                </div>
                <div id="net-chart" style="width:100%; height:200px;"> </div>
            </el-card>
        </el-row>
    </div>
</template>
<script>
    import superagent from "superagent";
    import Highcharts from 'highcharts';
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    export default {
        data() {
            return {
                connections: [],
                cmds: [],
                stats: [],
                nets: [],
                hits: 0,
                conns: 0,
                serverip: '',
                server: {
                    cmds: [],
                    nets: [],
                    bytes: 0, //存储空间
                    limit_maxbytes: 0, //内存空间
                    bytes_written: 0 //发送数据
                }
            }
        },
        async mounted() {
            var self = this;
            await self.onStats();
            setInterval(async() => {
                await self.onStats();
            }, 3000);
            this.$nextTick(function () {
                self.refresh();
            })

        },
        methods: {
            async onStats() {
                var self = this;
                var maxCount = 20;
                var result = (await superagent.get("/api/stats")).body;
                //console.log(result.body)
                if (result.code === 200) {
                    self.stats = result.body;

                    var conns = 0,
                        cmds = 0,
                        get_hits = 0,
                        cmd_get = 0,
                        bytes = 0,
                        limit_maxbytes = 0,
                        bytes_written = 0;

                    //
                    var servers = self.stats;
                    if (self.serverip !== '') {
                        servers = servers.filter((x) => {
                            return x.server === self.serverip;
                        })
                    }
                    servers.forEach((x) => {
                        conns += x.curr_connections;
                        cmds += x.cmd_get + x.cmd_set;
                        get_hits += x.get_hits;
                        cmd_get += x.cmd_get;

                        bytes += x.bytes;
                        limit_maxbytes += x.limit_maxbytes;
                        bytes_written += x.bytes_written;
                    });
                    self.server.bytes = Math.round(bytes / (1024 * 1024 * 1024));
                    self.server.limit_maxbytes = Math.round(limit_maxbytes / (1024 * 1024 * 1024));

                    var date = (new Date()).getTime();
                    self.connections.push({
                        x: date,
                        y: conns
                    });
                    self.server.cmds.push({
                        x: date,
                        y: cmds
                    });
                    self.server.nets.push({
                        x: date,
                        y: bytes_written
                    });


                    if (self.server.cmds.length > 1) {
                        var lastCmds = self.server.cmds[self.server.cmds.length - 2];
                        self.cmds.push({
                            x: date,
                            y: Math.round((cmds - lastCmds.y) * 1000 / (date - lastCmds.x))
                        });
                    }
                    if (self.server.nets.length > 1) {
                        var lastCmds = self.server.nets[self.server.nets.length - 2];
                        self.nets.push({
                            x: date,
                            y: parseFloat(((bytes_written - lastCmds.y) * 1000 / ((date - lastCmds.x) * (1024 *
                                1024))).toFixed(1))
                        });
                    }



                    if (self.connections.length > maxCount) {
                        self.connections = self.connections.slice(self.connections.length - maxCount);
                    }
                    if (self.cmds.length > maxCount) {
                        self.cmds = self.cmds.slice(self.cmds.length - maxCount);
                    }

                    //命中率
                    self.hits = Math.round(get_hits / cmd_get * 100);
                    self.conns = conns;
                }
            },
            onChange() {
                var self = this;
                self.connections = [];
                self.cmds = []
                self.nets = []
                self.server.cmds = []
                self.server.nets = []

                Highcharts.charts.forEach(x => {
                    x.series[0].setData([]);
                })
            },
            refresh() {
                var self = this;
                var now = (new Date()).getTime();
                self.chart('conns-chart', [], () => self.connections.length ? self.connections[self.connections
                    .length - 1] : {
                    x: now,
                    y: 0
                });
                self.chart('cmds-chart', [], () => self.cmds.length ? self.cmds[self.cmds.length - 1] : {
                    x: now,
                    y: 0
                });
                self.chart('net-chart', [], () => self.nets.length ? self.nets[self.nets.length - 1] : {
                    x: now,
                    y: 0
                });
            },
            chart(elm, data, setpcb) {
                var self = this;
                return Highcharts.chart(elm, {
                    chart: {
                        type: 'spline',
                        animation: Highcharts.svg, // don't animate in old IE
                        marginRight: 10,
                        events: {
                            load: function () {

                                // set up the updating of the chart each second
                                var series = this.series[0];
                                setInterval(function () {
                                    series.addPoint(setpcb(), true, series.data.length > 20);
                                }, 5000);
                            }
                        }
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        type: 'datetime',
                        tickPixelInterval: 100
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return this.y;
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    series: [{
                        name: 'Random data',
                        data: data,
                        marker: {
                            enabled: false
                        }
                    }]
                });
            }
        }
    }
</script>

<style scoped>
    .el-row,
    .el-col {
        margin-bottom: 20px;
    }
</style>