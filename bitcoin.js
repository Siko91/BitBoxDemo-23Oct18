module.exports = { checkIsPaid : checkIsPaid }

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
const BITBOX = new BITBOXSDK;

const xpub = 'xpub661MyMwAqRbcGDjqdcZX3HDMnCifGDC9cEGVxGTP8ee5TApDEeeZbqXA4Vf9h9BnsLGawNAPRFmAZYm4pbwAKjD4G2CD9sEJrLKVdfhn8gn'


function checkIsPaid(id, price, paidCallback, notPaidCallback) {
    
    /// \todo generate unique address based on id
    var address = BITBOX.Address.fromXPub(xpub);

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

