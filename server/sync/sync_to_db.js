var readLine = require('lei-stream').readLine;
var mssql = require('mssql');
var log = require('./log');

var mssqlconfig = {
    user: '63H^&JQ&UYQ^jk8u5jhy77jsa96',
    password: 'Mb7UQ678yju2U@&@^3722&4j2j2',
    server: '119.254.116.182',
    database: 'ExamSystem',
    options: {
        useUTC: false
    }
}

var tableName = 'Examda_Cache_Keys';
var _table = null;
var pool = null;
var insertCount = 0;


async function sqldb() {
    if (pool == null || !pool.connected) {
        mssql.close();
        pool = await mssql.connect(mssqlconfig);
    }
    return await new mssql.Request();
}


async function insert(data) {
    try {
        if (_table === null) {
            const table = new mssql.Table(tableName);
            table.columns.add('keyName', mssql.NVarChar(400));
            table.columns.add('platform', mssql.NVarChar(50));

            _table = table;
        }

        if (data === null || data === '') {
            return;
        }
        _table.rows.add(data, 'memcached', -1);

        if (_table.rows.length >= 50000) {
            await syncdb();
        } else {
            return;
        }
    } catch (error) {
        mssql.close();
        log.log(`[ERROR]:${error.message}`);
    }
}

async function syncdb() {
    if (_table === null) {
        return;
    }

    try {
        const request = await sqldb()
        var result = await request.bulk(_table);
        _table = null;
        insertCount += result.rowsAffected;
        log.log(`[sync db] insert ${result.rowsAffected} rows`);
    } catch (error) {
        log.log(`[ERROR]:${error.message}`);
    }
}



exports.sync = () => {
    log.log('[sync db] is start');
    insertCount = 0;
    new Promise((resolve, reject) => {
        readLine('./keys.log').go(async(data, next) => {
            await insert(data);
            next();
        }, async function () {
            await syncdb();
            mssql.close();
            log.log(`[sync db] is over,${insertCount}`);
            resolve();
        });
    })
}