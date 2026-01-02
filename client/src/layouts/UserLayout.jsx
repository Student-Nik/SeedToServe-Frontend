
import UserTopbar from "@/components/UserTopbar";
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#F7F9F8] overflow-x-hidden">
    <UserTopbar />
      <main className="w-full">
        <div>
        <Outlet />
        </div>
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default UserLayout;