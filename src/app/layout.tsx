import "./globals.css";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export function ResponseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sm:min-h-[100vh] sm:w-full sm:bg-[#f5f5f5] sm:flex sm:items-center sm:justify-center">
      <div className="w-full sm:max-w-[460px] min-h-[700px]  bg-white sm:rounded-2xl overflow-hidden sm:shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <ResponseLayout>
      <Outlet />
      <Nav />
    </ResponseLayout>
  );
}
