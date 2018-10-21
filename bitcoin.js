module.exports = { checkIsPaid : checkIsPaid }

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
const BITBOX = new BITBOXSDK;

const xpub = 'xpub661MyMwAqRbcGDjqdcZX3HDMnCifGDC9cEGVxGTP8ee5TApDEeeZbqXA4Vf9h9BnsLGawNAPRFmAZYm4pbwAKjD4G2CD9sEJrLKVdfhn8gn'

var derivation_path_idx = 0;
var orders = [];

function checkIsPaid(id, price, paidCallback, notPaidCallback) {
    
    // id is unique for client-product (productName + IP addr)
    
    var order = orders.find( order => order.id === id );
    if (typeof order === 'undefined') {
        order = { id: id, addr_idx: derivation_path_idx };
        derivation_path_idx++;
        orders.push(order);
    }
    var address = BITBOX.Address.fromXPub(xpub, '0/'+order.addr_idx);
    
    (async () => {
        try {
            var details = await BITBOX.Address.details(address);
            var total = details.totalReceived;
            if (details.unconfirmedBalance > 0) {
                total += details.unconfirmedBalance;
            }
            if (total < price) {
                notPaidCallback(address);
            }
            else {
                paidCallback();
            }
        } catch(error) {
          console.error(error)
        }
    })()
}
