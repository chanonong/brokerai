var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');


/* GET HOMEPAGE */
router.get('/', function(req, res, next) {
  	res.send('Please use GET /graphdata/:symbol \n e.g. get /graphdata/AAPL');
});




/* GET by symbol. */
router.get('/:symbol', function(req, res, next) {
  	console.log('GET GRAPH DATA FOR : ' + req.params.symbol);
	var options = { 
		host: 'dev.markitondemand.com',
		path: '/Api/v2/Quote/json?symbol=' + req.params.symbol
	};

	var stockdata = '';
	var getStock = http.get(options, function(getResponse) {
		getResponse.on('error', function(e) { console.log(e);}); 
		getResponse.on('data', function(chunk) { stockdata += chunk;}); 
		getResponse.on('end', function() { res.json(JSON.parse(stockdata));}); 
	});
	//getStock.write(req.body);
	getStock.end();
});

module.exports = router;
