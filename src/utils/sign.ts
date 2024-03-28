import { sha256AsU8a } from "@zcloak/crypto";
import { u8aToHex } from "@polkadot/util";

export const sha256OfFile: (file: File) => Promise<string> = (file: File) => {
  return new Promise((resolve, reject) => {
    let result = "";
    if (!file) {
      resolve(result);
    } else {
      try {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function () {
          const wordArray = new Uint8Array(reader.result as ArrayBuffer);
          const hash = sha256AsU8a(wordArray);
          result = u8aToHex(hash);
          resolve(result);
        };
      } catch (e: any) {
        reject(e);
      }
    }
  });
};

export const sha256OfString: (str: string) => string = (str: string) => {
  const wordArray = new TextEncoder().encode(str);
  const hash = sha256AsU8a(wordArray);
  return u8aToHex(hash);
};
