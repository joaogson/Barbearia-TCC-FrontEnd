"use client";
import Menubar from "../../components/Menubar/Menubar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <div className="home">
      <Menubar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}
