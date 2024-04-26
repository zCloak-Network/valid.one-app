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
import { isIOS } from "react-device-detect";
import { IOS_INSTALL_MARK_KEY, BUSINESS_FORM_URL } from "@/constants";

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

  const handleInstallButton = async () => {
    navigate("/id/");
    console.log("isIOS", isIOS);
    if (isIOS) {
      const isMark = localStorage.getItem(IOS_INSTALL_MARK_KEY);
      if (!isMark) {
        const IOSInstallDialog = document.getElementById(
          "IOSInstallDialog"
        ) as HTMLDialogElement;
        IOSInstallDialog?.showModal();
        localStorage.setItem(IOS_INSTALL_MARK_KEY, "yes");
      }
    } else {
      if (!installPrompt) {
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      }
      const result = await installPrompt.prompt();
      console.log(`Install prompt was: ${result.outcome}`);
      setInstallPrompt(null);
    }
  };

  return (
    <>
      <main className="bg-[#fafbff] h-full">
        <header className="bg-[#fafbff] flex h-20 shadow-lg w-full px-4 top-0 left-0 z-10 absolute items-center">
          <img src={Logo} alt="logo" className="h-[28px] w-[28px]" />
          <img src={Alpha} alt="alpha" className="h-[24px] ml-2" />
          <div className="flex-1"></div>
          <button
            id="launchapp"
            className="bg-[#000000] btn btn-neutral"
            onClick={handleInstallButton}
          >
            Launch App
          </button>
        </header>
        <div className="h-full pt-20 overflow-auto">
          <div className="px-6">
            {/* hero */}
            <div className="rounded-3xl h-[calc(100%-20px)] mt-10 mb-16 relative overflow-hidden">
              <img src={HeroBG} className="h-full object-cover w-full block" />
              <div className="flex flex-col h-full -ml-[139px] py-10 top-0 left-[50%] w-[278px] gap-6 absolute">
                <div className="flex flex-1 items-center justify-center">
                  <img src={HeroText} className="flex-1" />
                </div>
                <button
                  className="border-none rounded bg-[#125BE4] text-white btn btn-block btn-primary btn-lg"
                  onClick={() => navigate("/login")}
                >
                  Register your Valid ID
                  <GoArrowRight />
                </button>
                <a
                  className="rounded bg-[#1B172B] text-white btn btn-block btn-neutral btn-lg"
                  href={BUSINESS_FORM_URL}
                  target="_blank"
                >
                  For business access
                  <GoArrowRight />
                </a>
              </div>
            </div>
            {/* solution */}
            <div className="flex flex-col my-16 gap-6">
              <img src={solutionPic} className="w-full block" />
              <div className=" font-medium text-lg text-blue-700 leading-7">
                Introducing the Valid One Protocol
              </div>
              <div className=" font-bold text-neutral-800 text-[32px] 'Menlo'] leading-9">
                An easy-onboard, secure identity management solution
              </div>
              <div className=" font-medium text-lg text-zinc-500 'Manrope'] leading-7">
                Valid One merges speed, trust, flexibility, and privacy, making
                it a com prehensive solution for secure and efficient digital
                identity management in today's interconnected and rapidly
                evolving digital landscape.
              </div>
            </div>
            {/* use */}
            <div className="flex flex-col my-16 gap-6">
              <img src={usePic} className="w-full block" />

              <div className=" font-bold text-neutral-800 text-[32px] 'Menlo'] leading-9">
                Use Valid One to...
              </div>
              <div className=" border border-slate-900 h-[0px] opacity-10"></div>
              <ul className="flex flex-col text-[#787F84] gap-6">
                <li className="pl-10 relative">
                  <HiCheckBadge className="h-6 text-black top-0 left-0 w-6 absolute" />
                  Prevent online impersonation scam
                </li>
                <li className="pl-10 relative">
                  <HiCheckBadge className="h-6 text-black top-0 left-0 w-6 absolute" />
                  Prevent official impersonation fraud
                </li>
              </ul>
            </div>
            {/* box */}
            <div className="bg-white flex flex-col rounded-2xl my-16 py-12 px-6 gap-12">
              <img src={Box1Pic} className="w-full block" />
              <img src={Box2Pic} className="w-full block" />
              <img src={Box3Pic} className="w-full block" />
            </div>
          </div>
          {/* footer */}
          <footer className="bg-[#f6f8ff] border-t-[1px] border-[#e4e5e8] py-10 px-6">
            <img src={TextLogo} className="h-[30px]" />
            <div className="my-4 text-lg opacity-80 text-blue-700">
              Register here
            </div>
            <img src={FooterQR} className="mb-8" />
            <div className=" my-4 text-lg opacity-80 text-blue-700">
              Contact us
            </div>
            <div className="flex gap-4 items-center">
              <a
                href="mailto:info@zcloak.network"
                className="rounded-full flex bg-slate-300 h-10 p-2 w-10 justify-center items-center"
              >
                <MdEmail className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/valid3_id"
                className="rounded-full flex bg-slate-300 h-10 p-1 w-10 justify-center items-center"
              >
                <FaXTwitter className="h-6 w-6" />
              </a>

              <a
                href="https://discord.com/invite/wcKt6MDRJz"
                className="rounded-full flex bg-slate-300 h-10 p-1 w-10 justify-center items-center"
              >
                <FaDiscord className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/zCloak-Network"
                className="rounded-full flex bg-slate-300 h-10 p-1 w-10 justify-center items-center"
              >
                <VscGithub className="h-6 w-6" />
              </a>
              <a
                href="https://hk.linkedin.com/company/zcloak-network"
                className="rounded-full flex bg-slate-300 h-10 p-1 w-10 justify-center items-center"
              >
                <RiLinkedinBoxFill className="h-6 w-6" />
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
});
