var memcached = require('./memcached');
var fs = require('fs');
var path = require('path');
var util = require('util');
var log = require('./log');

var keypath = path.join(process.cwd(), './server/sync/keys.log');

fs.writeFile = util.promisify(fs.writeFile);
fs.appendFile = util.promisify(fs.appendFile);

exports.flushFile = async() => {
    await fs.writeFile(keypath, '');
}

exports.sync = async() => {
    try {
        log.log('[sync file] is start');
        await exports.flushFile();
        var items = await memcached.items();
        await Promise.all(
            items.map(async(i) => {
                var itemSet = i;
                var keys = Object.keys(itemSet);
                keys.pop();
                var serverKey = await Promise.all(
                    keys.map(async(k) => {
                        var stats = k;
                        let dumps = await memcached.cachedump(itemSet.server, parseInt(stats), 0);
                        if (!Array.isArray(dumps)) {
                            dumps = [dumps];
                        }
                        if (dumps && dumps.length) {
                            var str = ``;
                            for (var index = 0; index < dumps.length; index++) {
                                str += `${dumps[index].key}\n`;
                            }
                            await fs.appendFile(keypath, str);
                        }
                        //log.log(`[${itemSet.server}=>${stats}]:${dumps.length}`);
                        return Promise.resolve(dumps.length);
                    })
                );
                var serverKeys = serverKey.reduce(function (a, b) {
                    return a + b;
                }, 0);
                log.log(`[sync file]${itemSet.server}=>${serverKeys}`);
            })
        );
        log.log('[sync file] is over');
    } catch (error) {
        console.log(error);
        log.log(`[ERROR]:${error.message}`);
    }
}