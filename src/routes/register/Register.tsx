import { Form } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import { captcha, CaptchaInfo } from "../../components/Captcha";
import { Helmet } from "react-helmet";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password0, setPassword0] = useState("");
  const [password1, setPassword1] = useState("");

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
  };

  return (
    <div>
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js?render=6LfAwBAjAAAAAALoD-IU1Qt_qeUNXMxFmjSosm2k"></script>
      </Helmet>
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
        <button onClick={captcha(sendRegister)}>register</button>
      </Form>
      <CaptchaInfo />
    </div>
  );
};

export default Register;
