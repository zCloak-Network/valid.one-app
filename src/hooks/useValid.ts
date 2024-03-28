import { isHexString } from "ethers";
import { recoverAddress } from "@ethersproject/transactions";
import { sha256AsU8a } from "@zcloak/crypto";
import { SignatureResultObject } from "@/types";
import { ethereumEncode } from "@zcloak/crypto";

export function useValid() {
  const checkSignatureResult = (signatureResult: string) => {
    const data = signatureResult.split("===");

    let message, didSig;

    if (data.length === 3) {
      message = data[0].trim();

      didSig = data[2].trim().split(",");
    } else {
      console.warn("Not a Valid Sign content.");
      return null;
    }

    const signer = didSig[0].replace("signer:", "");
    const sig = didSig[1].replace("sig:", "").trim();

    if (!isHexString(signer) || !isHexString(sig)) {
      console.warn("Not a Valid Sign content.");
      return null;
    }

    return {
      signature: sig,
      signer,
      message,
    } as SignatureResultObject;
  };

  const valid = (signatureResult: string) => {
    let result = false;
    const signatureObject = checkSignatureResult(signatureResult);
    if (signatureObject) {
      const messageHash = sha256AsU8a(signatureObject.message);
      const verifyResult = recoverAddress(
        messageHash,
        signatureObject.signature
      );
      console.log(
        "verifyResult=",
        verifyResult,
        ethereumEncode(signatureObject.signer)
      );
      result = verifyResult === ethereumEncode(signatureObject.signer);
    }

    return {
      result,
      signatureObject,
    };
  };

  return { checkSignatureResult, valid };
}
