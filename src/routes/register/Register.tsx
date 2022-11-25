import { Form, useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import { captcha, CaptchaInfo } from "../../components/Captcha";
import { MouseEvent } from "react";
import Error from "../../components/Error";
import { setTokens } from "../../features/auth/authUpdate";
import { useDispatch } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password0, setPassword0] = useState("");
  const [password1, setPassword1] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendRegister = async (token: string) => {
    console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/register`);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password0,
          token: token,
        }),
      }
    );
    const body = await res.json();
    console.log(body);

    if (body.status !== 201) {
      setError(body.message);
      return;
    }

    setError("loading...");
    dispatch(
      setTokens({
        refresh_token: body.refresh_token,
        access_token: body.access_token,
        username: body.username,
      })
    );
    navigate("/characters");
  };

  const validate = (e: MouseEvent) => {
    e.preventDefault();
    if (password0 !== password1) {
      setError("passwords don't match match");
    }
    setError("loading...");

    captcha(sendRegister);
  };

  return (
    <div>
      <Form>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password0"
          onChange={(e) => setPassword0(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password1"
          onChange={(e) => setPassword1(e.target.value)}
        />
        <button onClick={validate}>register</button>
      </Form>

      <Error>{error}</Error>

      <CaptchaInfo />
    </div>
  );
};

export default Register;
