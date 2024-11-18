import Footer from "@/components/Footer"
import { FloatingNav } from "@/components/ui/FloatingNav"
import { LampContainer } from "@/components/ui/Lamp"
import { Toaster } from "@/components/ui/toaster"
import { navItems } from "@/constants"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <div className="max-w-7xl w-full mx-auto mt-[8rem]">
        <FloatingNav
          navItems={navItems}
        />
        {children}
        <Footer />
      </div>
      <Toaster />
    </main>
  )
}

export default Layout