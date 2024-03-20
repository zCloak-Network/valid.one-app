import { default as useStore, observer } from "@/store";
import { useCallback } from "react";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";
import LoginBg from "@/assets/svg/LoginBg.svg";
import OnBoarding from "@/assets/svg/onboarding.svg";
import { actor } from "@/utils/canister";
import { useSearchParam } from "react-use";
import { ResponseLayout } from "../layout";

export default observer(function HomePage() {
  const store = useStore();

  const navigate = useNavigate();

  const searchParams = useSearchParam("redirect") || "/";

  const handleRegister = useCallback(async () => {
    let response = await actor.start_register_new();
    const options = JSON.parse(response).publicKey;
    console.log(`【generate register options】: ${JSON.stringify(options)}`);

    let registrationResult;
    try {
      registrationResult = await startRegistration(options);
      console.log(
        `navigator.credentials.create(): ${JSON.stringify(registrationResult)}`
      );
    } catch (error) {
      console.log(`startRegistration`, error);
      return;
    }

    const finish_register_result = await actor.finish_register_new(
      JSON.stringify(registrationResult)
    );
    console.log(
      `finish_register_result: `,
      JSON.stringify(finish_register_result)
    );

    store.User.setUser(finish_register_result);

    navigate(searchParams);
  }, [store, navigate]);

  const handlePasskeyLogin = useCallback(async () => {
    if (!store.User.id) {
      console.log(`User not logged in`);
      return;
    }
    let response = await actor.start_authentication_new(store.User.id);
    // const authOptions = { "challenge": "anI1j2hCiQtDjaek_MagaVxoDlzc2XOz83bV2Dv0vpY", "timeout": 60000, "rpId": "localhost", "allowCredentials": [{ "type": "public-key", "id": "xd8a9XI21xwQFTmDGqtpN510rZpN2-in5mwGE4AxBdQ" }], "userVerification": "preferred" };
    const authOptions = JSON.parse(response).publicKey;
    console.log(`【generate auth options】: ${JSON.stringify(authOptions)}`);

    // step 2
    let asseResp;
    try {
      asseResp = await startAuthentication({
        ...authOptions,
      });
      console.log(
        `【startAuthentication】navigator.credentials.get(): ${JSON.stringify(
          asseResp
        )}`
      );
    } catch (error) {
      console.log(`start authencation error: `, error);
      return;
    }

    // step 3
    let auth_result = await actor.finish_authentication_new(
      JSON.stringify(asseResp)
    );
    console.log(`auth_result ${auth_result}`);
  }, []);

  return (
    <ResponseLayout>
      <div
        className="relative mx-auto h-full w-full bg-white min-h-[780px]"
        style={{
          backgroundImage: `url(${OnBoarding})`,
          backgroundPosition: "center top 10%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "inherit",
        }}
      >
        <div
          className="absolute bottom-0 flex h-[55%] w-full  flex-col items-center justify-between px-6 py-10"
          style={{
            backgroundImage: `url(${LoginBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="">
            <div className="text-center font-['Poppins'] text-2xl font-semibold text-white">
              Defending trust and privacy in the age of AGI.
            </div>
          </div>
          <div className="h-24 w-72 text-center font-['Poppins'] text-sm font-medium text-neutral-400">
            Valid ID weaves together your online identity, serving as your
            passport to the digital universe. Share who you are with others, and
            connect with trusted friends to create a network of trust.
          </div>

          <button className="btn w-full" onClick={handleRegister}>
            Create an account
          </button>
          <button
            className="btn btn-primary w-full"
            onClick={handlePasskeyLogin}
          >
            Sign up or Log in using Passkey
          </button>

          <div className="text-center font-['Poppins'] text-sm font-normal text-zinc-500">
            it takes as little as 10s
          </div>
        </div>
      </div>
    </ResponseLayout>
  );
});
