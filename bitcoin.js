module.exports = { checkIsPaid : checkIsPaid }

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
const BITBOX = new BITBOXSDK;

const xpub = 'xpub661MyMwAqRbcGDjqdcZX3HDMnCifGDC9cEGVxGTP8ee5TApDEeeZbqXA4Vf9h9BnsLGawNAPRFmAZYm4pbwAKjD4G2CD9sEJrLKVdfhn8gn'

var derivation_path_idx = 0;
var orders = [];

function checkIsPaid(id, price, paidCallback, notPaidCallback) {
    
    // id is unique for client-product (productName + IP addr)
    
    var order = orders.find( order => order.id === id );
    console.log('order=', order);
    if (typeof order === 'undefined') {
		order = { id: id, addr_idx: derivation_path_idx };
		derivation_path_idx++;
		orders.push(order);
	}
    var address = BITBOX.Address.fromXPub(xpub, '0/'+order.addr_idx);
    console.log('derived from ', order.addr_idx);
    
    (async () => {
        try {
          var total = 0;
          var utxo = await BITBOX.Address.utxo([address]);
          var total=0;
          for (var i=0; i<utxo[0].length; i++)
          {
              total+=utxo[0][i].amount;
          }
          if (total<price)
          {
              notPaidCallback(address);
          }
          else
          {
              paidCallback();
          }
        } catch(error) {
          console.error(error)
        }
    })()
}
