import "./globals.css";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function RootLayout() {
  return (
    <>
      <Outlet />
      <Nav />
    </>
  );
}
