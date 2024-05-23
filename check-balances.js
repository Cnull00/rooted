const fs = require('fs');
const { Alchemy, Network } = require('alchemy-sdk');
require('colors');

const settings = {
    apiKey: "Ii_Z2-PK1HdkR3-qk4yN8LIyd6u_pn8X",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const addresses = fs
    .readFileSync('hits.txt', 'utf8')
    .split('\n')
    .map((val) => {
        return val.split(',');
    });

(async () => {
    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i][0];
        try {
            const balance = await alchemy.getTokenBalances(address); // Menggunakan Alchemy untuk mendapatkan saldo
            if (balance.gt(0)) {
                console.log(address.bgGreen.black, balance.toString().bgGreen.black);
                console.log('Private Key: '.yellow, addresses[i][1]);
            } else {
                console.log(address, 0);
            }
        } catch (error) {
            console.error(`Error retrieving balance for address ${address}: ${error.message}`.red);
        }
    }
})();

// Get the latest block
const latestBlock = alchemy.getBlockNumber();

// Get all outbound transfers for a provided address
alchemy.getTokenBalances('${address}')
    .then(console.log);
);
