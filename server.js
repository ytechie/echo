var http = require('http');
var querystring = require('querystring');


http.createServer(function(req, res) {
	var params = querystring.parse(req.url);
	if(params['/?echo']) {
		res.end(params['/?echo']);
	}
	if(params['/?echo64']) {
		var b = new Buffer(params['/?echo64'], 'base64');
		res.end(b.toString());
	}
}).listen(process.env.PORT || 1337);