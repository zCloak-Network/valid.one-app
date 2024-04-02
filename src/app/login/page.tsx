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
import LoginWithValidID from "./LoginWithValidID";
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
        className="bg-white h-full mx-auto w-full relative"
        style={{
          backgroundImage: `url(${OnBoarding})`,
          backgroundPosition: "center top 10%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "inherit",
        }}
      >
        <div
          className="bg-contain flex flex-col h-[440px] w-full py-10  px-6 bottom-0 absolute items-center justify-between sm:bg-cover sm:h-[65%]"
          style={{
            backgroundImage: `url(${LoginBg})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="">
            <div className="text-center 'Poppins'] text-2xl font-semibold text-white">
              Defending trust and privacy in the age of AGI.
            </div>
          </div>
          <div className="h-24 text-center w-72 'Poppins'] text-sm font-medium text-neutral-400">
            Valid ID weaves together your online identity, serving as your
            passport to the digital universe. Share who you are with others, and
            connect with trusted friends to create a network of trust.
          </div>

          <LoadingButton
            className={`btn btn-primary w-full ${loading ? "bg-white" : ""}`}
            onClick={handleRegister}
            loading={loading}
          >
            Create an account
          </LoadingButton>
          <LoginWithValidID />

          <div className="text-center 'Poppins'] text-sm font-normal text-zinc-500">
            it takes as little as 10s
          </div>
        </div>
      </div>
    </ResponseLayout>
  );
});
