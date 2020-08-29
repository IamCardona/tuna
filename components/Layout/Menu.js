import { useRouter } from 'next/router'
import { Menu } from 'antd'
import { GlobalOutlined, ShopOutlined } from '@ant-design/icons'

const MenuSidebar = ({ keyMenu }) => {
  const router = useRouter()

  return(
    <Menu
      style={{ width: "270px" }}
      mode="inline"
      theme="light"
      defaultSelectedKeys={keyMenu}
      defaultOpenKeys={["sub1", "sub2"]}
    >

      <Menu.Item key="1" icon={<GlobalOutlined />} onClick={() => {
        router.push('/')
      }}>
        Inicio
      </Menu.Item>

      {/** Primer SubMenu - Productos */}
      <Menu.SubMenu key="sub1" title="Productos" icon={<ShopOutlined />}>

        {/** SubMenu de Productos Tardan */}
        <Menu.SubMenu key="sub2" title="Tardan" icon={<img src="/icons/sombrero.svg" style={{ width: "20px", marginRight: "0.5rem" }} />}>

          <Menu.Item key="2" icon={<img src="/icons/sombrero.svg" style={{ width: "20px", marginRight: "0.5rem" }} />} onClick={() => {
            router.push('/productos/tardan/sombreros')
          }}>
            Sombreros
          </Menu.Item>

          <Menu.Item key="3" icon={<img src="/icons/boina.svg" style={{ width: "20px", marginRight: "0.5rem" }} />} onClick={() => {
            router.push('/productos/tardan/boinas')
          }}>
            Boinas
          </Menu.Item>

        </Menu.SubMenu>
      </Menu.SubMenu>

    </Menu>
  )
}

export default MenuSidebar