import "./Welcome.css"
import { useDispatch, useSelector } from "react-redux";
import {increment} from "../../features/test/testUpdate"
import { Link } from "react-router-dom";

const Welcome = () => {
  const counter = useSelector(state => state.test.counter);
  return (
    <div>
      <div className="logo">
        Reliquary {counter}
      </div>
      <div>
        <Link to="/login">Login with Google</Link>
      </div>
    </div>
  );
}

export default Welcome;
