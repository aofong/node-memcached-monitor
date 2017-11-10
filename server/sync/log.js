var fs = require('fs');
var utils = require('util');
var path = require('path');
var logpath = path.join(process.cwd(), './server/sync/server.log');

exports.appendFile = (_path, data) => {
    return utils.promisify(fs.appendFile)(_path, data);
}

exports.readFile = (_path) => {
    return utils.promisify(fs.readFile)(_path);
}


exports.log = async (data) => {
    var time = new Date();
    var file = `${data},${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}\r\n`;
    await exports.appendFile(logpath, file)
}

exports.unlog = async (data) => {
    await exports.unlink(logpath)
}

exports.readLog = async () => {
    return await exports.readFile(logpath)
}