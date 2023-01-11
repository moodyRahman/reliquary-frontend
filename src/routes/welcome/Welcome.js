import "./Welcome.css"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const counter = useSelector(state => state.test.counter);
  return (
    <div>
      <div className="logo">
        yoooooo jenkins did the thing
      </div>
      <div>
        {/* <Link to="/login">Login</Link> */}
      </div>
    </div>
  );
}

export default Welcome;
