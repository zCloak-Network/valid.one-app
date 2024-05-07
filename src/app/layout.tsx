import "./globals.css";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import { default as Nav, hiddenPaths } from "./Nav";
import { ToastProvider } from "@/components";

export function ResponseLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="h-100vh sm:w-full sm:bg-[#f5f5f5] sm:flex sm:items-center sm:justify-center">
      <div
        className={
          "w-full sm:max-w-[460px] h-full sm:h-[700px]  bg-white sm:rounded-2xl overflow-hidden sm:shadow-2xl " +
          className
        }
      >
        {children}
      </div>
    </div>
  );
}

export default function RootLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const shouldHideNav = hiddenPaths.some((pathPattern) =>
    matchPath({ path: pathPattern, end: true }, pathname)
  );

  return (
    <ResponseLayout
      className={"flex flex-col relative" + (shouldHideNav ? "" : " pb-20")}
    >
      <ToastProvider>
        <Outlet />
      </ToastProvider>
      {pathname !== "/" && <Nav />}
      {/* ios modal */}
      <dialog id="IOSInstallDialog" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Install Valid One PWA</h3>
          <p className="py-4 whitespace-pre-wrap leading-loose">
            {`1. Share Menu
   Tap the share icon at the bottom of the Safari window.
2. Add to Home Screen
   Scroll down in the share menu and tap ‘Add to Home Screen’.
3. Confirm
   Name the app as you want it to appear on your home screen and tap ‘Add’.`}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </ResponseLayout>
  );
}
