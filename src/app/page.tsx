"use client";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "@/assets/landing-page/logo.png";
import Alpha from "@/assets/landing-page/alpha.png";
import HeroBG from "@/assets/landing-page/home_bg_privacy.jpg";
import HeroText from "@/assets/landing-page/hero-text.png";
import solutionPic from "@/assets/landing-page/solution.jpg";
import usePic from "@/assets/landing-page/use.jpg";
import Box1Pic from "@/assets/landing-page/box1.png";
import Box2Pic from "@/assets/landing-page/box2.png";
import Box3Pic from "@/assets/landing-page/box3.png";
import { HiCheckBadge } from "react-icons/hi2";
import { GoArrowRight } from "react-icons/go";
import TextLogo from "@/assets/landing-page/logo-text.png";
import FooterQR from "@/assets/landing-page/qr.png";
import { MdEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { RiLinkedinBoxFill } from "react-icons/ri";

export default (function HomePage() {
  const navigate = useNavigate();
  // TODO install pwa
  // main.js
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    });
  }, []);

  // main.js

  const handleInstallButton = async () => {
    console.log(1111);
    navigate("/id/");
    if (!installPrompt) {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    setInstallPrompt(null);
  };

  return (
    <main className="h-full bg-[#fafbff]">
      <header className="absolute left-0 w-full top-0 h-20 flex items-center px-4 bg-[#fafbff] z-10 shadow-lg">
        <img src={Logo} alt="logo" className="h-[28px] w-[28px]" />
        <img src={Alpha} alt="alpha" className="h-[24px] ml-2" />
        <div className="flex-1"></div>
        <button
          id="launchapp"
          className="btn btn-neutral bg-[#000000]"
          onClick={handleInstallButton}
        >
          Launch App
        </button>
      </header>
      <div className="h-full overflow-auto pt-20">
        <div className="px-6">
          {/* hero */}
          <div className="relative h-[calc(100%-20px)] rounded-3xl overflow-hidden mt-10 mb-16">
            <img src={HeroBG} className="block w-full h-full object-cover" />
            <div className="absolute left-[50%] top-0 w-[278px] -ml-[139px] h-full flex flex-col py-10 gap-6">
              <div className="flex-1 flex items-center justify-center">
                <img src={HeroText} className="flex-1" />
              </div>
              <button
                className="btn btn-block btn-primary bg-[#125BE4] text-white btn-lg rounded border-none"
                onClick={() => navigate("/login")}
              >
                Register your Valid ID
                <GoArrowRight />
              </button>
              <a
                className="btn btn-block btn-neutral bg-[#1B172B] text-white btn-lg rounded"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfSeKY4E40LMJ0K9bx4K0XzQ1MA4U6CoD1cRWTRHL0L_aDwWQ/viewform?usp=pp_url"
                target="_blank"
              >
                For business access
                <GoArrowRight />
              </a>
            </div>
          </div>
          {/* solution */}
          <div className="flex flex-col gap-6 my-16">
            <img src={solutionPic} className="w-full block" />
            <div className=" text-blue-700 text-lg font-medium leading-7">
              Introducing the Valid One Protocol
            </div>
            <div className=" text-neutral-800 text-[32px] font-bold font-['Menlo'] leading-9">
              An easy-onboard, secure identity management solution
            </div>
            <div className=" text-zinc-500 text-lg font-medium font-['Manrope'] leading-7">
              Valid One merges speed, trust, flexibility, and privacy, making it
              a com prehensive solution for secure and efficient digital
              identity management in today's interconnected and rapidly evolving
              digital landscape.
            </div>
          </div>
          {/* use */}
          <div className="flex flex-col gap-6 my-16">
            <img src={usePic} className="w-full block" />

            <div className=" text-neutral-800 text-[32px] font-bold font-['Menlo'] leading-9">
              Use Valid One to...
            </div>
            <div className=" h-[0px] opacity-10 border border-slate-900"></div>
            <ul className="text-[#787F84] flex flex-col gap-6">
              <li className="relative pl-10">
                <HiCheckBadge className="absolute left-0 top-0 w-6 h-6 text-black" />
                Prevent online impersonation scam
              </li>
              <li className="relative pl-10">
                <HiCheckBadge className="absolute left-0 top-0 w-6 h-6 text-black" />
                Prevent official impersonation fraud
              </li>
            </ul>
          </div>
          {/* box */}
          <div className="px-6 py-12 rounded-2xl bg-white my-16 flex flex-col gap-12">
            <img src={Box1Pic} className="w-full block" />
            <img src={Box2Pic} className="w-full block" />
            <img src={Box3Pic} className="w-full block" />
          </div>
        </div>
        {/* footer */}
        <footer className="bg-[#f6f8ff] border-t-[1px] border-[#e4e5e8] px-6 py-10">
          <img src={TextLogo} className="h-[30px]" />
          <div className="opacity-80 text-blue-700 text-lg my-4">
            Register here
          </div>
          <img src={FooterQR} className="mb-8" />
          <div className=" opacity-80 text-blue-700 text-lg my-4">
            Contact us
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:info@zcloak.network"
              className="w-10 h-10 p-2 bg-slate-300 rounded-full justify-center items-center flex"
            >
              <MdEmail className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/valid3_id"
              className="w-10 h-10 p-1 bg-slate-300 rounded-full justify-center items-center flex"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>

            <a
              href="https://discord.com/invite/wcKt6MDRJz"
              className="w-10 h-10 p-1 bg-slate-300 rounded-full justify-center items-center flex"
            >
              <FaDiscord className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/zCloak-Network"
              className="w-10 h-10 p-1 bg-slate-300 rounded-full justify-center items-center flex"
            >
              <VscGithub className="w-6 h-6" />
            </a>
            <a
              href="https://hk.linkedin.com/company/zcloak-network"
              className="w-10 h-10 p-1 bg-slate-300 rounded-full justify-center items-center flex"
            >
              <RiLinkedinBoxFill className="w-6 h-6" />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
});
