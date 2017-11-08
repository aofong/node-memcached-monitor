var Memcached = require('memcached');
var util = require('util');

var config = require('../config');


var config = config.getting();
var ips = (config.ips || '').split('\n');
var m = {};

if (ips.length) {
    var memcached = new Memcached(ips);
    Object.keys(memcached.__proto__).forEach(x => {
        m[x] = util.promisify(memcached[x]).bind(memcached);
    })
}


module.exports = m;