var http = require('http');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable')
var server = http.createServer(function (req, res) {
    displayForm(res);
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

server.listen(1185);
console.log("server listening on 1185");
