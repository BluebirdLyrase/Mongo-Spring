var express = require('express');
var productObject = require('./models/Product.js');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true, useUnifiedTopology: true }); // connect to our database
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// index page
app.get('/', function (req, res) {
    res.send('Express is running');
});

app.get('/api', function (req, res) {
    var version = { version: "1.00" };
    res.json(version);
});

////product/////
////////////in post men use     x-www-form-urlencoded tab
app.post('/api/products', function (req, res) {
    var newproduct = req.body;
    var product = new productObject(newproduct);
    product.save(function (err) {
        if (err) res.status(500).json(err);
        res.json({ status: "Added a product" });
    });
});

app.get('/api/products', function (req, res) {
    productObject.find(function (err,products) {
        if (err) res.status(500).json(err);
        res.json(products);
    });
});


///////get w/ id/////// http://localhost:8080/api/products/5dd60b06ea531f0b28e40390
app.get('/api/products/:id', function (req, res) {
    var id = req.params.id;
    productObject.find({"_id":id},function (err,products) {
        if (err) res.status(500).json(err);
        res.json(products);
    });
});

app.put('/api/products/:id', function (req, res) {
    var id = req.params.id;
    var updateProduct = req.body;
    // productObject.findByIdAndUpdate({"_id":id},updateProduct,function (err) {
    productObject.findByIdAndUpdate(id,updateProduct,function (err) {
        if (err) res.status(500).json(err);
        res.json({status : "update product"});
    });
});

app.delete('/api/products/:id', function (req, res) {
    var id = req.params.id;
    productObject.findByIdAndRemove(id,function (err) {
        if (err) res.status(500).json(err);
        res.json({status : "delete a product"});
    });
});


var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});