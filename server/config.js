var fs = require('fs');
var path = require('path');
var util = require('util');
var configPath = path.join(process.cwd(), './config.json');

var config = null;


//配置文件默认值
//请到web界面进行配置详细参数
var defaultConfig = {
    "port": 3000,
    "synctime": 5,
};

function getting() {
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, '');
    }
    return JSON.parse(fs.readFileSync(configPath).toString() || JSON.stringify(defaultConfig));
}

/**
 * 保存配置文件
 * 
 * @param {any} setting 
 * @returns 
 */
exports.setting = async(setting) => {
    var time = new Date();
    var now = `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    setting.lastAccess = now;
    config = setting;
    await util.promisify(fs.writeFile)(configPath, JSON.stringify(setting, null, 4));
    return config;
}
/**
 * 获取配置文件
 * 
 * @returns 
 */
exports.getting = () => {
    return config === null ? getting() : config;
}