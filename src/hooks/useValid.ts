import { verifyMessage, isHexString } from "ethers";
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
    const signatureObject = checkSignatureResult(signatureResult);
    signatureObject &&
      console.log(
        "valid address:",
        verifyMessage(signatureObject.message, signatureObject.signature)
      );

    console.log("encode  address:", ethereumEncode(signatureObject?.signer));
    return {
      result: signatureObject
        ? ethereumEncode(signatureObject.signer) ===
          verifyMessage(signatureObject.message, signatureObject.signature)
        : false,
      signatureObject,
    };
  };

  return { checkSignatureResult, valid };
}
