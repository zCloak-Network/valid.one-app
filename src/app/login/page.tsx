import { default as useStore, observer } from "@/store";
import { useCallback } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { useNavigate } from "react-router-dom";
import LoginBg from "@/assets/images/loginBg.png";
import OnBoarding from "@/assets/svg/onboarding.svg";
import { actor } from "@/utils/canister";
import { useSearchParam, useToggle } from "react-use";
import { ResponseLayout } from "../layout";
import LoadingButton from "@/components/LoadingButton";
import LoginWithPasskey from "./LoginWithPasskey";
import { useToast } from "@/components";

export default observer(function HomePage() {
  const store = useStore();
  const navigate = useNavigate();
  const [loading, toggle] = useToggle(false);
  const searchParams = useSearchParam("redirect") || "/id";
  const toast = useToast();

  const handleRegister = useCallback(async () => {
    toggle();
    try {
      const response = await actor.start_register_new();
      const options = JSON.parse(response).publicKey;
      const registrationResult = await startRegistration(options);
      const finish_register_result = await actor.finish_register_new(
        JSON.stringify(registrationResult)
      );

      store.User.login(finish_register_result);
      toggle();
      navigate(searchParams);
    } catch (error) {
      toggle();
      console.warn(`startRegistration`, error);
      toast &&
        toast({
          message: "Something went wrong, please try again later. code:0001",
          type: "error",
        });
      return;
    }
  }, [store, navigate, toggle]);

  return (
    <ResponseLayout>
      <div
        className="relative mx-auto h-full w-full bg-white"
        style={{
          backgroundImage: `url(${OnBoarding})`,
          backgroundPosition: "center top 10%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "inherit",
        }}
      >
        <div
          className="absolute bottom-0 flex h-[440px] sm:h-[65%] w-full  flex-col items-center justify-between px-6 py-10 bg-contain sm:bg-cover"
          style={{
            backgroundImage: `url(${LoginBg})`,
            backgroundRepeat: "no-repeat",
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

          <LoadingButton
            className={`btn w-full ${loading ? "bg-white" : ""}`}
            onClick={handleRegister}
            loading={loading}
          >
            Create an account
          </LoadingButton>
          <LoginWithPasskey />

          <div className="text-center font-['Poppins'] text-sm font-normal text-zinc-500">
            it takes as little as 10s
          </div>
        </div>
      </div>
    </ResponseLayout>
  );
});
