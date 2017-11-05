var express = require('express');
var app = express();
var api = require('./service/api');
//app.use(express.static('public'));


app.get('/', function (req, res) {
    res.sendfile('./views/index.html');
});

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


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});