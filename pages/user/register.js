import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { Form, Input, Button, Alert, Spin } from 'antd'
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'

import firebase from '../../lib/auth/firebase'

const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

const Register = () => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const onFinish = values => {
    const { email, password, user } = values;

    if(!regex.test(password)) {
      return setError("La contraseña debe tener entre 8 y 16 caracteres, al menos un número, al menos una minúscula, y al menos una mayúscula.")
    }

    setError(false)
    setLoading(true)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data)
      firebase.firestore().collection("users").doc(data.user.uid).set({
        email: email,
        username: user
      })
      .then(() => {
        router.push('/')
      })
      .catch(e => {
        console.log(e)
      })
    })
    .catch(e => {
        console.log(e)
      setLoading(false)
      if(e.code === "auth/email-already-in-use") {
        setError("Parece Que Ese Correo Electrónico Ya Esta En Uso!")
       } else if(e.message === "Password should be at least 6 characters") {
        setError("Parece Que Ese Correo Electrónico Ya Esta En Uso!")
       } else {
        setError("Ups!! Parece que algo salio mal!! :(")
       }
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
          <p className="title-text">Registrate en La Tuna</p>
        </div>

        {error && <Alert 
        type="error" closable message={error}
        style={{ width: "80%", margin: "1rem auto" }}
        onClose={() => setError(false)} />}

        {/** Formulario */}
        <div>
          <Form layout="vertical" name="normal_login" onFinish={onFinish}>
          <Form.Item
              name="user"
              rules={[{
                required: true,
                message: "Ingresa tu nombre de usuario"
              }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Nombre de usuario" />
            </Form.Item>
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
              <Link  href="/user/login">
                <a className="fs-12">Inicia sesión!</a>
              </Link>
            </Form.Item>
          </Form>
        </div>
        </Spin>
      </div>      
    </div>
  )
}

export default Register