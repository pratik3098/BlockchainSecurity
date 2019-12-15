const ethers = require('ethers')
const ganache = require('ganache-cli')
const server = ganache.server('mnemonic')
const port = 8545
let provider=new ethers.providers.JsonRpcProvider('http://localhost:'+port)
let mnemonic = Object.values(Object.values(server.provider)[3])[15]
let wallet= ethers.Wallet.fromMnemonic(mnemonic)
wallet.connect(provider)
let contract
// Cheque parameters
let to = '0xffcf8fdee72ac11b5c542428b35eef5769c409f0'
let amount = '1.0'
server.listen(port,()=>{
    console.log('Server listen port : '+ port)
 })



async function signPayment() {
    let amountWei = ethers.utils.parseEther(amount);

    let message = ethers.utils.concat([
                      ethers.utils.hexZeroPad(to, 20),
                      ethers.utils.hexZeroPad(ethers.utils.hexlify(amountWei), 32),
                  ]);

    let messageHash = ethers.utils.keccak256(message);

    let sig = await wallet.signMessage(ethers.utils.arrayify(messageHash));
    let splitSig = ethers.utils.splitSignature(sig);

    console.log(`to: ${to}`);
    console.log(`amount: ${amountWei}`);
    console.log();
    console.log(`r: ${splitSig.r}`);
    console.log(`s: ${splitSig.s}`);
    console.log(`v: ${splitSig.v}`);
}

//signPayment();



