# node-memcached-monitor
node-memcached-monitor nodejs版本实现memcache服务监控、keys管理

实现功能：

1. 服务器基础数据：系统分配内存、存储占用内存
2. 连接数：实时客户端连接数
3. 命令数：实时每秒处理命令数、key值命中率
4. 流量：实时每秒服务器发送流量
5. key：实现key搜索、查看、删除功能、占用大小、过期时间
6. 集群：支持集群模式


[https://github.com/aofong/node-memcached-monitor](github)

# 默认配置
默认采用mockjs数据模拟相关数据

您可要在配置页进行实例数据配置，配置完后记得重做服务！

## 默认存储
内置使用mssql存储缓存key值，表结构如下：

表名：caches

说明：name 建唯一索引，并忽略重复

|id|name|size|ttl|platform| 
|-|-|-|-|-| 
|1|cachekey|123|123456789|memcached| 

## 默认参数：

nodejs服务运行端口：3000 

缓存同步时间：15分钟 


## 文件目录
server 存储nodejs服务代码

src 存储vuejs源文件

disk 生成环境代码

config.js 运行配置

server/sync/mssqlhelper.js  内置mssql连接问题，可在此修改数据库连接

server/api.js 接口服务，可在此移除mockjs数据 或者实现其他的存储


# 运行预览

![服务监控](https://gitee.com/uploads/images/2017/1108/172122_8012b273_341398.png "服务监控")