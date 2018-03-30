import nicknameGenerator from './generators/nickname';
import avatarGenerator from './generators/avatar';

export const DEFAULT_ADDRESSES = {
  3: "0x0410af69af8d9c7a9a83d80e5b00dcb3a833acf1"
};

export const DEFAULT_GENERATORS = {
    nickname: nicknameGenerator,
    avatar: avatarGenerator
};

export const ROPSTEN_INFURA_URL = "https://ropsten.infura.io/WMJsUBMh7rbJXx3SgYIP";
export const MAINNET_INFURA_URL = "https://mainnet.infura.io/WMJsUBMh7rbJXx3SgYIP";