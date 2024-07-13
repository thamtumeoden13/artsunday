import HeroPage from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/constants";
import Image from "next/image";

export default function Home() {
  return (

    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-x-hidden">
      <div className="max-w-7xl w-full">
        <FloatingNav
          navItems={navItems}
        />
        <HeroPage />
      </div>
    </main>
  );
}
