var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var util = require('util');
var bmiCalculator = require('./modules/bmiCalculator');
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
    fs.readFile(path.resolve(__dirname, 'form.html'), function (err, data) {
	if(err) throw err;
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}
function processAllFieldsOfTheForm(req, res) {
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

server.listen(1185);
console.log("server listening on 1185");