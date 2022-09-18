const Web3 = require('web3');
const ENDPOINT = 'http://localhost:7545';

const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT));

const abi = [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "source",
                "type": "string"
            }
        ],
        "name": "stringToBytes32",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "result",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    }
];

// 스마트 컨트랙트 값 변경 없는 함수 호출
const call = () => {
    const CONTRACT_ADDRESS = '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B';
    const SENDER_ADDRESS = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
    const TEST_CONTRACT = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    TEST_CONTRACT.methods.retrieve().call({ from: SENDER_ADDRESS }).then(console.log);
};

// 스마트 컨트렉트 값 변화 함수 호출
const send = (value) => {
    const CONTRACT_ADDRESS = '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B';
    const SENDER_ADDRESS = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
    const TEST_CONTRACT = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

    TEST_CONTRACT.methods.store(value).send({ from: SENDER_ADDRESS }).then(console.log);
};


// 코드로 스마트 컨트랙트 배포하기
const byteCode = '608060405234801561001057600080fd5b50610387806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632e64cec1146100465780636057361d14610064578063cfb5192814610080575b600080fd5b61004e6100b0565b60405161005b9190610221565b60405180910390f35b61007e600480360381019061007991906101bb565b6100b9565b005b61009a60048036038101906100959190610172565b6100c3565b6040516100a79190610206565b60405180910390f35b60008054905090565b8060008190555050565b6000808290506000815114156100df576000801b9150506100e8565b60208301519150505b919050565b60006101006100fb84610261565b61023c565b90508281526020810184848401111561011c5761011b61031a565b5b6101278482856102a6565b509392505050565b600082601f83011261014457610143610315565b5b81356101548482602086016100ed565b91505092915050565b60008135905061016c8161033a565b92915050565b60006020828403121561018857610187610324565b5b600082013567ffffffffffffffff8111156101a6576101a561031f565b5b6101b28482850161012f565b91505092915050565b6000602082840312156101d1576101d0610324565b5b60006101df8482850161015d565b91505092915050565b6101f181610292565b82525050565b6102008161029c565b82525050565b600060208201905061021b60008301846101e8565b92915050565b600060208201905061023660008301846101f7565b92915050565b6000610246610257565b905061025282826102b5565b919050565b6000604051905090565b600067ffffffffffffffff82111561027c5761027b6102e6565b5b61028582610329565b9050602081019050919050565b6000819050919050565b6000819050919050565b82818337600083830152505050565b6102be82610329565b810181811067ffffffffffffffff821117156102dd576102dc6102e6565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6103438161029c565b811461034e57600080fd5b5056fea2646970667358221220e0dfe5cdf4716fa92b468c24169b6a26fab31647cec5fbe66c1af12940ea4a4a64736f6c63430008070033';

const deployContract = () => {
    const contract = new web3.eth.Contract(abi);
    contract.deploy({
        data: byteCode
    }).send({
        from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
        gasLimit: 3000000
    }, function (err, transactionHash) {
        console.log(err) 
    }).on('err', err => {
        console.log(err)
    }).on('transactionHash', transactionHash => {
        console.log(transactionHash)
    }).on('receipt', receipt => {
        console.log(receipt)
    }).on('confirmation', confirmation => {
        console.log(confirmation)
    }).then(newContractInstance => {
        console.log(`CA: ${newContractInstance.options.address}`)
    }).catch(e => console.log(e));
}

// deployContract();
call();
// send(200);