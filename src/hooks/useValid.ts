import { isHexString, recoverAddress } from "ethers";
import { sha256AsU8a } from "@zcloak/crypto";
import { SignatureResultObject } from "@/types";
import { sha256OfString } from "@/utils";

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
    try {
      if (signatureObject && signatureObject.message) {
        const messageSHA256 = sha256OfString(signatureObject.message);

        let messageHash = sha256AsU8a(messageSHA256);

        const recoveredAddress = recoverAddress(
          messageHash,
          signatureObject.signature
        );

        console.log(
          "recoveredAddress=",
          recoveredAddress,
          "by ",
          signatureObject.signer
        );

        result =
          recoveredAddress.toLowerCase() ===
          signatureObject.signer.toLowerCase();
      }
    } catch (err) {
      console.warn("signatureObject=", signatureObject);
      alert((err as Error)?.message || "valid error");
    }

    return {
      result,
      signatureObject,
    };
  };

  return { checkSignatureResult, valid };
}
