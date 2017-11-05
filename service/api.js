var Mock = require('mockjs');


exports.search = (key) => {
    var vdata = Mock.mock({
        'data|1-10': [{
            'name|4-8': /[a-z][A-Z][0-9]/,
            'platform|1': ['redis', 'memcached']
        }]
    });
    return vdata.data;
}


exports.del = (keys) => {
    return true;
}


exports.get = (key) => {
    var Random = Mock.Random;
    var vdata = Mock.mock({
        'name|4-8': /[a-z][A-Z][0-9]/,
        'platform|1': ['redis', 'memcached'],
        ttl: new Date(),
        'value': Random.cparagraph(20, 50)
    });
    return vdata;
}