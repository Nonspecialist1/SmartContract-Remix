const Web3 = require('web3');
const ENDPOINT = 'http://localhost:7545';

const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT));

web3.eth.net.getId()
    .then(id => console.log("Network ID: ", id));

web3.eth.net.getPeerCount()
    .then(peerCount => console.log("No. of Peers:", peerCount));

web3.eth.getBlockNumber()
    .then(blockNo => console.log("Latest Block Number:", blockNo));
    