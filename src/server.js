var http = require('http');
var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var util = require('util');
var bmiCalculator = require('./modules/bmiCalculator');

var app = express();

app.get('/', function (req, res) {
        displayForm(res);
});
app.post('/', function (req, res) {
    processFormFields(req, res);
});

function displayForm(res) {
    res.sendFile(path.resolve(__dirname, 'form.html'));
};
function processFormFields(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields ) {
        if (err) throw err;

        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        var bmi = bmiCalculator(Number(fields.height), Number(fields.weight));
//        res.write('received the data:\n\n');
//        res.write(fields);
//        console.log('_______');
        res.write('bmi:'+bmi);
        res.end(util.inspect({
            fields: fields
        }));

    });
}

var server = app.listen(1185, function() {
    console.log("server listening on 1185");
});
