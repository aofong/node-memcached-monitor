var Mock = require('mockjs');
var mssql = require('mssql');
var memcached = require('./sync/memcached');
var config = require('./config');
var mssqlhelper = require('./sync/mssqlhelper');

var configmap = config.getting();

//TODO:存储缓存key的表名
var tableName = 'caches';

exports.search = async (key) => {
    if (!configmap.closeMock) {
        var vdata = Mock.mock({
            'data|10-40': [{
                'name|4-8': /[a-z][A-Z][0-9]/,
                'size|1-4': /[0-9]/,
                'ttl': Date.now() / 1000,
                'platform': 'memcached'
            }]
        });
        return vdata.data;
    }

    //TODO:实现搜索key功能，上述代码可以删除
    var request = await mssqlhelper.request();
    var result = await request.query(`select top 1000 * from ${tableName} where name like '${key}%'`);
    return result.recordset;
}


exports.del = async (keys) => {
    if (!configmap.closeMock) {
        return true;
    }


    //TODO:实现删除key功能，上述代码可以删除
    var request = await mssqlhelper.request();
    var result = await request.input('keys', keys).query(`delete from ${tableName} where name in (@keys)`);
    if (result.rowsAffected > 0) {
        Promise.all(keys.map(async (x) => {
            await memcached.del(x);
        }));
        return true;
    }

    return false;
}


exports.get = async (key) => {
    if (!configmap.closeMock) {
        var Random = Mock.Random;
        var vdata = Mock.mock({
            'name|4-8': /[a-z][A-Z][0-9]/,
            'platform': 'memcached',
            'size': Random.integer(10, 5000),
            'ttl': new Date(),
            'value': {
                classId: Random.integer(1000, 9999),
                className: Random.ctitle(5, 10)
            }
        });
        return vdata;
    }

    //TODO:实现获取key value值功能，上述代码可以删除
    return await memcached.get(key);
}

exports.stats = async () => {
    if (!configmap.closeMock) {
        var Random = Mock.Random;
        var vdata = Mock.mock({
            'data|1-10': [{
                'server': Random.ip(),
                'curr_connections|100-999': 1,
                'cmd_get|100-999': 1,
                'cmd_set|100-999': 1,
                'get_hits|100-999': 1,
                'bytes|100000000-1000000000': 1,
                'limit_maxbytes|100000000-1000000000': 1,
                'bytes_written|10000-100000': 1
            }]
        });
        return vdata.data;
    }

    //TODO:实现获取key value值功能，上述代码可以删除
    return await memcached.stats();
}

/**
 * 保存配置文件
 * 
 * @param {any} setting 
 * @returns 
 */
exports.setting = async (setting) => {
    var result = await config.setting(setting);
    configmap = result;
}

exports.getting = () => {
    return configmap;
}