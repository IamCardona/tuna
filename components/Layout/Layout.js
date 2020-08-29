import { useState } from 'react'

// Import components
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children, keyMenu }) => {
  const [sidebarState, setSidebarState] = useState(false)

  return (
    <div>
      <header>
        <Header setState={setSidebarState} state={sidebarState} />
      </header>

      <Sidebar state={sidebarState} keyMenu={keyMenu} />

      <div className="body-align" style={{ paddingTop: "60px" }}>
        <main>
          {children}
        </main>
        <footer>
          {/* <Footer /> */}
        </footer>
      </div>
      
    </div>
  )
}
 
export default Layout;