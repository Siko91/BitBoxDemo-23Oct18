module.exports = { convertFiatToBCH : convertFiatToBCH }

var https = require('https');

function convertFiatToBCH(amount, fiatCurency, callback) {
    //https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/?convert=EUR
    httpGet("https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/?convert=" + 
        fiatCurency.toString().toUpperCase(), (data)=>
    {
        var price = data[0][("price_" + fiatCurency).toLowerCase()];
        price = parseFloat(price);
        callback(amount / price);
    });
}

function httpGet(url, callback) {
    https.get(url, (res) => {
        res.on('data', (data) => {
            callback(JSON.parse(data));
        });
    }).on('error', (e) => {
        console.error(e);
    });
}