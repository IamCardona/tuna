import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { Form, Input, Button, Alert, Spin, message,  } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import Link from 'next/link'

import firebase from '../../lib/auth/firebase'

const Reset = () => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const onFinish = values => {
    const { email } = values;
    setError(false)
    setLoading(true)
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      setLoading(false)
      success()
      setTimeout(() => {
        router.push('/user/login')
      }, 3000)
    })
    .catch((e) => {
      setError(true)
      setLoading(false)    
    })      
  };

  const success = () => {
    message.success('Correo enviado! Revisa tu Bandeja de Entrada o Spam!');
  };

  return(
    <div style={{ textAlign: "center" }}>
      <Button onClick={() => router.push('/')} style={{ position: "fixed", top: "1rem", left: "1rem" }}>Ir a la tienda</Button>
      {/** Contenedor */}
      <div style={{ backgroundColor: "rgb(247, 247, 247)", position: "absolute", left: "50%", top: "50%",  transform: "translate(-50%, -50%)", padding: "2rem", borderRadius: "1rem" }} className="form-user">
        <Spin spinning={loading}>
        {/** Logo */}
        <div>
          <img src="/logo.png" style={{ width: "100%" }} />
        </div>
        {/** Titulo */}
        <div>
          <p className="title-text">Restablece tu contraseña</p>
        </div>

        {error && <Alert 
        type="error" closable message="Correo electrónico invalido!"
        style={{ width: "80%", margin: "1rem auto" }}
        onClose={() => setError(false)} />}

        {/** Formulario */}
        <div>
          <Form layout="vertical" name="normal_login" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{
                required: true,
                message: "Ingresa tu correo electrónico!"
              },{
                type: "email",
                message: "Ingresa un correo electrónico valido!"
              }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Correo electrónico" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "80%" }}>Enviar</Button>
            </Form.Item>
            <Form.Item>
              <Link href="/user/login">
                <a className="login-form-forgot fs-12">Inicia sesión!</a>
              </Link>
                <br className="fs-12" /> O <br />
              <Link  href="/user/register">
                <a className="fs-12">Registrate!</a>
              </Link>
            </Form.Item>
          </Form>
        </div>
        </Spin>
      </div>      
    </div>
  )
}

export default Reset