require("babel-polyfill");
var express = require('express');
var formidable = require('formidable');
var path = require('path');
var bmiCalculator = require('./modules/bmiCalculator');

var app = express();
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'views'));
app.get('/', function (req, res) {
    renderIndex(res);
});
app.post('/', function (req, res) {
    processFormFields(req, res);
});

function renderIndex(res, params) {
    if (params) {
        res.render('index', params);
    }
    else {
        res.render('index', {bmi: null});
    }
};

function processFormFields(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if (err) throw err;
        var weight = fields.weight;
        var height = fields.height;
        var bmi = bmiCalculator(Number(fields.height), Number(fields.weight));
        var formData = {weight: weight, height: height};
        renderIndex(res, {formData: formData,  bmi: bmi});
        res.end();
    });
}

var server = app.listen(1185, function () {
    console.log("server listening on http://localhost:1185/");
});
