var http = require('http');
var querystring = require('querystring');

http.createServer(function(req, res) {
	var params = querystring.parse(req.url);
	res.end(params['/?echo']);
}).listen(process.env.PORT || 1337);