const fs = require('fs');const { Alchemy, Network } = require('alchemy-sdk'); // Menggunakan require untuk mengimpor library Alchemy
require('colors');
const settings = {
    apiKey: "Ii_Z2-PK1HdkR3-qk4yN8LIyd6u_pn8X",    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);
const provider = alchemy.getProvider(); // Mendapatkan provider dari Alchemy
const addresses = fs
    .readFileSync('hits.txt', 'utf8')    .split('\n')
    .map((val) => {        return val.split(',');
    });
(async () => {    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i][0];        try {
            const balance = await provider.getBalance(address); // Menggunakan provider Alchemy untuk mendapatkan saldo            if (balance.gt(0)) {
                console.log(address.bgGreen.black, balance.toString().bgGreen.black);                console.log('Private Key: '.yellow, addresses[i][1]);
            } else {                console.log(address, 0);
            }        } catch (error) {
            console.error(`Error retrieving balance for address ${address}: ${error.message}`.red);        }
    }})();
// Get the latest block
const latestBlock = alchemy.core.getBlockNumber();
// Get all outbound transfers for a provided addressalchemy.core
    .getTokenBalances('0xb5cf00b4E06401513b5958463D660d9CA1427E1b')    .then(console.log);
// Get all the NFTs owned by an address
const nfts = alchemy.nft.getNftsForOwner("vitalik.eth");
// Listen to all new pending transactionsalchemy.ws.on(
    { method: "alchemy_pendingTransactions", fromAddress: "vitalik.eth" },    (res) => console.log(res)
);