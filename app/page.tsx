"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
import { default as useStore, observer } from "@/store";

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from "@/public/svg/Logo.svg";

export default observer(function HomePage() {
  const router = useRouter();
  const { User } = useStore();

  return (
    <main>
      <section className="bg-white">
        <div className="layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center">
          <Logo className="w-16" />
          <h1>Hi, {User.id}</h1>
          <h1 className="mt-4">
            Next.js + Tailwind CSS + daisyUI + TypeScript Starter
          </h1>
          <p className="mt-2 text-sm text-gray-800">
            A starter for Next.js, Tailwind CSS, daisyUI, and TypeScript with
            Seo, xs pre-configured with Husky{" "}
          </p>
          <p className="mt-2 text-sm text-gray-700">
            <a
              className="btn btn-link"
              target="_blank"
              href="https://github.com/tower1229/nextjs-daisyui-starter"
            >
              See the repository
            </a>
          </p>

          <button
            className="btn mt-6 "
            onClick={() => router.push(`/user/${User.id}`)}
          >
            Test Page
          </button>
          <button
            className="btn mt-6 "
            onClick={() =>
              User.setUser(String(Math.floor(Math.random() * 1e5)))
            }
          >
            Change User
          </button>

          <footer className="absolute bottom-2 text-gray-700">
            © {new Date().getFullYear()} By{" "}
            <a
              className="link"
              target="_blank"
              href="https://refined-x.com?ref=nextstarter"
            >
              Shixiong
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
});
