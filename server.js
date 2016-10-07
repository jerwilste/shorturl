var express = require('express');
var validurl = require('valid-url');
var path = require('path');
var app = express();
var port = process.env.PORT || '8080';
var urls = [];
//var appUrl = 'https://fcc-iloanzi.c9users.io/';
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/index.html'));

});
app.get('/:url', function(req, res){
	res.redirect(urls[req.params.url]);
	res.end();
});
app.get('/shorten/:url*', function(req, res){
	var appUrl = req.protocol+'://'+req.host+'/';
	var u = req.url.slice(9);
	console.log(`requested ${u} to be shortened`);
	if (validurl.isHttpUri(u) || validurl.isHttpsUri(u)) {
		console.log('url is valid');
		urls.push(u);
		var newu = appUrl + ((urls.length-1).toString());
		console.log(urls.length-1);
		res.send(JSON.stringify({original_url: u, new_url: newu}));
	}
	else {
		console.log('url is NOT valid');
		res.send(JSON.stringify({error: 'incorrect format'}));
	}
});
app.listen(port);
