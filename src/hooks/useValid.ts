import { isHexString, recoverAddress } from "ethers";
import { sha256AsU8a } from "@zcloak/crypto";
import { SignatureResultObject } from "@/types";
import { sha256OfString } from "@/utils";

export function useValid() {
  const checkSignatureResult = (signatureResult: string) => {
    const data = signatureResult.match(
      /^([\S\n]*)\n?————\nSigned with Valid Sign powered by Valid.One\nSigner:(\w+)\nSignature:(\w+)/
    );

    if (data?.length !== 4) {
      console.warn("Not a Valid Sign content[1].");
      return null;
    }
    const [_original, message, signer, signature] = data;

    if (!isHexString(signer) || !isHexString(signature)) {
      console.warn("Not a Valid Sign content[2].");
      return null;
    }

    return {
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
        console.warn("Not a Valid Sign content[3].", signatureObject);
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
