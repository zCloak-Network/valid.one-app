import { ToastProvider } from "@/components";
import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}
