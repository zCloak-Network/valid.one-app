import { verifyMessage, isHexString } from "ethers";
import { SignatureResult } from "@/types";
import useStore from "@/store";
export function useValid() {
  const { User } = useStore();

  const checkSignatureResult = (signatureResult: string) => {
    const data = signatureResult.split("===");

    let message, didSig;

    if (data.length === 3) {
      message = data[0].trim();

      didSig = data[2].trim().split(",");
    } else {
      throw new Error("Not a Valid Sign content.");
    }

    const signer = didSig[0].replace("signer:", "");
    const sig = didSig[1].replace("sig:", "").trim();

    if (!isHexString(signer) || !isHexString(sig)) {
      throw new Error("Not a Valid Sign content.");
    }

    return {
      signature: sig,
      signer,
      message,
    } as SignatureResult;
  };

  const valid = (signatureResult: string) => {
    const signatureObject = checkSignatureResult(signatureResult);
    console.log(
      verifyMessage(signatureObject?.message, signatureObject.signature)
    );
    console.log(signatureObject.signer);
    console.log(User.profile);
    return signatureObject
      ? signatureObject.signer ===
          verifyMessage(signatureObject?.message, signatureObject.signature)
      : false;
  };

  return { checkSignatureResult, valid };
}
