let etherUtil = require('ethereumjs-util')
let crypto = require('crypto')

while (true) {
    let privateKey = crypto.randomBytes(32) 
    let publicKey = etherUtil.privateToPublic(privateKey)
    let keyHash = etherUtil.keccak256(publicKey).slice(12).toString('hex')
    if (keyHash.slice(0, 4) === '1234') {   
        console.log('Private Key: ' + privateKey.toString('hex'))
        console.log('Address: ' + '0x' + keyHash )
        break;
    }
}