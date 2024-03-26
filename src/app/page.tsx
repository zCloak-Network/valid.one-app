"use client";

import { useNavigate } from "react-router-dom";

import Logo from "@/assets/landing-page/logo.png";
import HeroBG from "@/assets/landing-page/home_bg_privacy.jpg";
import HeroText from "@/assets/landing-page/hero-text.png";
import { HiCheckBadge } from "react-icons/hi2";
import { GoArrowRight } from "react-icons/go";

export default (function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="h-full">
      <header className="absolute left-0 w-full top-0 h-20 flex items-center px-4 bg-white z-10">
        <img src={Logo} alt="logo" className="h-[28px] w-[28px]" />
        <div className="flex-1"></div>
        <button
          className="btn btn-neutral bg-[#000000]"
          onClick={() => navigate("/login")}
        >
          Launch App
        </button>
      </header>
      <div className="h-full overflow-auto pt-20 px-4">
        <div className="relative h-[calc(100%-20px)] rounded-3xl overflow-hidden mb-20">
          <img src={HeroBG} className="block w-full h-full object-cover" />
          <div className="absolute left-[50%] top-0 w-[278px] -ml-[139px] h-full flex flex-col py-10 gap-4">
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
            <button className="btn btn-block btn-neutral bg-[#1B172B] text-white btn-lg rounded">
              For business access
              <GoArrowRight />
            </button>
          </div>
        </div>
        <div className="h-40">test</div>
        <div className="h-40">test</div>
        <div className="h-40">test</div>
        <div className="h-40">test</div>
      </div>
    </main>
  );
});
