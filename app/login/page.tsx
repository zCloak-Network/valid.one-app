"use client";

import { default as useStore, observer } from "@/store";
import { useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import fetch from "isomorphic-fetch";

export const idlFactory = ({ IDL }: { IDL: any }) => {
  return IDL.Service({ greet: IDL.Func([IDL.Text], [IDL.Text], ["query"]) });
};

const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

const agent = new HttpAgent({ fetch, host: "http://127.0.0.1:4943" });

const actor = Actor.createActor(idlFactory, { agent, canisterId });

export default observer(function HomePage() {
  const [greeting, setGreeting] = useState("");

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

  return (
    <div
      className="relative mx-auto h-[750px] w-96 bg-white"
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
        <div className="h-16 w-40">
          <div className="text-center font-['Poppins'] text-2xl font-semibold text-white">
            Slogan
          </div>
        </div>
        <div className="h-24 w-72 text-center font-['Poppins'] text-sm font-medium text-neutral-400">
          Valid ID weaves together your online identity, serving as your
          passport to the digital universe. Share who you are with others, and
          connect with trusted friends to create a network of trust.
        </div>

        <button className="btn w-full">Create an account</button>
        <button className="btn btn-primary w-full">
          Sign up or Log in using Passkey
        </button>

        <div className="text-center font-['Poppins'] text-sm font-normal text-zinc-500">
          it takes as little as 10s
        </div>
      </div>
    </div>
  );
});
