import { isHexString, recoverAddress } from "ethers";
import { sha256AsU8a } from "@zcloak/crypto";
import { SignatureResultObject } from "@/types";
import { sha256OfString } from "@/utils";

export function useValid() {
  const checkSignatureResult = (signatureResult: string) => {
    const data = signatureResult.match(
      /^([\S\n]*)---\nPowered by Valid One\nSigner:(\w+)\nSignature:(0x\w{130})/
    );

    if (data?.length !== 4) {
      alert("Not a Valid Sign content[1].");
      return null;
    }
    const [original_content, message, signer, signature] = data;

    if (!isHexString(signer) || !isHexString(signature)) {
      alert("Not a Valid Sign content[2].");
      return null;
    }

    return {
      original_content,
      signature: signature.trim(),
      signer,
      message: message.trim(),
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
          signatureObject
        );

        result =
          recoveredAddress.toLowerCase() ===
          signatureObject.signer.toLowerCase();
      } else {
        alert("Not a Valid Sign content[3].");
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
