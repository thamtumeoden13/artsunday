import About from "@/components/About";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";

export default function Home() {
  return (
    <>
        <Hero />
        <About />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
    </>
  );
}
