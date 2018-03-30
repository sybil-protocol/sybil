import { expect } from 'chai';
import 'mocha';
import Sybil from '../src/index';
import * as fs from 'fs';
import * as solc from 'solc';
import generateNickname from '../src/generators/nickname';

const Web3 = require('web3');

export interface Global {
  window: any;
};

declare var global: Global;

describe('local Sybil test', () => {
    let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    const account = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";

    let contractAddress: string;

    before(async () => {
        const source = fs.readFileSync("./contracts/Sybil.sol");
        const output = solc.compile(source.toString(), 1);
        const bytecode = output.contracts[":Sybil"].bytecode;
        const abi = JSON.parse(output.contracts[":Sybil"].interface);
        const contract = new web3.eth.Contract(abi);
        const res = await contract
          .deploy({ data: bytecode })
          .send({ from: account, gas: 1500000 });
        contractAddress = res.options.address;
    });

    it("should use the injected web3 if provided none", async () => {
        global.window = {web3};
        const S = new Sybil({ contractAddress });
        await S.of(account).get("nickname");
        const v = await S.of(account).nickname();
        expect(v).to.be.equal(generateNickname(account));
    });
    
    it('should return a default nickname', async () => {
        const S = new Sybil(web3, { contractAddress });
        await S.of(account).get("nickname");
        const v = await S.of(account).nickname();
        expect(v).to.be.equal(generateNickname(account));
        expect(S.isReadOnly()).to.be.equal(false);
    });

    it('should set the nickname', async () => {
        const S = new Sybil(web3, {contractAddress});
        await S.of(account).set("nickname", "sybilus");
        const v = await S.of(account).nickname();
        expect(v).to.be.equal('sybilus');
    });

    it('should upload an avatar from buffer', async () => {
        const content = fs.readFileSync('./resources/avatar.jpg');
        const S = new Sybil(web3, { contractAddress });
        await S.of(account).setWithIPFS("avatar", content);
        const url = await S.of(account).avatar();
        expect(url).to.be.equal("https://ipfs.io/ipfs/QmayQXw5dy2Y6yt5SekcDN15tsBbaey651cwPaqoH5fBfF");
    });

    it("should upload an avatar from string", async () => {
      const content = fs.readFileSync("./resources/avatar.jpg").toString();
      const S = new Sybil(web3, { contractAddress });
      await S.of(account).setWithIPFS("avatar", content);
      const url = await S.of(account).avatar();
      expect(url).to.be.equal("https://ipfs.io/ipfs/QmZR8PCBguJfvUMoePaZDY9KaATYivtPxD9cSmLzvNuDcM");
    });
});