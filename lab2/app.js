const ethers = require('ethers')
const ganache = require('ganache-cli')
const server = ganache.server('mnemonic')
const port = 8545
let provider=new ethers.providers.JsonRpcProvider('http://localhost:'+port)
let mnemonic = Object.values(Object.values(server.provider)[3])[15]

let wallet= ethers.Wallet.fromMnemonic(mnemonic)
wallet.connect(provider)

wallet.sign({
   to: '0x27AA8c520E6D41f2274d9F2C30D9EfFc4C357e31',
   value: ethers.utils.parseEther('0.1'),
   gasLimit: 4712388,
  gasPrice: 100000000000
}).then(res=>{
   console.log('Signed transcation: '+res)
   
   provider.sendTransaction(res).then(tx=>{
      console.log(tx)

   }).catch(err=>{
      console.error('Error:', err.message)
   })

}).catch(err=>{
   console.error('Error: ', err.message )
   console.log(err.transaction)
}) 

server.listen(port,()=>{
   console.log('Server listen port : '+ port)
})
