import { Buffer } from "buffer";
import * as blobToBuffer from 'blob-to-buffer';

export const ipfsURL = (hash) => {
  return `https://ipfs.io/ipfs/${hash}`;
}

export const toBuffer = (content: string | Blob | File | Buffer): any => {
  return new Promise((resolve, reject) => {
    switch (content.constructor) {
      case Buffer:
        resolve(content);
        break;
      case String:
        resolve(new Buffer(content as string));
        break;
      case File:
      case Blob:
        blobToBuffer(content, (err, buf) => {
          if (err) return reject(err);
          resolve(buf);
        });
        break;
      default:
        try {
          resolve(new Buffer(JSON.stringify(content)));
        } catch(e) {
          return reject(new Error("Datatype not supported"));
        }
    }
  });
};
