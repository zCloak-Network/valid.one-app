import "./globals.css";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";

export function ResponseLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="h-[100vh] sm:w-full sm:bg-[#f5f5f5] sm:flex sm:items-center sm:justify-center">
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
  return (
    <ResponseLayout className="flex flex-col relative">
      <Outlet />
      {pathname !== "/" && <Nav />}
    </ResponseLayout>
  );
}
