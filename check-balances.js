const fs = require('fs')
const ethers = require('ethers')
require('colors')

const provider = new ethers.providers.WebSocketProvider(
    'wss://eth-mainnet.g.alchemy.com/v2/Ii_Z2-PK1HdkR3-qk4yN8LIyd6u_pn8X'
)

const addresses = fs
    .readFileSync('hits.txt', 'utf8')
    .split('\n')
    .map((val) => {
        return val.split(',')
    })

;(async () => {
    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i][0]
        const balance = await provider.getBalance(address)

        if (balance.gt(0)) {
            console.log(address.bgGreen.black, balance.toString().bgGreen.black)
            console.log('Private Key: '.yellow, addresses[i][1])
        } else {
            console.log(address, 0)
        }
    }
})()
