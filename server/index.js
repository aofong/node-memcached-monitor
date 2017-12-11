var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var api = require('./api');
var log = require('./sync/log');
var configMap = require('./config');

var config = configMap.getting();

var sync = require('./sync/index')


app.use(express.static('dist'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



app.get('/api/search', async function (req, res) {
    var key = req.query.key || '';
    try {
        var data = await api.search(key);
        res.send({
            code: 200,
            message: 'sucess',
            body: data
        });
    } catch (error) {
        res.send({
            code: 500,
            message: error.message,
            body: error.message
        });
    }
});

app.get('/api/del', async function (req, res) {
    var keys = (req.query.keys || '').split(',');
    if (!keys.length) {
        return res.send({
            code: 500,
            message: '没有传递keys',
            body: ''
        });
    }
    try {
        var data = await api.del(keys);
        res.send({
            code: 200,
            message: 'sucess',
            body: data
        });
    } catch (error) {
        res.send({
            code: 500,
            message: error.message,
            body: error.message
        });
    }
});

app.get('/api/get', async function (req, res) {
    var key = req.query.key;
    try {
        var data = await api.get(key);
        res.send({
            code: 200,
            message: 'sucess',
            body: data
        });
    } catch (error) {
        res.send({
            code: 500,
            message: error.message,
            body: error.message
        });
    }
});

app.get('/api/stats', async function (req, res) {
    try {
        var data = await api.stats();
        res.send({
            code: 200,
            message: 'sucess',
            body: data
        });
    } catch (error) {
        res.send({
            code: 500,
            message: 'ERROR,如果您修改过服务器ip配置，请重新启动服务！',
            body: error.message
        });
    }
});


app.post('/api/setting', async function (req, res) {
    var setting = req.body;
    try {
        var result = await api.setting(setting);
        res.send({
            code: 200,
            message: 'sucess',
            body: setting
        });
    } catch (error) {
        res.send({
            code: 500,
            message: error.message,
            body: error.message
        });
    }
});

app.get('/api/getting', function (req, res) {
    var result = api.getting();
    res.send({
        code: 200,
        message: 'sucess',
        body: result
    });
});

app.get('/api/log', async function (req, res) {
    try {
        var data = await log.readLog();
        res.send({
            code: 200,
            message: 'sucess',
            body: data.toString() || 'The log is empty!'
        });
    } catch (error) {
        res.send({
            code: 500,
            message: 'The log is empty!',
            body: error.message
        });
    }
});

app.use(function (err, req, res, next) {
    res.send({
        code: 500,
        message: 'ERROR,如果您修改过服务器ip配置，请重新启动服务！',
        body: err.message
    });
})
var server = app.listen(config.port, function () {
    console.log('服务已启动，生产环境请访问地址:http://localhost:%s，开发环境请访问:http://localhost:3010', config.port);
});