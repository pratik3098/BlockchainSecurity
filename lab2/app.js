const ethers = require('ethers')
const ganache = require('ganache-cli')
const server = ganache.server()
let port = 8090
let provider=new ethers.providers.JsonRpcProvider('http://localhost:'+port)

let privateKey= '0x5aebccecefb08a00a7c74d68a17b973d1bb5896e1194c6e949fe144747677c8d'
let wallet= new ethers.Wallet(privateKey, provider)


wallet.sendTransaction({
    to: '0xA91F9Bf0578a0820cD2A83AAb0e4ae9F0f17BAE4',
    value: ethers.utils.parseEther('0.1')
}).then(tx => {
   console.log(tx)
}).catch(err=>{
   console.error('Error: ', err.message )
}) 

server.listen(port,()=>{
   console.log('Server listen port : '+ port)
})

