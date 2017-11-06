<template>
    <div>
        <el-row>
            <el-select v-model="server" placeholder="查看单台服务器" @change="onChange">
                <el-option :label="i.server" :value="i.server" :key="i.server" v-for="i in stats"></el-option>
            </el-select>
        </el-row>
        <el-row type="flex" justify="space-around">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>连接数</span>
                    </div>
                    <div id="conns-chart" style="width:100%; height:200px;"> </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>命令数</span>
                        <span>命中率= {{hits}}%</span>
                    </div>
                    <div id="cmds-chart" style="width:100%; height:200px;"> </div>
                </el-card>
            </el-col>
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
                hits: 0,
                server: ''
            }
        },
        async mounted() {
            var self = this;
            await self.onStats();
            setInterval(async() => {
                await self.onStats();
            }, 3000);
            this.$nextTick(function () {
                self.chart('conns-chart', self.connections, () => self.connections);
                self.chart('cmds-chart', self.cmds, () => self.cmds);
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

                    var conns = 0;
                    var cmds = 0;
                    var get_hits = 0;
                    var cmd_get = 0;

                    //
                    var servers = self.stats;
                    if (self.server !== '') {
                        servers = servers.filter((x) => {
                            return x.server === self.server;
                        })
                    }
                    servers.forEach((x) => {
                        conns += x.curr_connections;
                        cmds += x.cmd_get + x.cmd_set;
                        get_hits += x.get_hits;
                        cmd_get += x.cmd_get;
                    });

                    var date = (new Date()).getTime();
                    self.connections.push({
                        x: date,
                        y: conns
                    });
                    self.cmds.push({
                        x: date,
                        y: cmds
                    });

                    if (self.connections.length > maxCount) {
                        self.connections = self.connections.slice(self.connections.length - maxCount);
                    }
                    if (self.cmds.length > maxCount) {
                        self.cmds = self.cmds.slice(self.cmds.length - maxCount);
                    }

                    //命中率
                    self.hits = Math.round(get_hits / cmd_get * 100);
                }
            },
            onChange() {
                var self = this;
                self.connections = [];
                self.cmds = []
            },
            chart(elm, data, setpcb) {
                var self = this;
                Highcharts.chart(elm, {
                    chart: {
                        type: 'spline',
                        animation: Highcharts.svg, // don't animate in old IE
                        marginRight: 10,
                        events: {
                            load: function () {

                                // set up the updating of the chart each second
                                var series = this.series[0];
                                setInterval(function () {
                                    series.setData(setpcb(), true, true);
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
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
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
                        data: data
                    }]
                });
            }
        }
    }
</script>

<style>
    .el-row {
        margin-bottom: 20px;
    }
</style>