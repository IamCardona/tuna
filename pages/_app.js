import 'antd/dist/antd.css'
import 'react-pro-sidebar/dist/css/styles.css'

import '../styles/style.scss'
import '../styles/queries.css'
import '../styles/styles.css'

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

/**
 * NOTAS
 * 
 *    - Aviso de privacidad
 * 
 * TAREAS
 * 
 *    - Arreglar performance de ant desigb quitar las advertencias
 *    - AGREGAR expreciones regulares para verificar formato moneda en los precios y inventario
 * 
 * 
 */