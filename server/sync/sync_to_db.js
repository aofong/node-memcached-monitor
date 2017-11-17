var readLine = require('lei-stream').readLine;
var log = require('./log');
var mssqlhelper = require('./mssqlhelper');
var path = require('path');
var logpath = path.join(process.cwd(), './server/sync/keys.log');

//TODO:存储缓存key的表名
var tableName = 'caches';
var _table = null;
var insertCount = 0;

async function insert(data) {
    try {
        if (_table === null) {
            const table = new mssqlhelper.mssql.Table(tableName);
            table.columns.add('name', mssqlhelper.mssql.NVarChar(400));
            table.columns.add('platform', mssqlhelper.mssql.NVarChar(50));

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
        mssqlhelper.mssql.close();
        log.log(`[ERROR]:${error.message}`);
    }
}

async function syncdb() {
    if (_table === null) {
        return;
    }

    try {
        var request = await mssqlhelper.request();
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
        readLine(logpath).go(async(data, next) => {
            await insert(data);
            next();
        }, async function () {
            await syncdb();
            mssqlhelper.mssql.close();
            log.log(`[sync db] is over,${insertCount}`);
            resolve();
        });
    })
}