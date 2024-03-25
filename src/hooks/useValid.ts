import { verifyMessage, isHexString } from "ethers";
import { SignatureResultObject } from "@/types";
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
    const signatureObject = checkSignatureResult(signatureResult);

    return {
      result: signatureObject
        ? String(signatureObject.signer) ===
          verifyMessage(signatureObject?.message, signatureObject.signature)
        : false,
      signatureObject,
    };
  };

  return { checkSignatureResult, valid };
}
