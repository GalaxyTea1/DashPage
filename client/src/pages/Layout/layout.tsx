import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export const Layout = () => {
  return (
    <div>
      <div className='header_lt'></div>
      <div className='content_lt'>
        <Outlet />
      </div>
      <div className='footer_lt'></div>
      <Toaster />
    </div>
  );
};

