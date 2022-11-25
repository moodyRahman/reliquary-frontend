import { useDispatch, useSelector } from "react-redux";
import { setAuth, setTokens } from "../../features/auth/authUpdate"
import { increment } from "../../features/test/testUpdate"
import { Form, useNavigate } from "react-router-dom";
import "./Login.css"
import { captcha, CaptchaInfo } from "../../components/Captcha"
import { useState } from "react";
import Error from "../../components/Error";

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const sendLogin = async (token) => {
    console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/login`)
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        token: token
      }),
    })
    const body = await res.json()
    console.log(body)

    if (body.status !== 200) {
      setError(body.message)
      return
    }
    setError("loading...")
    dispatch(setTokens({ refresh_token: body.refresh_token, access_token: body.access_token, username: body.username }))
    navigate("/characters")
  }

  const validate = (e) => {
    e.preventDefault()
    setError("loading...")
    captcha(sendLogin)
  }


  return (
    <div>
      <Form method="post" action="/login">
        <input type="text" placeholder="username" name="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={validate}>login</button>
      </Form>
      <Error>
        {error}
      </Error>
      <CaptchaInfo />
    </div>
  );
}

export default Login;
