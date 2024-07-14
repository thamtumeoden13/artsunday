import About from "@/components/About"
import { FloatingNav } from "@/components/ui/FloatingNav"
import { navItems } from "@/constants"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <div className="max-w-7xl w-full">
        <FloatingNav
          navItems={navItems}
        />

        {children}
      </div>
    </main>
  )
}

export default Layout