var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./api');
var log = require('./sync/log');
var config = require('./config');

var config = config.getting();

var sync = require('./sync/index')


//app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/search', async function (req, res) {
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

app.get('/del', async function (req, res) {
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

app.get('/get', async function (req, res) {
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

app.get('/stats', async function (req, res) {
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


app.post('/setting', async function (req, res) {
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

app.get('/getting', function (req, res) {
    var result = api.getting();
    res.send({
        code: 200,
        message: 'sucess',
        body: result
    });
});

app.get('/log', async function (req, res) {
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
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});