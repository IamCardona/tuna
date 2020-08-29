import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { Form, Input, Button, Alert, Spin } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import Link from 'next/link'

import firebase from '../../lib/auth/firebase'

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const onFinish = values => {
    const { email, password } = values;
    setError(false)
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      router.push('/')
    })
    .catch(function(e) {
      setError(true)
      setLoading(false)
    })
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
          <p className="title-text">Inicia Sesión</p>
        </div>

        {error && <Alert 
        type="error" closable message="Correo electrónico o contraseña incorrectos"
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
            <Form.Item
              name="password"
              rules={[{
                required: true,
                message: "Ingresa una contraseña!"
              }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" type="password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "80%" }}>Iniciar sesión</Button>
            </Form.Item>
            <Form.Item>
              <Link href="/user/reset">
                <a className="login-form-forgot fs-12">Olvidaste tu contraseña?</a>
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

export default Login