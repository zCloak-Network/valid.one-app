import { default as useStore, observer } from "@/store";
import { useCallback } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";
import { actor } from "@/utils/canister";
import { useToggle } from "react-use";
import LoadingButton from "@/components/LoadingButton";

export default observer(function HomePage() {
  const store = useStore();
  const navigate = useNavigate();
  const [loading, toggle] = useToggle(false);

  const handlePasskeyLogin = useCallback(async () => {
    toggle();
    let response,
      challenge = "";
    console.log(store.User.id);
    if (store.User.id) {
      response = await actor.start_authentication_new(store.User.id);
    } else {
      response = await actor.start_authentication_new_without_id();
      challenge = JSON.parse(response).publicKey.challenge;
    }

    const authOptions = JSON.parse(response).publicKey;
    // step 2
    let asseResp;
    try {
      asseResp = await startAuthentication({
        ...authOptions,
      });
    } catch (error) {
      console.log(`start authencation error: `, error);
      toggle();
      return;
    }
    console.log(`finish_authentication_new params: `, asseResp, challenge);
    let auth_result = await actor.finish_authentication_new(
      JSON.stringify(asseResp),
      challenge ? [challenge] : []
    );

    toggle();
    auth_result === store.User.id && navigate("/id");
  }, [store]);

  return (
    <>
      <LoadingButton
        className="w-full btn btn-primary"
        onClick={handlePasskeyLogin}
        loading={loading}
      >
        Log in using passkey
      </LoadingButton>
    </>
  );
});
