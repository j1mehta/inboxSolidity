// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    //Don't bother, you'll only find some Rinkeby eth (if you're lucky)
    'disease possible symptom review save hen phone medal regret canvas rent often',
    'https://rinkeby.infura.io/v3/99b376076bc14a61abfd545036cc37c1'
);

//We've unlocked our metamask account with some Rinkeby on it
//and this web3 instance is completely enabled for the Rinkeby network
//We've unllocked an account, so we have a source of ether + we've specified
//what network this web3 instance needs to connect to. We can use it to send ether,
//deploy or update contracts or whatever we want
const web3 = new Web3(provider);


const deploy = async() => {
    const accounts  = await web3.eth.getAccounts();
    console.log('Deploying from account: ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['General Kenobi']})
        .send({gas:'1000000', from:accounts[0]});

    console.log('Contract deployed to', result.options.address);
    //To prevent a hanging deployment
    provider.engine.stop();
}

deploy();