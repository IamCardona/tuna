import { Avatar, Popover, Badge, Divider, Button } from 'antd'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'

import useUser from '../../lib/auth/useUser'
import { useRouter } from 'next/router'

const Header = ({ setState, state }) => {
  return(
    <header style={{
      position: "fixed",
      width: "100%",
      zIndex: "1000",
      backgroundColor: "#fafbfc",
      height: "60px"
    }} className="app-header-shadow">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/** Hamburguer Menu */}
        <div className="sidebar-menu-hamburger">
          <div className="menu-activador menu-celular">
            <input type="checkbox" id="lanzador" className="menu-celular" onClick={() => setState(!state)} />
            <label htmlFor="lanzador">
              <span className="menu-activador-linea"></span>
              <span className="menu-activador-linea"></span>
              <span className="menu-activador-linea"></span>
            </label>
          </div>
        </div>

        {/** Logo */}
        <div style={{ display: "flex", alignItems: "center", height: "60px" }}>
          <img src="/logo.png" className="logo-navbar" />
        </div>

        {/** Notifications - User Settings */}
        <div>
          <div style={{ marginRight: "1rem", display: "flex", alignItems: "center" }}>
            
            {/** Notifications */}
            <div  style={{ marginRight: "1rem" }}>
              <Badge count={1} style={{ backgroundColor: "#F759AB" }} className="click">
                <Avatar style={{ backgroundColor: "#fad1ec" }}>
                  <ShoppingCartOutlined style={{ color: "#F759AB" }} />
                </Avatar>
              </Badge>
            </div>

            {/** User Settings */}
            <div>
              <Popover
                content={<PopoverContent />}
                trigger="click"
                placement="bottomRight"
              >
                <div className="click">
                  <Badge count={1} style={{ backgroundColor: "#F759AB" }} className="click">
                    <Avatar style={{ backgroundColor: "#fad1ec" }}>
                      <UserOutlined style={{ color: "#F759AB" }} />
                    </Avatar>
                  </Badge>
                </div>
              </Popover>
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}
 
export default Header;

const PopoverContent = () => {
  const router = useRouter()
  const { logout, user, loadingUser }  = useUser()

  if(loadingUser) return null
  if(user) return(
    <div>
      <p onClick={() => router.push('/user')} style={{ color: "#1890ff" }} className="click">Usuario</p>
      <Divider></Divider>
      <p onClick={() => logout()} style={{ color: "red" }} className="click">Cerrar Sesión</p>
    </div>
  )
  if(!user) return(
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Button onClick={() => router.push('/user/login')} type="primary">Iniciar Sesión</Button>
      </div>
      <div>
        <Button onClick={() => router.push('/user/register')} type="secondary">Registrarme</Button>
      </div>
    </div> 
  )
}
