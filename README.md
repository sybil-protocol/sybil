# [Sybil - Open Decentralized Identity Protocol](https://sybil.me)

### Introduction

Sybil lets you attach a basic social identity, consisting of a nickname and an avatar, to your Ethereum address that can be used easily used by any other dapp. The obvious candidates are social dapps (decentralized messaging, messageboards, microblogging, etc.), but many dapps in other domains would also benefit from the presence of nicknames and avatars to humanize their user's experience.

__⚠️ Warning__: The Sybil protocol and library are alpha software, running on testnet. Features may, and will, change.

### Principles

* **Simple code**

The smart contract powering Sybil is less than 100 lines of code. Simple contracts are more secure and easily auditable.

* **Simple integration**

Adding nicknames and pictures to the users of your dapp using the Sybil protocol can be done in a few minutes. We also provide various example dapps that use Sybil.

* **No unique nicknames**

You should be called by any name you wish to be called. That's why your Sybil nickname is not unique, meaning that any number of people can share the same nickname. After all, you already have a unique id that other people and services can use to verify you — your Ethereum address!

### Installation

Install the sybil library through NPM:

```
npm install sybil --save
```

### Usage

```javascript
import Sybil from 'sybil';

// initialize Sybil using window.web3 
const S = new Sybil();

// initialize Sybil using your own web3 object
const S = new Sybil(web3);

// initialize Sybil using a different contract address
const S = new Sybil(web3, {contractAddress: '0x1234567890abcdef1234567890abcdef12345678'});
```

To get information about an address:

```javascript
// get the nickname associated with an address
await S.of('0x02f807d30DcA3bAb5C5b010F5D9a05e4876dcaB8').get('nickname');

// get the avatar URL associated with an address
await S.of('0x02f807d30DcA3bAb5C5b010F5D9a05e4876dcaB8').get('avatar');
```

To set information about an address:

```javascript
// get the nickname associated with an address
await S.of('0x02f807d30DcA3bAb5C5b010F5D9a05e4876dcaB8').set('nickname', 'anastasis');

// get the avatar URL associated with an address
await S.of('0x02f807d30DcA3bAb5C5b010F5D9a05e4876dcaB8').setWithIPFS('avatar', myImageBlob);
```

### License

MIT
