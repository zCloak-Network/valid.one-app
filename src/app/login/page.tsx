import { useState } from "react";
import LoginBg from "@/assets/images/loginBg.png";
import OnBoarding from "@/assets/images/login_bg.png";
import { ResponseLayout } from "../layout";
import LoginWithName from "./LoginWithName";
import { useNavigate } from "react-router-dom";
import { getQueryParams } from "@/utils";

export default (function HomePage() {
  const [showModal, toggleModal] = useState<0 | 1 | 2>(0);
  const navigate = useNavigate();
  const searchParams = getQueryParams("redirect");
  console.log("searchParams=", searchParams);

  return (
    <ResponseLayout>
      <div
        className="bg-white h-full mx-auto w-full relative"
        style={{
          backgroundImage: `url(${OnBoarding})`,
          backgroundPosition: "center top 10%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "70% auto",
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

          {showModal === 0 && (
            <>
              <button
                className={`btn w-full `}
                onClick={() =>
                  navigate(
                    {
                      pathname: "/register",
                      search: `${
                        searchParams
                          ? `?redirect=${encodeURIComponent(searchParams)}`
                          : ""
                      }`,
                    },
                    {
                      replace: true,
                    }
                  )
                }
              >
                Create an account
              </button>

              <button
                className={`btn btn-primary w-full `}
                onClick={() => toggleModal(2)}
              >
                Login with username
              </button>

              <div className="text-center 'Poppins'] text-sm font-normal text-zinc-500">
                it takes as little as 10s
              </div>
            </>
          )}

          {showModal === 2 && (
            <LoginWithName
              redirectPath={searchParams || "/id"}
              onCancel={() => toggleModal(0)}
            />
          )}
        </div>
      </div>
    </ResponseLayout>
  );
});
