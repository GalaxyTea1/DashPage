import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <div className='header_lt'></div>
      <div className='content_lt'>
        <Outlet />
      </div>
      <div className='footer_lt'></div>
    </div>
  );
};
