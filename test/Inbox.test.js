// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //it starts with a capital W since we are going to use a constructor and make instances of it
//web3 is an instance of Web3 class
const web3 = new Web3(ganache.provider());

beforeEach(() => {
    web3.eth.getAccounts().then(
        fetchedAccounts => {
            console.log(fetchedAccounts);
        }
    )
})

describe('Inbox', () => {
    it('deploys a contract', () => {})
});

