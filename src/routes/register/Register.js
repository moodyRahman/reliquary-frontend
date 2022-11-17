import { Form } from "react-router-dom";
import "./Register.css"
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';

const Register = () => {
  const [username, setUsername] = useState("")
  const [password0, setPassword0] = useState("")
  const [password1, setPassword1] = useState("")

  const handleLoaded = (e) => {
    e.preventDefault()
    window.grecaptcha.ready(_ => {
      window.grecaptcha
        .execute("6LfAwBAjAAAAAALoD-IU1Qt_qeUNXMxFmjSosm2k", { action: "register" })
        .then(token => {
          sendRegister(token)
        })
    })  
  }

  const sendRegister = async (token) => {

    console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/register`)
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password0, token: token }),
    })
    const body = await res.json()
    console.log(body)
  }

  return (
    <div>
      <Form>
        <input type="text" placeholder="username" name="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" name="password0" onChange={(e) => setPassword0(e.target.value)} />
        <input type="password" placeholder="password" name="password1" onChange={(e) => setPassword1(e.target.value)} />
        {/* <reCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} /> */}
        <button onClick={handleLoaded}>register</button>
      </Form>
    </div>
  );
}

export default Register;
