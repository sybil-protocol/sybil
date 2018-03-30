const Web3 = require('web3');

import Identity from "./identity";
import { IpfsApiInterface, initializeIPFS } from "./ipfs";
import { ROPSTEN_INFURA_URL } from "./constants";

declare global {
  interface Window { web3: any; }
}

export interface SybilOptions {
  ipfsHost?: string;
  ipfsPort?: number;
  contractAddress?: string;
}

export default class Sybil {
  web3: any;
  contractAddress: string;
  ipfsApi: IpfsApiInterface;

  constructor(web3?: any, options: SybilOptions = {}) {
    if (web3 === undefined || web3.constructor !== Web3) {
      options = <SybilOptions>web3 || {};
      web3 = undefined;
    }
    this.web3 = web3;
    if (web3 === undefined) {
      if (window.web3 !== undefined) {
        this.web3 = new Web3(window.web3);
      } else {
        this.web3 = new Web3(ROPSTEN_INFURA_URL);
      }
    }
    this.contractAddress = options.contractAddress;
    this.ipfsApi = initializeIPFS(options.ipfsHost, options.ipfsPort);
  }

  isReadOnly (): boolean {
    return this.web3.eth.accounts.length === 0;
  }

  async me () {
    const accounts = await this.web3.eth.getAccounts();
    try {
      return this.of(accounts[0]);
    } catch (e) { 
      throw new Error("web3 instance has no default account");
    }
  }

  of(address: string) {
    if (address === undefined || address === null) {
      throw new Error('You need to provide an address');
    }
    return new Identity(
      address, 
      this.web3, 
      this.ipfsApi,
      this.contractAddress
    );
  }
}
