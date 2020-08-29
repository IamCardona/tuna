import { ProSidebar } from 'react-pro-sidebar'
import MenuSidebar from './Menu'

const Sidebar = ({ state, keyMenu }) => {
  return(
    <div style={{
      height: "100vh",
      position: "fixed",
      zIndex: "999"
    }}>
      <ProSidebar breakPoint="lg" toggled={state}>
        <div style={{
          backgroundColor: "white",
          height: "100vh",
          paddingTop: "60px"
        }}>
          <div>
            <p style={{ color: "#F759AB", fontWeight: "bold", padding: "1rem 0 0 1rem" }}>MENU</p>
            <MenuSidebar keyMenu={keyMenu} />
          </div>
        </div>
      </ProSidebar>
    </div>
  )
}

export default Sidebar