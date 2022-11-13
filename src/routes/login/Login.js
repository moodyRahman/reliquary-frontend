import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../features/test/testUpdate"
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import "./Login.css"
import { useState } from "react";
const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const sendLogin = async (e) => {
    e.preventDefault();
    console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/login`)
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    const body = await res.text()
    console.log(body) 
  }


  const counter = useSelector(state => state.test.counter);
  const dispatch = useDispatch()
  return (
    <div>
      <Form method="post" action="/login">
        <input type="text" placeholder="username" name="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={sendLogin}>login</button>
      </Form>
      <div onClick={() => { dispatch(increment()) }} >{counter}</div>
    </div>
  );
}

export default Login;
