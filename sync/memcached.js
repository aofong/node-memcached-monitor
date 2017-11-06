var Memcached = require('memcached');
var util = require('util');
//var memcached = new Memcached(['119.254.116.166:47219']);
var memcached = new Memcached(['119.254.116.165:47219', '119.254.116.166:47219', '119.254.116.167:47219', '119.254.152.170:47219', '119.254.152.171:47219', '119.254.152.172:47219']);

var m = {};
Object.keys(memcached.__proto__).forEach(x => {
    m[x] = util.promisify(memcached[x]).bind(memcached);
})

module.exports = m;