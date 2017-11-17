var schedule = require('node-schedule');
var localhost = require('./sync_to_localhost');
var db = require('./sync_to_db');
var log = require('./log');

log.log('cacheService is start');

schedule.scheduleJob('10 0 6 * * *', async() => {
    await log.unlog();
});

schedule.scheduleJob('0 */15 7-18 * * *', async() => {
    log.log('\r\n----------------------step');
    await localhost.sync();
    await db.sync();
});

// (async() => {
//     await localhost.sync();
//     await db.sync();
// })()