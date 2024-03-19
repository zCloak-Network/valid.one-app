"use client";

import { default as useStore, observer } from "@/store";
import { useCallback, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import fetch from "isomorphic-fetch";
import { axiosRouter } from "@/utils/axiosRouter";
import { useNavigate } from "react-router-dom";

export const idlFactory = ({ IDL }: { IDL: any }) => {
  return IDL.Service({ greet: IDL.Func([IDL.Text], [IDL.Text], ["query"]) });
};

const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

const agent = new HttpAgent({ fetch, host: "http://127.0.0.1:4943" });

const actor = Actor.createActor(idlFactory, { agent, canisterId });

export default observer(function HomePage() {
  const [greeting, setGreeting] = useState("");
  const store = useStore();

  const navigate = useNavigate();

  async function handleSubmit(event: any) {
    event.preventDefault();

    await agent.fetchRootKey();

    console.log("actor", actor);

    const name = event.target.elements.name.value;
    console.log("name", name);

    actor.greet(name).then((greeting: any) => {
      console.log("greeting", greeting);

      setGreeting(greeting);
    });

    return false;
  }

  const handleRegister = useCallback(async () => {
    const userId = "1234567";

    await axiosRouter.post("/api/userId", { userId });

    store.User.setUser(userId);

    navigate("/");
  }, [store]);

  return (
    <div
      className="relative mx-auto h-full w-full bg-white min-h-[780px]"
      style={{
        backgroundImage: "url(../../svg/onboarding.svg)",
        backgroundPosition: "center top 10%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "inherit",
      }}
    >
      <div
        className="absolute bottom-0 flex h-[55%] w-full  flex-col items-center justify-between px-6 py-10"
        style={{
          backgroundImage: "url(../../svg/LoginBg.svg)",
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

        <button className="btn w-full">Create an account</button>
        <button className="btn btn-primary w-full" onClick={handleRegister}>
          Sign up or Log in using Passkey
        </button>

        <div className="text-center font-['Poppins'] text-sm font-normal text-zinc-500">
          it takes as little as 10s
        </div>
      </div>
    </div>
  );
});
