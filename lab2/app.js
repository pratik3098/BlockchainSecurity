const ethers = require('ethers')


let provider=new ethers.providers.JsonRpcProvider()

let privateKey= '0x5aebccecefb08a00a7c74d68a17b973d1bb5896e1194c6e949fe144747677c8d'
let wallet= new ethers.Wallet(privateKey, provider)

console.log(wallet)


wallet.sendTransaction({
    to: "ricmoo.firefly.eth",
    value: ethers.utils.parseEther('0.1')
}).then(tx => {
   console.log(tx)
}).catch(err=>{
   console.error('Error: ',err )
})