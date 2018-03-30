import * as IpfsApi from "ipfs-api";

export interface IpfsApiInterface {
  add(buf: Buffer, cb: Function): void;
}

export const initializeIPFS = (
  host: string = "ipfs.infura.io",
  port: number = 5001
): IpfsApiInterface => {
  return IpfsApi(host, port, { protocol: "https" });
};

export const uploadBufferToIpfs = (ipfsApi: IpfsApi, buf: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    ipfsApi.add(buf, (err, resp) => {
      if (err) return reject(err);
      resolve(resp[0].hash);
    });
  });
};
