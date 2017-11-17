var mssql = require('mssql');
var pool = null;

//TODO:替换成实际的mssql服务器
var dbconfig = {
    user: 'root',
    password: '123456',
    server: 'localhost',
    database: 'monitor',
    options: {
        useUTC: false
    }
};

exports.mssql = mssql;

exports.request = async() => {
    if (pool == null || !pool.connected) {
        mssql.close();
        pool = await mssql.connect(dbconfig);
    }
    return await new mssql.Request();
}