var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function (request, response) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    if (request.method === 'GET' && request.url === '/test') {
		fs.readFile('./index.html', function(err, content) {
			response.end(content);
		});
    } else {
		response.statusCode = 404;
		response.write('<h1>404: Zła ścieżka!</h1>');
		fs.readFile('./cat.jpeg', function(err, content) {
			response.write('<html><body><img src="data:cat/jpeg;base64,')
			response.write(Buffer.from(content).toString('base64'));
			response.end('"/></body></html>');
		});		
    }
});
server.listen(9000);
