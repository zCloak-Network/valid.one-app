import { useCallback } from "react";
import { useStore } from ".";
import { actor } from "@/utils/canister";
import { startAuthentication } from "@simplewebauthn/browser";
import { useToast } from "@/components";

export function usePasskeyAuth() {
  const toast = useToast();
  const { User } = useStore();

  const auth = useCallback(async () => {
    if (!User.name) {
      throw new Error("User not found");
    }

    let response = await actor.start_authentication_name(User.name);
    console.log("[response]", response);
    const authOptions = JSON.parse(response).publicKey;

    return startAuthentication({
      ...authOptions,
    })
      .then((asseResp) => {
        console.log("usePasskeyAuth [asseResp]", asseResp);
        return [JSON.stringify(asseResp), authOptions.challenge];
      })
      .catch((error) => {
        toast &&
          toast({
            message: "Something went wrong, please try again later. code:0002",
            type: "error",
          });
        return error;
      });
  }, [User]);

  return { auth };
}
