var http = require('http');
var querystring = require('querystring');

var cache = [];

http.createServer(function(req, res) {
	var params = querystring.parse(req.url);
	var key;
	
	if(params['/?echo']) {
		res.end(params['/?echo']);
	}
	if(params['/?echo64']) {
		var b = new Buffer(params['/?echo64'], 'base64');
		res.end(b.toString());
	}
	if(params['/?json']) {
		var json = JSON.stringify(o);
		res.end(json);
	}
	if(params['/?store']) {
		key = Math.round(Math.random() * 100000000);
		cache[key] = params['/?store']
		res.end(key.toString());
	}
	if(params['/?retrieve']) {
		key = params['/?retrieve'];
		res.end(cache[key]);
	}
}).listen(process.env.PORT || 1337);