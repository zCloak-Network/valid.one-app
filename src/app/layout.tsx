import "./globals.css";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export function ResponseLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className="sm:min-h-[100vh] sm:w-full sm:bg-[#f5f5f5] sm:flex sm:items-center sm:justify-center">
      <div
        className={
          "w-full sm:max-w-[460px] h-[700px] min-h-[70vh]  bg-white sm:rounded-2xl overflow-hidden sm:shadow-2xl " +
          className
        }
      >
        {children}
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <ResponseLayout className="flex flex-col">
      <Outlet />
      <Nav />
    </ResponseLayout>
  );
}
