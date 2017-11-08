var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var api = require('./api');
var log = require('./sync/log');
var config = require('./config');

var config = config.getting();

//var sync = require('./sync/index')


//app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/search', function (req, res) {
    var key = req.query.key;
    var data = api.search(key);
    res.send({
        code: 200,
        message: 'sucess',
        body: data
    });
});

app.get('/del', function (req, res) {
    var keys = (req.query.keys || '').split(',');
    var data = api.del(keys);
    res.send({
        code: 200,
        message: 'sucess',
        body: data
    });
});

app.get('/get', function (req, res) {
    var key = req.query.key;
    var data = api.get(key);
    res.send({
        code: 200,
        message: 'sucess',
        body: data
    });
});

app.get('/stats', async function (req, res) {
    var data = await api.stats();
    res.send({
        code: 200,
        message: 'sucess',
        body: data
    });
});


app.post('/setting', async function (req, res) {
    var setting = req.body;
    var result = await api.setting(setting);
    res.send({
        code: 200,
        message: 'sucess',
        body: setting
    });
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
            message: error.message,
            body: error.message
        });
    }
});


var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});