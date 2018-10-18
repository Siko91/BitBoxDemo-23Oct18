const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;
const BITBOX = new BITBOXSDK;

var mnemonic = BITBOX.Mnemonic.generate(128);
var seed = BITBOX.Mnemonic.toSeed(mnemonic);
var hdnode = BITBOX.HDNode.fromSeed(seed);
console.log(mnemonic);
console.log(BITBOX.HDNode.toXPub(hdnode));
