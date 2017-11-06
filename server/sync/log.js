var fs = require('fs');
var path = require('path');

exports.appendFile = (_path, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(_path, data, (err, file) => {
            if (err) {
                return reject(err);
            }
            resolve(true);
        });
    })
}


exports.log = async(data) => {
    var logpath = path.join(process.cwd(), './server.log');
    var time = new Date();
    var file = `${data},${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}\r\n`;
    await exports.appendFile(logpath, file)
}

exports.unlog = async(data) => {
    var logpath = path.join(process.cwd(), './server.log');
    await exports.unlink(logpath)
}