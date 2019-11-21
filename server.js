var express = require('express');
var product = require('models/Product');
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
// index page
app.get('/', function (req, res) {
res.send('Express is running');
});

app.get('/api', function (req, res) {
    var version = {version : "1.00"};
    res.json(version);
    });


var port = process.env.PORT || 8080;
app.listen(port, function () {
console.log('App is running on http://localhost:' + port);
});