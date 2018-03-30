import Web3 from "web3";
import { Contract, Tx } from "web3/types";

import { DEFAULT_GENERATORS, DEFAULT_ADDRESSES } from "./constants";
import abi from "./abi";
import { IpfsApiInterface, uploadBufferToIpfs } from "./ipfs";
import { toBuffer, ipfsURL } from "./utils";

export default class Identity {
  web3: Web3;
  address: string;
  contractAddress: string;
  ipfsApi: IpfsApiInterface;

  constructor(
      address: string, 
      web3: Web3, 
      ipfsApi: IpfsApiInterface,
      contractAddress?: string
    ) {
    this.address = address;
    this.web3 = web3;
    this.contractAddress = contractAddress;
    this.ipfsApi = ipfsApi;
  }

  async _connect(): Promise<Contract> {
    let address: string = this.contractAddress;
    if (!address) {
      const netId = await this.web3.eth.net.getId();
      if (this.contractAddress === undefined && 
          DEFAULT_ADDRESSES[netId.toString()] === undefined) {
        throw new Error("Network not supported. Use Ropsten.");
      }
      address = DEFAULT_ADDRESSES[netId];
    }
    return new this.web3.eth.Contract(abi, address);
  }

  async rawGet(property: string): Promise<string> {
    const contractInstance: Contract = await this._connect();
    return await contractInstance.methods
      .get(this.address, property)
      .call();
  }

  async get(property: string) {
    const value = await this.rawGet(property);
    if (!value && DEFAULT_GENERATORS[property] !== undefined) {
      return DEFAULT_GENERATORS[property](this.address);
    } else {
      return value;
    }
  }
  
  async getWithIPFS(property: string): Promise<string> {
    const value = await this.rawGet(property);
    if (!value && DEFAULT_GENERATORS[property] !== undefined) {
      return DEFAULT_GENERATORS[property](this.address);
    } else {
      return ipfsURL(value);
    }
  }

  async set(property: string, value: string, options: Tx = {gas: 100000}) { 
    const contractInstance: Contract = await this._connect();
    const tx = contractInstance.methods.set(property, value);
    return await tx.send({ from: this.address, ...options });
  }
  
  async setWithIPFS(property: string, content: Buffer | Blob | string) {
    const buf = await toBuffer(content);
    const hash: string = await uploadBufferToIpfs(this.ipfsApi, buf);
    return await this.set(property, hash);
  }

  nickname () { return this.get('nickname') }
  avatar () { return this.getWithIPFS('avatar') }
}
