import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../features/test/testUpdate"
import { setAuth } from "../../features/auth/authUpdate"
import { Form } from "react-router-dom";
import "./Login.css"
import captcha from "../../components/Captcha"
import { useState } from "react";
const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
    const body = await res.text()
    console.log(body)
  }



  const counter = useSelector(state => state.test.counter);
  const name = useSelector(state => state.test.name);
  const loggedin = useSelector(state => state.test.isLoggedIn);
  const dispatch = useDispatch()


  return (
    <div>
      <Form method="post" action="/login">
        <input type="text" placeholder="username" name="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={captcha(sendLogin)}>login</button>
      </Form>
      <div onClick={() => { dispatch(increment()) }} >{counter}</div>
      <div>{name}</div>
      <div onClick={() => { dispatch(setAuth("mmmm")); console.log("dispatched") }}>test Log in</div>
      <div>{loggedin}</div>
    </div>
  );
}

export default Login;
