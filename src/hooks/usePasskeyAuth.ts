import { useCallback } from "react";
import { useStore } from ".";
import { actor } from "@/utils/canister";
import { startAuthentication } from "@simplewebauthn/browser";

export function usePasskeyAuth() {
  const { User } = useStore();

  const auth = useCallback(async () => {
    if (!User.id) {
      throw new Error("User not found");
    }

    let response = await actor.start_authentication_new(User.id);

    const authOptions = JSON.parse(response).publicKey;

    const asseResp = await startAuthentication({
      ...authOptions,
    });

    let authResult = await actor.finish_authentication_new(JSON.stringify(asseResp));

    return JSON.stringify(authResult);
  }, [User]);

  return { auth };
}
