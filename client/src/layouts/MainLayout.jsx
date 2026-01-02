import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#FFFBE8] text-[#1f2937] overflow-x-hidden">
      <Topbar />
      <main className="w-full">
        <div>
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;