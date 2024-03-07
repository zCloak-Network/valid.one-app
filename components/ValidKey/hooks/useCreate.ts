import { useState, useRef } from "react";

import {
  getGenerateOptions,
  verifyRegistration,
  getAuthOptions,
} from "../action/passkey";
import { osName, browserName } from "react-device-detect";
import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";

type DidAccount = {};
export function useCreate() {
  // common var
  const onCreated = useRef<(did: DidAccount) => void>();
  const [loading, setLoading] = useState(false);

  // var for passkey
  const createPasskey = async (passkeyTitle: string, password: string) => {
    try {
      const { data: RegOption } = await getGenerateOptions({
        address: passkeyTitle,
        desc: `${osName} - ${browserName}`,
      });
      console.log("createPasskey RegOption", RegOption);

      if (RegOption && RegOption.challenge) {
        const attResp = await startRegistration(RegOption);
        console.log(attResp);
        const verificationRes = await verifyRegistration({
          address: passkeyTitle,
          verifyBody: attResp,

          expectedChallenge: RegOption.challenge,
        });
        if (verificationRes.code === 200) {
          const { data: authOption } = await getAuthOptions({
            address: passkeyTitle,
          });
          const utf8Encoder = new TextEncoder();
          const blobWriteValue = {
            password: password,
          };
          const bytes = utf8Encoder.encode(JSON.stringify(blobWriteValue));
          const extensions = {
            largeBlob: {
              write: new Uint8Array(bytes),
            },
          };

          const writeResp = await startAuthentication({
            ...authOption,
            extensions,
          });

          console.log(
            `navigator.credentials.get() largeBlob write result: `,
            writeResp,
          );
          return true;
        }
      } else {
        throw new Error("getGenerateOptions error");
      }
    } catch (error) {
      console.warn((error as Error).message);
      return false;
    }
  };

  const loginWithPasskey = async (callback?: (did: DidAccount) => void) => {
    if (loading) return null;

    typeof callback === "function" && (onCreated.current = callback);

    setLoading(true);

    console.log("loginWithPasskey", osName);
    try {
      const { data: authOption } = await getAuthOptions({});
      const extensions = {
        largeBlob: {
          read: true,
        },
      };

      const readResp = (await startAuthentication({
        ...authOption,
        extensions,
      })) as any;

      console.log(
        `navigator.credentials.get() largeBlob read result:`,
        readResp,
      );

      const blobText = new TextDecoder().decode(
        readResp.clientExtensionResults.largeBlob.blob,
      );
      console.log(`blobText: ${blobText}`);
      const blobData = JSON.parse(blobText) as {
        mainIndex: string;
        password: string;
      };
      // TODO get keyfile
      const account = {};

      onCreated.current?.(account);
    } catch (error) {}
  };

  return {
    createPasskey,
    loginWithPasskey,
    loading,
  };
}
