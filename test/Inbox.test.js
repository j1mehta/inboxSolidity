// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //it starts with a capital W since we are going to use a constructor and make instances of it
//web3 is an instance of Web3 class
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    //Use one of these accounts to deploy our contract
    //Contract is a constructor fn (Capital C), so we gotta create
    //an instance of it (hence `new`)
    //Since deploy/send are async fn, we need to put await to let them finish
    //inbox  is a javascript representation of our contract. javascript object
    //represent what exists on the blockchain.
    //We can call fns on it to interact directly with the fns that exist on the contract in blockchain
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['General Kenobi']})
        .send({from: accounts[0], gas:'1000000'});
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    it('has a default message', async() => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'General Kenobi');
    });
    it('can change the message', async() => {
        await inbox.methods.setMessage('Hello there!').send({from: accounts[0]})
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello there!');
    });
});

