import { useDispatch, useSelector } from "react-redux";
import {increment} from "../../features/test/testUpdate"
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";

const Login = () => {


  const counter = useSelector(state => state.test.counter);
  const dispatch = useDispatch()
  return (
    <div>
      loggin in !!

      <Form method="post" action="/login">
        username: <input type="text" name="title" /> <br />
        password: <input type="text" name="description" />
        <button type="submit">Create</button>
      </Form>
      <div onClick={() => {dispatch(increment() )}} >{counter}</div>
    </div>
  );
}

export default Login;
