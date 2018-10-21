require("./utils.js");

var express = require('express');
var fs = require('fs');

var bitcoin = require('./bitcoin.js');
var priceConverter = require('./priceConverter.js');

var products = require('./products.json');

var notPaid = fs.readFileSync('notPaid.html', 'utf8');
var paid = fs.readFileSync('paid.html', 'utf8');

var app = express()
var port = 3000

app.get('/', (req, res) =>
	res.send(`Select Product : 
		<ul>` +
		products
			.map(p=>p.name)
			.map(p=>'<li><a href="/' + p + '">' + p + '</a></li>')
			.join("")
		+ `<ul>`)
);

products.forEach(p=>{
	app.get('/' + p.name, (req, res) => {
		priceConverter.convertFiatToBCH(p.price, p.currency, function convertionCallback(bchPrice) {
			bitcoin.checkIsPaid(p.name + req.ip, bchPrice,
				function paidCallback() { 
					res.send(paid.replaceAll('#data', p.data)) 
				},
				function notPaidCallback(addr) { 
					res.send(notPaid.replaceAll('#addr', addr).replaceAll('#price', bchPrice)) 
				}
			)
		});

	})
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
