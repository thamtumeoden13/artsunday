import { FloatingNav } from "@/components/ui/FloatingNav"
import { Toaster } from "@/components/ui/toaster"
import { navItems } from "@/constants"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <div className="max-w-7xl w-full mx-auto mt-16">
        <FloatingNav
          navItems={navItems}
        />

        {children}
      </div>
      <Toaster />
    </main>
  )
}

export default Layout