import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Content from "@/components/Content";
import SidebarMobile from "@/components/SidebarMobile";

export default function Home() {
  return (
    <main className="flex">
      <Sidebar />
      <Content />
      <SidebarMobile />
    </main>
  );
}
