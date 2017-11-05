exports.search = () => {
    return [{
        name: 'keys',
        platform: 'memcached'
    }, {
        name: 'keys',
        platform: 'memcached'
    }, {
        name: 'keys',
        platform: 'memcached'
    }]
}


exports.del = () => {
    return true;
}


exports.get = () => {
    return {
        name: 'keys',
        platform: 'memcached',
        value: 'dfdfddfdfdfdf',
        ttl: new Date()
    };
}