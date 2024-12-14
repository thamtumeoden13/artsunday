import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Layout({children}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <main className={"font-work-sans"}>
      {/*<Navbar/>*/}
      <Header />
      {children}
      <Footer />
    </main>
  )
}